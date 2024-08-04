"use server";

import { api } from "backend-api";
import { cookies } from "next/headers";

import { schemaLogin, schemaRegister } from "@/types/validation";

// Utility function to update state
function updateState(prevState: any, updates: any) {
  return {
    ...prevState,
    zodErrors: null,
    message: null,
    ...updates,
  };
}

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return updateState(prevState, {
      zodErrors: validatedFields.error.flatten().fieldErrors,
    });
  }

  try {
    const { data, error } = await api.auth.register.post(validatedFields.data);

    if (error) {
      console.error(error);

      return updateState(prevState, {
        message: error.value.message || "Failed to Register.",
      });
    }

    return updateState(prevState, {
      message: "Registration successful.",
      data: data,
    });
  } catch (error) {
    console.error(error);

    return updateState(prevState, {
      message: "Ops! Something went wrong. Please try again later.",
    });
  }
}

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return updateState(prevState, {
      zodErrors: validatedFields.error.flatten().fieldErrors,
    });
  }

  try {
    const { data, error } = await api.auth.login.post({
      email: "j.mazur.2004@gmail.com",
      password: "password",
    });

    if (error) {
      console.error(error.value);

      return updateState(prevState, {
        message: error.value.message || "Failed to login.",
      });
    }

    cookies().set("auth", data.token);
  } catch (error) {
    console.error("Error:", error);

    return updateState(prevState, {
      message: "Ops! Something went wrong. Please try again later.",
    });
  }
}

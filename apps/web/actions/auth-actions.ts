"use server";

import { schemaLogin, schemaRegister } from "@/types/validation";
import { cookies } from "next/headers";

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
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return updateState(prevState, {
        message: errorData.message || "Failed to Register.",
      });
    }

    const responseData = await response.json();
    return updateState(prevState, {
      message: "Registration successful.",
      data: responseData,
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
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
      credentials: "include", // Ensure cookies are included
    });

    if (!response.ok) {
      const errorData = await response.json();
      return updateState(prevState, {
        message: errorData.message || "Failed to login.",
      });
    }

    const responseData = await response.json();

    cookies().set("auth", responseData.token);
  } catch (error) {
    console.error("Error:", error);
    return updateState(prevState, {
      message: "Ops! Something went wrong. Please try again later.",
    });
  }
}

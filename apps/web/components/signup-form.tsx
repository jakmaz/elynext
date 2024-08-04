"use client";

import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useFormState } from "react-dom";

import { SignUpSubmitButton } from "./submit-button";
import { ErrorMessage } from "./auth-error-message";

import { registerUserAction } from "@/actions/auth-actions";

const INITIAL_STATE = {
  data: null,
};

export default function SignUpForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE,
  );

  console.log(formState);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4 min-w-96">
        <h1 className="text-3xl font-semibold pb-4">Sign Up 🎉</h1>
        <Input
          autoFocus
          endContent={
            <UserIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          errorMessage={formState?.zodErrors?.first_name}
          isInvalid={formState?.zodErrors?.first_name}
          label="First Name"
          labelPlacement="outside"
          name="firstName"
          placeholder="Enter your first name"
          variant="bordered"
        />
        <Input
          endContent={
            <UserIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          errorMessage={formState?.zodErrors?.last_name}
          isInvalid={formState?.zodErrors?.last_name}
          label="Last Name"
          labelPlacement="outside"
          name="lastName"
          placeholder="Enter your last name"
          variant="bordered"
        />
        <Input
          endContent={
            <EnvelopeIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          errorMessage={formState?.zodErrors?.email}
          isInvalid={formState?.zodErrors?.email}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          variant="bordered"
        />
        <Input
          endContent={
            <LockClosedIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          errorMessage={formState?.zodErrors?.password}
          isInvalid={formState?.zodErrors?.password}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <SignUpSubmitButton />
        <ErrorMessage message={formState.message} />
        <Button
          as={Link}
          className="text-primary"
          href="/login"
          variant="light"
        >
          Already have an account? Log In
        </Button>
      </div>
    </form>
  );
}

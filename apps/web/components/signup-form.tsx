"use client";

import { registerUserAction } from "@/actions/auth-actions";
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
          name="firstName"
          label="First Name"
          labelPlacement="outside"
          placeholder="Enter your first name"
          variant="bordered"
          isInvalid={formState?.zodErrors?.first_name}
          errorMessage={formState?.zodErrors?.first_name}
        />
        <Input
          endContent={
            <UserIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          name="lastName"
          label="Last Name"
          labelPlacement="outside"
          placeholder="Enter your last name"
          variant="bordered"
          isInvalid={formState?.zodErrors?.last_name}
          errorMessage={formState?.zodErrors?.last_name}
        />
        <Input
          endContent={
            <EnvelopeIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          name="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          variant="bordered"
          isInvalid={formState?.zodErrors?.email}
          errorMessage={formState?.zodErrors?.email}
        />
        <Input
          endContent={
            <LockClosedIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          name="password"
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          isInvalid={formState?.zodErrors?.password}
          errorMessage={formState?.zodErrors?.password}
        />
        <SignUpSubmitButton />
        <ErrorMessage message={formState.message} />
        <Button
          as={Link}
          href="/login"
          variant="light"
          className="text-primary"
        >
          Already have an account? Log In
        </Button>
      </div>
    </form>
  );
}

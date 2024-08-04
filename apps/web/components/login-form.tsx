"use client";

import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useFormState } from "react-dom";

import { ErrorMessage } from "./auth-error-message";
import { LoginSubmitButton } from "./submit-button";

import { loginUserAction } from "@/actions/auth-actions";

const INITIAL_STATE = {
  data: null,
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4 min-w-96">
        <h1 className="text-3xl font-semibold pb-4">Log In 👋</h1>
        <Input
          autoFocus
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
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <Link className="text-sm" color="primary" href="#">
            Forgot password?
          </Link>
        </div>
        <ErrorMessage message={formState.message} />
        <LoginSubmitButton />
        <Button
          as={Link}
          className="text-primary"
          href="/signup"
          variant="light"
        >
          Create an account
        </Button>
      </div>
    </form>
  );
}

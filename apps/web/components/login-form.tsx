"use client";

import { loginUserAction } from "@/actions/auth-actions";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ErrorMessage } from "./auth-error-message";
import { LoginSubmitButton } from "./submit-button";

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
          href="/signup"
          variant="light"
          className="text-primary"
        >
          Create an account
        </Button>
      </div>
    </form>
  );
}

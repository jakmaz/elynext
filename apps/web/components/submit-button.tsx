import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" color="primary" isLoading={status.pending}>
      {status.pending ? "Logging In..." : "Log In"}
    </Button>
  );
}

export function SignUpSubmitButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" color="primary" isLoading={status.pending}>
      {status.pending ? "Logging In..." : "Log In"}
    </Button>
  );
}

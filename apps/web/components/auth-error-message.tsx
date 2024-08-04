interface ApiErrorProps {
  message: string | null;
}

export function ErrorMessage({ message }: ApiErrorProps) {
  if (!message) return null;

  return (
    <div className="flex justify-center text-danger text-md py-2">
      {message}
    </div>
  );
}

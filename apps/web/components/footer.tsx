import { Link } from "@nextui-org/link";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/jakmaz"
        title="creator github profile"
      >
        <span className="text-default-600">Template created by</span>
        <p className="text-primary">jakmaz</p>
      </Link>
    </footer>
  );
}

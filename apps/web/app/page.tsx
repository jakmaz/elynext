import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="h-full flex flex-col items-center pt-32 gap-4">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({})}>Make </h1>
        <h1 className={title({ color: "blue" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <Link
        isExternal
        className={buttonStyles({ variant: "bordered", radius: "full" })}
        href="https://www.github.com/jakmaz"
      >
        <GithubIcon size={20} />
        GitHub
      </Link>

      <Snippet hideCopyButton hideSymbol variant="bordered">
        <span>
          Get started by editing <Code color="primary">app/page.tsx</Code>
        </span>
      </Snippet>
    </section>
  );
}

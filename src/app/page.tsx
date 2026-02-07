import Link from "next/link";
import { AboutDrawerTrigger } from "@/components/landing/AboutDrawerTrigger";
import { ChoiceButtons } from "@/components/landing/ChoiceButtons";
import { Logo } from "@/components/paper/Logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 dark:bg-black">
      <main className="flex max-w-lg flex-col items-center gap-10 text-center">
        <Link href="/" className="flex items-center">
          <Logo className="h-14 w-full max-w-[320px] sm:h-20 text-foreground dark:text-foreground" />
        </Link>
        <p className="text-muted-foreground text-sm">
          Choose your perspective. The news will follow.
        </p>
        <p className="text-muted-foreground max-w-md text-sm">
          Truth Tribune shows the same news through left and right slants. We
          make media framing obvious so you can see how headlines shape the
          story.
        </p>
        <ChoiceButtons />
        <AboutDrawerTrigger />
      </main>
    </div>
  );
}

import Link from "next/link";
import { Header } from "@/components/paper/Header";
import { Footer } from "@/components/paper/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <main className="mx-auto flex-1 w-full max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/paper"
          className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm"
        >
          ← Back to paper
        </Link>

        <h1 className="font-serif text-3xl font-bold text-black dark:text-white">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Get in touch with the team behind Truth Tribune.
        </p>

        <div className="mt-10">
          <section>
            <h2 className="font-serif text-xl font-semibold text-black dark:text-white">
              Webdev
            </h2>
            <a
              href="https://www.linkedin.com/in/olegchursin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground mt-1 block hover:text-foreground hover:underline"
            >
              Oleg Chursin
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

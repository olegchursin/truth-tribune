export function AboutContent({
  className,
  hideTitle,
}: {
  className?: string;
  hideTitle?: boolean;
}) {
  return (
    <div className={className}>
      {!hideTitle && (
        <>
          <h1 className="font-serif text-3xl font-bold text-black dark:text-white">
            About Truth Tribune
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            The story behind the project—and why it exists.
          </p>
        </>
      )}

      <div className={hideTitle ? "space-y-10" : "mt-10 space-y-10"}>
        <section>
          <h2 className="font-serif text-xl font-semibold text-black dark:text-white">
            Why “Truth Tribune”?
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            The name is a nod to the Ministry of Truth and to the idea of a “tribune”—someone who
            speaks for the people. We’re not claiming to speak the truth. We’re claiming to show
            how easily truth gets reshaped before it reaches you. Once you see that, you can
            demand better—from the media, from algorithms, and from yourself. We need to stay
            together. This is one way to remember why.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-black dark:text-white">
            The Ministry of Truth
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            In Orwell’s <em>1984</em>, the Ministry of Truth didn’t report the news—it rewrote it.
            Headlines were altered to match the party line. History was whatever they said it was.
            Most people never saw the original; they only saw the version that had been shaped for
            them.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We’re not living in 1984, but we are living in a world where the same events are
            reported in wildly different ways. The same facts get different headlines, different
            emphasis, different villains. Left-leaning outlets frame one way; right-leaning
            outlets frame another. Often we only see one frame—the one that matches our feed, our
            channel, our tribe. We rarely see how the same story is being twisted in the other
            direction, or how easily a neutral headline becomes a weapon when you change a few
            words.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-black dark:text-white">
            Our Goal
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Truth Tribune exists to show people that they are being manipulated by the media—not
            by hiding the manipulation, but by making it obvious. We take the same underlying
            headlines and rewrite them through two distinct lenses: a progressive, left-leaning
            slant and a conservative, right-leaning slant. When you choose “Left” or “Right,” you
            get the same news story, but reframed. The point isn’t to make you pick a side. It’s
            to make you see that <em>sides are being picked for you</em> every time you read a
            headline.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We need to stay together. Division is what happens when half the country only sees
            one version of the truth and the other half only sees another. This project is a
            mirror: it shows how easily the same facts can be spun. Once you see the spin, you
            can start to question it everywhere—and that’s the first step toward a shared reality
            again.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-black dark:text-white">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Here’s the technical story of how the articles you see are produced.
          </p>
          <ul className="text-muted-foreground mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <strong className="text-foreground">Headlines are fetched</strong> from a
              third-party news API (NewsAPI.org). We pull top headlines by section—business,
              entertainment, health, science, sports, technology—from major outlets. These are real, current
              headlines.
            </li>
            <li>
              <strong className="text-foreground">Each headline is rewritten twice</strong> by an
              AI language model (Groq, using Llama). One rewrite is done in a far-left
              progressive voice—emphasizing systemic injustice, corporate power, climate,
              workers. The other is done in a far-right conservative voice—emphasizing freedom,
              government overreach, tradition, the free market. The model is given explicit
              instructions to reframe the same facts through each lens.
            </li>
            <li>
              <strong className="text-foreground">Headlines and full article text</strong> are
              generated for both slants and stored in a database (Supabase). A cron job runs
              periodically to fetch new headlines and produce new rewritten versions. Old
              articles are pruned after about a week.
            </li>
            <li>
              <strong className="text-foreground">When you visit the paper</strong>, you choose
              “Left” or “Right” on the homepage. That choice is stored in a cookie. The feed you
              see is then filtered to show only the rewrites for your chosen slant. So you’re
              reading the same underlying news—same source events—but every title and body has
              been deliberately slanted to match that perspective.
            </li>
          </ul>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            No human editor is choosing the spin. The model is. That’s intentional: it
            demonstrates how automated and reproducible media bias can be. The same input, two
            prompts, two completely different “truths.” That’s the point.
          </p>
        </section>
      </div>
    </div>
  );
}

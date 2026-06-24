import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-6 overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[linear-gradient(165deg,rgba(20,20,31,0.97),rgba(16,16,24,0.92))] p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)] sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--color-text-muted)]">LearnScore</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[color:var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            Worth Your Time?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--color-text-secondary)] sm:text-lg lg:text-xl">
            The IMDb for education. Discover courses using outcome-first signals, multi-dimensional ratings, and real
            projects built by learners.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/discover"
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--color-primary)] px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110 sm:w-auto"
            >
              Explore Discover Page
            </Link>
            <Link
              href="/paths"
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-elevated)] sm:w-auto"
            >
              Browse Learning Paths
            </Link>
          </div>
        </div>

        <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Outcome-first", "Reviews and ratings are oriented around job outcomes and practical value."],
            ["Mobile-ready", "Layouts stack cleanly on narrow screens without losing hierarchy."],
            ["Actionable", "Compare, discover, and drill into specific course details from every route."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">{title}</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--color-text-secondary)]">{description}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Real signals", "Course pages surface ratings, reviews, outcomes, and practical fit in one view."],
          ["Better comparisons", "Compare routes side-by-side without losing context on smaller screens."],
          ["Guided paths", "Learning paths and profile pages keep the experience connected end-to-end."],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">{title}</p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

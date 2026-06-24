import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getComparisonSuggestions,
  getCourseBySlug,
  projectShowcaseByCourse,
  providerColors,
  reviewSamplesByCourse,
} from "@/lib/mock-data";

const dimensions = [
  "contentQuality",
  "practicality",
  "difficulty",
  "jobRelevance",
  "instructorQuality",
  "valueForTime",
  "valueForMoney",
] as const;

function avg(values: number[]) {
  return values.length === 0 ? 0 : values.reduce((acc, value) => acc + value, 0) / values.length;
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const reviews = reviewSamplesByCourse[course.slug] ?? [];
  const outcomeCounts = {
    "Got Job": reviews.filter((review) => review.outcome === "Got Job").length,
    "Got Internship": reviews.filter((review) => review.outcome === "Got Internship").length,
    Promotion: reviews.filter((review) => review.outcome === "Promotion").length,
    "No Impact": reviews.filter((review) => review.outcome === "No Impact").length,
    "Still Learning": reviews.filter((review) => review.outcome === "Still Learning").length,
  };
  const totalOutcomes = Math.max(reviews.length, 1);

  const breakdown = Object.fromEntries(
    dimensions.map((dimension) => [
      dimension,
      avg(reviews.map((review) => review.dimensions[dimension])) || Math.max(6.8, course.rating - 0.2),
    ]),
  ) as Record<(typeof dimensions)[number], number>;

  const projects = projectShowcaseByCourse[course.slug] ?? [];
  const compareOptions = getComparisonSuggestions(course.slug);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-8">
      <section className="overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[linear-gradient(150deg,rgba(20,20,31,0.98),rgba(16,18,28,0.94))] p-5 sm:p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_280px]">
          <div className={`h-72 rounded-2xl bg-gradient-to-br p-4 sm:h-80 ${course.thumbnailGradient}`}>
            <div className="flex h-full items-end">
              <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold text-white">
                {course.subcategory}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl md:text-5xl">
              {course.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${providerColors[course.provider]}`}>
                {course.provider}
              </span>
              <span className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs text-[color:var(--color-text-secondary)]">
                {course.category}
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-text-secondary)] md:text-base">
              {course.description}
            </p>

            <p className="mt-4 text-sm text-[color:var(--color-text-muted)]">
              {course.durationHours}h • {course.priceLabel} • {course.certificateType} • Updated {course.lastUpdated}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--color-primary)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Overall Score</p>
            <p className="mt-2 text-5xl font-black tabular-nums text-[color:var(--color-primary)] sm:text-6xl">{course.rating.toFixed(1)}</p>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">Based on {course.reviewCount} reviews</p>

            <div className="mt-6 space-y-2">
              <button className="w-full rounded-xl bg-[color:var(--color-primary)] px-4 py-2 text-sm font-bold text-black transition hover:brightness-110">
                Write a Review
              </button>
              <button className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/45">
                Add to Watchlist
              </button>
              <Link
                href={`/compare?a=${course.slug}&b=${compareOptions[0]?.slug ?? course.slug}`}
                className="block w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/45"
              >
                Compare
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
          <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Rating Breakdown</h2>
          <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">7-dimension community average</p>

          <div className="mt-5 space-y-3">
            {dimensions.map((key) => {
              const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
              const width = `${Math.min(100, Math.max(12, breakdown[key] * 10))}%`;

              return (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-xs text-[color:var(--color-text-secondary)]">
                    <span>{label}</span>
                    <span className="tabular-nums">{breakdown[key].toFixed(1)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/35">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#f5c518,#f59e0b)]" style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
          <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">AI Insights</h2>
          <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">Synthesized from recent verified reviews</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-success)]">Best For</p>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-text-secondary)]">
                <li>Career switchers entering IT support</li>
                <li>Structured learners who need job-ready flow</li>
                <li>Students building confidence from zero</li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-danger)]">Not Ideal For</p>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-text-secondary)]">
                <li>Advanced engineers seeking deep architecture</li>
                <li>People wanting only short video explainers</li>
                <li>Learners avoiding hands-on labs</li>
              </ul>
            </div>
          </div>

          <p className="mt-5 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] p-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">
            This course consistently delivers practical confidence and interview-level readiness. Reviewers praise the sequence and real-world relevance, with strongest outcomes among entry-level and switcher profiles.
          </p>
          <p className="mt-3 text-xs text-[color:var(--color-text-muted)]">Confidence score: 0.82</p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Career Outcome Score</h2>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">What happened after completing this course?</p>

        <div className="mt-5 space-y-3">
          {Object.entries(outcomeCounts).map(([label, count]) => {
            const percent = Math.round((count / totalOutcomes) * 100);
            return (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm text-[color:var(--color-text-secondary)]">
                  <span>{label}</span>
                  <span className="tabular-nums">{percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/35">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#22c55e,#3b82f6)]"
                    style={{ width: `${Math.max(4, percent)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Reviews</h2>
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <article key={`${review.user}-${review.date}`} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-[color:var(--color-text-primary)]">{review.user}</p>
                  <p className="text-xs text-[color:var(--color-text-muted)]">
                    Rep {review.reputation} • {review.experience}
                  </p>
                </div>
                <p className="text-3xl font-black tabular-nums text-[color:var(--color-primary)]">{review.overall.toFixed(1)}</p>
              </div>

              <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">{review.text}</p>
              <p className="mt-3 text-xs text-[color:var(--color-text-muted)]">
                {review.outcome} • {review.completionStatus} • {review.timeSpentHours}h • {review.date}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
          <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Project Showcase</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)]"
              >
                <div className={`h-24 bg-gradient-to-br ${project.image}`} />
                <div className="p-3">
                  <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">{project.title}</p>
                  <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">{project.author}</p>
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
          <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">If You Liked This</h2>
          <div className="mt-4 space-y-2">
            {compareOptions.map((option) => (
              <Link
                key={option.slug}
                href={`/course/${option.slug}`}
                className="block rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/45 hover:text-[color:var(--color-text-primary)]"
              >
                {option.title}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

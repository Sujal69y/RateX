"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { courses, getCourseBySlug, providerColors } from "@/lib/mock-data";

const metrics = [
  "Overall Score",
  "Content Quality",
  "Practicality",
  "Job Relevance",
  "Value For Time",
  "Value For Money",
];

export default function ComparePage() {
  const params = useSearchParams();
  const courseA = getCourseBySlug(params.get("a") ?? courses[0].slug) ?? courses[0];
  const courseB = getCourseBySlug(params.get("b") ?? courses[1].slug) ?? courses[1];

  const values = useMemo(
    () =>
      metrics.map((metric, index) => {
        const a = Number((courseA.rating - index * 0.12 + 0.45).toFixed(1));
        const b = Number((courseB.rating - index * 0.1 + 0.35).toFixed(1));
        return { metric, a, b };
      }),
    [courseA.rating, courseB.rating],
  );

  const winner = courseA.rating >= courseB.rating ? courseA : courseB;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:py-8">
      <header className="rounded-3xl border border-[color:var(--color-border)] bg-[linear-gradient(140deg,rgba(20,20,31,0.98),rgba(16,18,28,0.94))] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Comparison</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-[color:var(--color-text-primary)] sm:text-3xl md:text-5xl">
          {courseA.title} vs {courseB.title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">
          Choose based on outcomes, not hype.
        </p>
      </header>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {[courseA, courseB].map((course) => (
          <article key={course.slug} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${providerColors[course.provider]}`}>
                  {course.provider}
                </span>
                <h2 className="mt-3 text-xl font-bold text-[color:var(--color-text-primary)]">{course.title}</h2>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                  {course.durationHours}h • {course.priceLabel} • {course.certificateType}
                </p>
              </div>
              <p className="text-3xl font-black tabular-nums text-[color:var(--color-primary)] sm:text-4xl">{course.rating.toFixed(1)}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Side-by-Side Metrics</h2>
        <div className="mt-4 space-y-4">
          {values.map((row) => {
            const aWidth = `${Math.max(8, Math.min(100, row.a * 10))}%`;
            const bWidth = `${Math.max(8, Math.min(100, row.b * 10))}%`;
            return (
              <div key={row.metric}>
                <div className="mb-1 flex justify-between text-xs text-[color:var(--color-text-muted)]">
                  <span>{row.metric}</span>
                  <span className="tabular-nums">
                    {row.a.toFixed(1)} vs {row.b.toFixed(1)}
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="h-2 overflow-hidden rounded-full bg-black/35">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#f5c518,#f59e0b)]" style={{ width: aWidth }} />
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/35">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#3b82f6,#22c55e)]" style={{ width: bWidth }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">AI Verdict</h2>
        <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-secondary)]">
          Choose {courseA.title} if you want structured pacing and lower ramp-up friction. Choose {courseB.title} if you want
          stronger specialization depth and can handle a steeper workload.
        </p>
        <p className="mt-3 text-sm font-semibold text-[color:var(--color-primary)]">Community edge: {winner.title}</p>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        {courses.slice(0, 5).map((course) => (
          <Link
            key={course.slug}
            href={`/compare?a=${courseA.slug}&b=${course.slug}`}
            className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] px-3 py-1.5 text-xs text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/45"
          >
            Compare with {course.provider}
          </Link>
        ))}
      </div>
    </div>
  );
}

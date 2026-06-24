import Link from "next/link";
import { courses, learningPaths } from "@/lib/mock-data";

export default function PathsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:py-8">
      <header className="rounded-3xl border border-[color:var(--color-border)] bg-[linear-gradient(135deg,rgba(20,20,31,0.98),rgba(16,18,28,0.94))] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Learning Paths</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">Guided Career Tracks</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--color-text-secondary)]">
          Curated sequences to help you move from where you are to where you want to be.
        </p>
      </header>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {learningPaths.map((path) => (
          <article key={path.slug} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
            <h2 className="text-xl font-bold text-[color:var(--color-text-primary)]">{path.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{path.description}</p>
            <p className="mt-3 text-xs text-[color:var(--color-text-muted)]">
              {path.stepCount} steps • {path.totalHours}h • {path.upvotes.toLocaleString()} upvotes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {path.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs text-[color:var(--color-text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Sample Timeline: Zero to Cloud Engineer</h2>
        <div className="mt-4 space-y-3">
          {courses.slice(0, 4).map((course, index) => (
            <div key={course.slug} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-text-muted)]">Step {index + 1}</p>
              <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-[color:var(--color-text-primary)]">{course.title}</p>
                <Link
                  href={`/course/${course.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs text-[color:var(--color-text-secondary)] sm:w-auto"
                >
                  View Course
                </Link>
              </div>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                Why this step: reinforces {course.skills[0]} and prepares for the next layer.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

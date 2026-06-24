"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  courses,
  providerColors,
  type Course,
  type Difficulty,
  type OutcomeTag,
  type PriceModel,
} from "@/lib/mock-data";

const SORTS = [
  "Top Rated",
  "Most Reviewed",
  "Trending",
  "Newly Added",
  "Best Value",
] as const;

type SortMode = (typeof SORTS)[number];
type ViewMode = "grid" | "list";

function durationBucket(hours: number): "<10h" | "10-50h" | "50h+" {
  if (hours < 10) return "<10h";
  if (hours <= 50) return "10-50h";
  return "50h+";
}

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("Top Rated");
  const [view, setView] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [providerFilter, setProviderFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<PriceModel[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty[]>([]);
  const [ratingFloor, setRatingFloor] = useState<7 | 8 | 9 | null>(null);
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeTag | null>(null);
  const [durationFilter, setDurationFilter] = useState<Array<"<10h" | "10-50h" | "50h+">>([]);
  const [certificateOnly, setCertificateOnly] = useState<boolean | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(courses.map((course) => course.category))),
    [],
  );

  const providers = useMemo(
    () => Array.from(new Set(courses.map((course) => course.provider))),
    [],
  );

  const filtered = useMemo(() => {
    const byFilters = courses.filter((course) => {
      const searchOK =
        query.trim().length === 0 ||
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.provider.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase());

      const categoryOK = categoryFilter.length === 0 || categoryFilter.includes(course.category);
      const providerOK = providerFilter.length === 0 || providerFilter.includes(course.provider);
      const priceOK = priceFilter.length === 0 || priceFilter.includes(course.priceModel);
      const difficultyOK =
        difficultyFilter.length === 0 || difficultyFilter.includes(course.difficulty);
      const ratingOK = ratingFloor === null || course.rating >= ratingFloor;
      const outcomeOK = outcomeFilter === null || course.outcomeTags.includes(outcomeFilter);
      const durationOK =
        durationFilter.length === 0 || durationFilter.includes(durationBucket(course.durationHours));
      const certOK = certificateOnly === null || course.certificate === certificateOnly;

      return (
        searchOK &&
        categoryOK &&
        providerOK &&
        priceOK &&
        difficultyOK &&
        ratingOK &&
        outcomeOK &&
        durationOK &&
        certOK
      );
    });

    const sorted = [...byFilters];
    sorted.sort((a, b) => {
      if (sort === "Top Rated") return b.rating - a.rating;
      if (sort === "Most Reviewed") return b.reviewCount - a.reviewCount;
      if (sort === "Trending") return b.trendingScore - a.trendingScore;
      if (sort === "Newly Added") return b.slug.localeCompare(a.slug);
      const aValue = a.rating / Math.max(a.priceModel === "free" ? 1 : Number.parseFloat(a.priceLabel.replace(/[^\d.]/g, "")) || 60, 1);
      const bValue = b.rating / Math.max(b.priceModel === "free" ? 1 : Number.parseFloat(b.priceLabel.replace(/[^\d.]/g, "")) || 60, 1);
      return bValue - aValue;
    });

    return sorted;
  }, [
    categoryFilter,
    certificateOnly,
    difficultyFilter,
    durationFilter,
    outcomeFilter,
    priceFilter,
    providerFilter,
    query,
    ratingFloor,
    sort,
  ]);

  return (
    <div className="min-h-screen px-4 pb-12 pt-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[linear-gradient(150deg,rgba(20,20,31,0.98),rgba(16,18,28,0.94))] px-5 py-10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.95)] sm:px-6 md:px-10 md:py-12">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-[color:var(--color-secondary)]/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[color:var(--color-primary)]/15 blur-3xl" />
          <p className="relative text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]">Discover</p>
          <h1 className="relative mt-4 text-balance text-3xl font-black tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl md:text-6xl">
            Find courses worth your time
          </h1>
          <p className="relative mt-4 max-w-3xl text-sm leading-7 text-[color:var(--color-text-secondary)] sm:text-base md:text-lg">
            Outcome-first exploration for your next career move. Filter by real results, not just star ratings.
          </p>
          <div className="relative mt-8">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, provider, or category..."
              className="w-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 px-5 py-4 text-base text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] outline-none transition focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/30"
            />
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <aside className="w-full lg:w-[320px] lg:shrink-0">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 lg:sticky lg:top-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">Filters</h2>
                <button
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="rounded-lg border border-[color:var(--color-border)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-secondary)] transition hover:bg-[color:var(--color-elevated)]"
                >
                  {showFilters ? "Collapse" : "Expand"}
                </button>
              </div>

              {showFilters && (
                <div className="space-y-5 text-sm">
                  <FilterGroup
                    title="Category"
                    items={categories}
                    selected={categoryFilter}
                    onToggle={(value) =>
                      setCategoryFilter((prev) =>
                        prev.includes(value) ? prev.filter((entry) => entry !== value) : [...prev, value],
                      )
                    }
                  />

                  <FilterGroup
                    title="Provider"
                    items={providers}
                    selected={providerFilter}
                    onToggle={(value) =>
                      setProviderFilter((prev) =>
                        prev.includes(value) ? prev.filter((entry) => entry !== value) : [...prev, value],
                      )
                    }
                  />

                  <FilterGroup
                    title="Price"
                    items={["free", "paid", "subscription"]}
                    selected={priceFilter}
                    onToggle={(value) =>
                      setPriceFilter((prev) =>
                        prev.includes(value as PriceModel)
                          ? prev.filter((entry) => entry !== value)
                          : [...prev, value as PriceModel],
                      )
                    }
                  />

                  <FilterGroup
                    title="Difficulty"
                    items={["Beginner", "Intermediate", "Advanced"]}
                    selected={difficultyFilter}
                    onToggle={(value) =>
                      setDifficultyFilter((prev) =>
                        prev.includes(value as Difficulty)
                          ? prev.filter((entry) => entry !== value)
                          : [...prev, value as Difficulty],
                      )
                    }
                  />

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">Rating</p>
                    <div className="flex flex-wrap gap-2">
                      {[7, 8, 9].map((floor) => (
                        <button
                          key={floor}
                          onClick={() => setRatingFloor((prev) => (prev === floor ? null : (floor as 7 | 8 | 9)))}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            ratingFloor === floor
                              ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                              : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-elevated)]"
                          }`}
                        >
                          {floor}+
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">Outcome</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ["led-to-job", "Led to Job"],
                        ["good-for-beginners", "Good for Beginners"],
                        ["career-switch", "Career Switch"],
                        ["portfolio-strong", "Portfolio Strong"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => setOutcomeFilter((prev) => (prev === value ? null : (value as OutcomeTag)))}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            outcomeFilter === value
                              ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                              : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-elevated)]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <FilterGroup
                    title="Duration"
                    items={["<10h", "10-50h", "50h+"]}
                    selected={durationFilter}
                    onToggle={(value) =>
                      setDurationFilter((prev) =>
                        prev.includes(value as "<10h" | "10-50h" | "50h+")
                          ? prev.filter((entry) => entry !== value)
                          : [...prev, value as "<10h" | "10-50h" | "50h+"],
                      )
                    }
                  />

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">Certificate</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCertificateOnly((prev) => (prev === true ? null : true))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          certificateOnly === true
                            ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                            : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-elevated)]"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setCertificateOnly((prev) => (prev === false ? null : false))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          certificateOnly === false
                            ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                            : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-elevated)]"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          <section className="flex-1">
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Results</p>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{filtered.length} courses</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {SORTS.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSort(mode)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      sort === mode
                        ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                        : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-elevated)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    view === "grid"
                      ? "bg-[color:var(--color-primary)] text-black"
                      : "text-[color:var(--color-text-secondary)]"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    view === "list"
                      ? "bg-[color:var(--color-primary)] text-black"
                      : "text-[color:var(--color-text-secondary)]"
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {view === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((course) => (
                  <CourseGridCard key={course.slug} course={course} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((course) => (
                  <CourseListCard key={course.slug} course={course} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">{title}</p>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {items.map((value) => (
          <button
            key={value}
            onClick={() => onToggle(value)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              selected.includes(value)
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/15 text-[color:var(--color-primary)]"
                : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-elevated)]"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function CourseGridCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="group overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-primary)]/60"
    >
      <div className={`h-40 bg-gradient-to-br p-4 sm:h-44 ${course.thumbnailGradient}`}>
        <div className="flex justify-between">
          <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${providerColors[course.provider]}`}>
            {course.provider}
          </span>
          <div className="rounded-xl bg-black/45 px-2 py-1 text-right backdrop-blur-sm">
            <p className="text-xl font-black tabular-nums text-[color:var(--color-primary)]">{course.rating.toFixed(1)}</p>
            <p className="text-[10px] text-zinc-300">{course.reviewCount} reviews</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-base font-bold text-[color:var(--color-text-primary)]">{course.title}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-[color:var(--color-text-secondary)]">
          <span className="rounded-full border border-[color:var(--color-border)] px-2 py-1">{course.difficulty}</span>
          <span className="rounded-full border border-[color:var(--color-border)] px-2 py-1">{course.durationHours}h</span>
          <span className="rounded-full border border-[color:var(--color-border)] px-2 py-1">{course.priceLabel}</span>
        </div>
      </div>
    </Link>
  );
}

function CourseListCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="block rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 transition hover:border-[color:var(--color-primary)]/55"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${providerColors[course.provider]}`}>
              {course.provider}
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">{course.category}</span>
          </div>
          <h3 className="text-lg font-bold text-[color:var(--color-text-primary)]">{course.title}</h3>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
            {course.difficulty} • {course.durationHours}h • {course.priceLabel} • {course.certificate ? "Certificate" : "No certificate"}
          </p>
          <div className="mt-3 grid max-w-lg grid-cols-2 gap-2 text-xs">
            <MiniMeter label="Content Quality" value={Math.min(9.8, course.rating + 0.6)} />
            <MiniMeter label="Practicality" value={Math.max(6.4, course.rating - 0.2)} />
            <MiniMeter label="Job Relevance" value={Math.min(9.9, course.rating + 0.3)} />
            <MiniMeter label="Value" value={Math.max(6.0, course.rating - 0.1)} />
          </div>
        </div>

        <div className="flex min-w-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:text-right">
          <div>
            <p className="text-3xl font-black tabular-nums text-[color:var(--color-primary)]">{course.rating.toFixed(1)}</p>
            <p className="text-xs text-[color:var(--color-text-muted)]">{course.reviewCount} reviews</p>
          </div>
          <span className="rounded-full bg-[color:var(--color-primary)]/15 px-3 py-1 text-xs font-semibold text-[color:var(--color-primary)]">
            Trending {course.trendingScore}
          </span>
        </div>
      </div>
    </Link>
  );
}

function MiniMeter({ label, value }: { label: string; value: number }) {
  const width = `${Math.max(8, Math.min(100, value * 10))}%`;

  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] text-[color:var(--color-text-muted)]">
        <span>{label}</span>
        <span className="tabular-nums text-[color:var(--color-text-secondary)]">{value.toFixed(1)}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-black/30">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,#f5c518,#f59e0b)]" style={{ width }} />
      </div>
    </div>
  );
}

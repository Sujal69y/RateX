import { profileMock, reviewSamplesByCourse } from "@/lib/mock-data";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const reviews = Object.values(reviewSamplesByCourse).flat();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:py-8">
      <header className="rounded-3xl border border-[color:var(--color-border)] bg-[linear-gradient(135deg,rgba(20,20,31,0.98),rgba(16,18,28,0.94))] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Profile</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
          {username === profileMock.username ? profileMock.name : username}
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
          {profileMock.currentRole} → {profileMock.targetRole}
        </p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Courses Reviewed" value={String(profileMock.totalCoursesReviewed)} />
        <StatCard label="Avg Rating Given" value={profileMock.averageRatingGiven.toFixed(1)} />
        <StatCard label="Hours Learning" value={String(profileMock.hoursSpent)} />
        <StatCard label="Reputation" value={String(profileMock.reputationScore)} />
      </section>

      <section className="mt-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">Recent Reviews</h2>
        <div className="mt-4 space-y-3">
          {reviews.slice(0, 4).map((review) => (
            <article key={`${review.user}-${review.date}`} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-elevated)] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-[color:var(--color-text-primary)]">{review.user}</p>
                <p className="text-xl font-black text-[color:var(--color-primary)]">{review.overall.toFixed(1)}</p>
              </div>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{review.text}</p>
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                {review.outcome} • {review.timeSpentHours}h • {review.date}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black text-[color:var(--color-primary)]">{value}</p>
    </article>
  );
}

import { SectionShell } from './section-shell'

export function OverviewSection({ overview }) {
  return (
    <SectionShell title={overview.title}>
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)]">
          <div className="space-y-5 text-base leading-8 text-[var(--color-muted)]">
            {overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <article
          data-testid="overview-pillars-card"
          className="rounded-[2rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(241,245,249,0.78),rgba(255,255,255,0.96))] p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] sm:p-8"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text)] sm:text-[1.7rem]">
              Core Research Pillars
            </h3>

            {overview.pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                data-testid="overview-pillar-item"
                className={index === 0 ? '' : 'border-t border-[rgba(148,163,184,0.22)] pt-6'}
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      data-testid="overview-pillar-dot"
                      className="size-2 rounded-full bg-[var(--color-primary)]"
                    />
                    <h4 className="text-lg font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-xl">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="max-w-4xl text-base leading-8 text-[var(--color-muted)]">
                    {pillar.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </SectionShell>
  )
}

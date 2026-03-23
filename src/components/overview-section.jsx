import { SectionShell } from './section-shell'

export function OverviewSection({ overview }) {
  return (
    <SectionShell title={overview.title} align="left" containerClassName="max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)]">
        <div className="border-l-2 border-[rgba(37,99,235,0.18)] pl-5 sm:pl-6">
          <div className="space-y-5 text-base leading-8 text-[var(--color-muted)]">
            {overview.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? 'text-lg font-medium text-[var(--color-text)] sm:text-[1.15rem]' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <article
          data-testid="overview-pillars-card"
          className="rounded-[1.6rem] border border-[rgba(148,163,184,0.22)] bg-[rgba(255,255,255,0.64)] p-6 shadow-[0_16px_42px_rgba(15,23,42,0.04)] backdrop-blur-[2px] sm:p-8"
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

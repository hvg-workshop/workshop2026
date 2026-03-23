import { SectionShell } from './section-shell'

export function ProgramSection({ program }) {
  return (
    <SectionShell
      id="workshop-schedule"
      title={program.title}
      align="left"
      containerClassName="max-w-6xl"
    >
      <article
        data-testid="schedule-band"
        className="border-y border-[var(--color-text)] bg-[linear-gradient(90deg,rgba(241,245,249,0.74),rgba(255,255,255,0.96))] px-5 py-6 sm:px-7"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Workshop Day
            </p>
            <p className="mt-3 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">{program.date}</p>
          </div>
          <div className="border-t border-[rgba(30,41,59,0.18)] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-base text-[var(--color-text)] sm:text-lg">{program.slot}</p>
            <p className="mt-4 text-3xl font-semibold tracking-[0.08em] text-[var(--color-primary)]">
              {program.highlight}
            </p>
          </div>
        </div>
      </article>
    </SectionShell>
  )
}

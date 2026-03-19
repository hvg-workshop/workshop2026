import { SectionShell } from './section-shell'

export function ProgramSection({ program }) {
  return (
    <SectionShell
      id="workshop-schedule"
      title={program.title}
    >
      <div className="space-y-6">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-center text-3xl font-semibold text-[var(--color-text)]">{program.date}</p>
          <div className="mx-auto mt-6 max-w-xl border-t-4 border-[var(--color-text)] pt-4 text-center">
            <p className="text-xl text-[var(--color-text)]">{program.slot}</p>
            <p className="mt-4 text-4xl font-semibold tracking-[0.08em] text-[var(--color-primary)]">
              {program.highlight}
            </p>
          </div>
        </article>
      </div>
    </SectionShell>
  )
}

import { SectionShell } from './section-shell'

export function ImportantDatesSection({ importantDates }) {
  return (
    <SectionShell
      id="important-dates"
      title={importantDates.title}
    >
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(241,245,249,0.78),rgba(255,255,255,0.98))] p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] sm:p-8">
        <div className="space-y-0">
          {importantDates.items.map((item, index) => {
            const [label, value] = item.split(': ')

            return (
              <div
                key={item}
                data-testid={`important-date-row-${index}`}
                className={`flex flex-col gap-2 py-5 text-left sm:flex-row sm:items-center sm:gap-4 ${
                  index === 0 ? '' : 'border-t border-[rgba(148,163,184,0.22)]'
                }`}
              >
                <p className="text-base font-semibold text-[var(--color-text)] sm:text-lg">
                  {label}:
                </p>
                <p className="text-base text-[var(--color-muted)] sm:text-lg">{value}</p>
              </div>
            )
          })}
        </div>
      </article>
    </SectionShell>
  )
}

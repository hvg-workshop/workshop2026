import { SectionShell } from './section-shell'

export function ImportantDatesSection({ importantDates }) {
  return (
    <SectionShell
      id="important-dates"
      title={importantDates.title}
      align="left"
      containerClassName="max-w-6xl"
    >
      <div data-testid="important-dates-rail" className="border-l border-[rgba(37,99,235,0.24)] pl-6 sm:pl-8">
        <div className="space-y-0">
          {importantDates.items.map((item, index) => {
            const [label, value] = item.split(': ')

            return (
              <div
                key={item}
                data-testid={`important-date-row-${index}`}
                className={`relative flex flex-col gap-2 py-5 text-left sm:flex-row sm:items-center sm:gap-4 ${
                  index === 0 ? '' : 'border-t border-[rgba(148,163,184,0.22)]'
                }`}
              >
                <span className="absolute -left-[1.82rem] top-7 size-3 rounded-full border border-[rgba(37,99,235,0.22)] bg-white" />
                <p className="text-base font-semibold text-[var(--color-text)] sm:text-lg">
                  {label}:
                </p>
                <p className="text-base text-[var(--color-muted)] sm:text-lg">{value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

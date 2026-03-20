import { SectionShell } from './section-shell'

export function TopicsSection({ topics }) {
  return (
    <SectionShell
      id="topics"
      title={topics.title}
    >
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] sm:p-8">
        <ul className="grid gap-4 text-base leading-8 text-[var(--color-muted)]">
          {topics.items.map((topic) => (
            <li key={topic} className="flex items-start gap-3">
              <span
                data-testid="topic-dot"
                className="mt-[0.72rem] size-2 shrink-0 rounded-full bg-[var(--color-primary)]"
              />
              <span className="flex-1">{topic}</span>
            </li>
          ))}
        </ul>
      </article>
    </SectionShell>
  )
}

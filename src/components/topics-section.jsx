import { SectionShell } from './section-shell'

export function TopicsSection({ topics }) {
  return (
    <SectionShell
      id="topics"
      title={topics.title}
      align="left"
      containerClassName="max-w-6xl"
    >
      <ul
        data-testid="topics-directory"
        className="grid gap-x-10 gap-y-2 border-y border-[var(--color-line)] py-4 text-base leading-8 text-[var(--color-muted)] lg:grid-cols-2"
      >
        {topics.items.map((topic) => (
          <li
            key={topic}
            className="flex items-start gap-3 border-b border-[rgba(148,163,184,0.16)] py-4 last:border-b-0 lg:last:border-b lg:[&:nth-last-child(2)]:border-b-0 lg:[&:nth-last-child(1)]:border-b-0"
          >
            <span
              data-testid="topic-dot"
              className="mt-[0.72rem] size-2 shrink-0 rounded-full bg-[var(--color-primary)]"
            />
            <span className="flex-1">{topic}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

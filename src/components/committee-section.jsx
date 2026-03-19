import { SectionShell } from './section-shell'

export function CommitteeSection({ committee }) {
  return (
    <SectionShell
      id="committee"
      title={committee.title}
    >
      <div data-testid="committee-grid" className="grid gap-5 md:grid-cols-2">
        {committee.members.map((member) => (
          <article
            key={`${member.name}-${member.email}`}
            className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--color-text)]">{member.name}</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{member.affiliation}</p>
              </div>
              {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email) ? (
                <a
                  href={`mailto:${member.email}`}
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-soft)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[rgba(37,99,235,0.24)] hover:text-[var(--color-primary)]"
                >
                  {member.email}
                </a>
              ) : null}
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
              {member.bioParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

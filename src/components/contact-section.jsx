import { SectionShell } from './section-shell'

export function ContactSection({ contact }) {
  return (
    <SectionShell
      id="contact"
      title={contact.title}
    >
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.05)] sm:p-8">
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            {contact.name}
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--color-muted)]">{contact.note}</p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-soft)] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:border-[rgba(37,99,235,0.24)] hover:text-[var(--color-primary)]"
          >
            {contact.email}
          </a>
        </div>
      </article>
    </SectionShell>
  )
}

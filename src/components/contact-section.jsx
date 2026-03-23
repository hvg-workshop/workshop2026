import { SectionShell } from './section-shell'

export function ContactSection({ contact }) {
  return (
    <SectionShell
      id="contact"
      title={contact.title}
      align="left"
      containerClassName="max-w-6xl"
      sectionClassName="border-b-0 pb-12"
    >
      <div
        data-testid="contact-strip"
        className="flex flex-col gap-4 border-y border-[var(--color-line)] py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">{contact.name}</h3>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">{contact.note}</p>
        </div>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-soft)] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:border-[rgba(37,99,235,0.24)] hover:text-[var(--color-primary)]"
        >
          {contact.email}
        </a>
      </div>
    </SectionShell>
  )
}

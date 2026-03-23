import { SectionShell } from './section-shell'

export function SpeakersSection({ speakers }) {
  return (
    <SectionShell
      id="speakers"
      title={speakers.title}
    >
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] sm:p-8">
        <p className="text-center text-xl font-medium text-[var(--color-text)] sm:text-2xl">
          {speakers.statusText}
        </p>
      </article>
    </SectionShell>
  )
}

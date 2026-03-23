import { SectionShell } from './section-shell'

export function SpeakersSection({ speakers }) {
  return (
    <SectionShell
      id="speakers"
      title={speakers.title}
      align="left"
      containerClassName="max-w-6xl"
    >
      <div
        data-testid="speakers-announcement"
        className="border-y border-[var(--color-line)] bg-[rgba(241,245,249,0.72)] px-4 py-5 sm:px-6"
      >
        {/* <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
          Invited Speakers
        </p> */}
        <p className="text-xl font-medium text-[var(--color-text)] sm:text-2xl">
          {speakers.statusText}
        </p>
      </div>
    </SectionShell>
  )
}

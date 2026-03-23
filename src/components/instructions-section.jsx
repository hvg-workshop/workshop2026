import { SectionShell } from './section-shell'

function InstructionCard({ title, children, tone = 'default', className = '' }) {
  const toneClassName =
    tone === 'feature'
      ? 'bg-[rgba(255,255,255,0.96)] shadow-[0_18px_50px_rgba(15,23,42,0.05)]'
      : 'bg-[rgba(241,245,249,0.62)]'

  return (
    <article className={`rounded-[1.8rem] border border-[var(--color-line)] p-6 ${toneClassName} ${className}`}>
      <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">{children}</div>
    </article>
  )
}

export function AuthorsSection({ instructions }) {
  const [guidelinesBeforeLink, guidelinesAfterLink] = instructions.submissionGuidelines.split('ICPR 2026 website')
  const emphasisLinkClass =
    'text-[1rem] font-bold text-[var(--color-text)] underline decoration-[var(--color-text)] decoration-2 underline-offset-4'
  // 显式声明下划线样式，避免被全局链接 reset 覆盖后出现视觉回退。
  const emphasisLinkStyle = {
    textDecorationLine: 'underline',
    textDecorationColor: 'var(--color-text)',
    textDecorationThickness: '2px',
    textUnderlineOffset: '0.22em',
  }

  return (
    <SectionShell
      id="instructions-for-authors"
      title={instructions.title}
      align="left"
      containerClassName="max-w-6xl"
    >
      <div className="grid gap-4 lg:grid-cols-12">
        <InstructionCard title="Submission Guidelines" tone="feature" className="lg:col-span-7">
          <p>
            {guidelinesBeforeLink}
            <a
              href={instructions.authorsWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className={emphasisLinkClass}
              style={emphasisLinkStyle}
            >
              ICPR 2026 website
            </a>
            {guidelinesAfterLink}
          </p>
        </InstructionCard>
        <InstructionCard title="Submission System" tone="feature" className="lg:col-span-5">
          <p>
            Papers must be submitted through{' '}
            <a
              href={instructions.submissionSystemUrl}
              target="_blank"
              rel="noreferrer"
              className={emphasisLinkClass}
              style={emphasisLinkStyle}
            >
              the Microsoft CMT submission system
            </a>
            , which is used to manage the peer-review process. The Microsoft CMT service is
            provided free of charge by Microsoft, including infrastructure and technical support.
          </p>
        </InstructionCard>
        <InstructionCard title="Acknowledgement" className="lg:col-span-6">
          <p>{instructions.cmtAcknowledgement}</p>
        </InstructionCard>
        <InstructionCard title="Ethics" className="lg:col-span-6">
          <p>{instructions.ethics}</p>
        </InstructionCard>
      </div>
    </SectionShell>
  )
}

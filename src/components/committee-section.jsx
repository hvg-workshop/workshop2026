import { SectionShell } from './section-shell'

const GROUPED_MEMBER_NAMES = [
  'Hui Li',
  'Baoyou Chen',
  'Mingwang Xu',
  'Kaihui Cheng',
  'Jiahao Cui',
  'Quanhui Tang',
]

function hasValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function FeaturedMemberCard({ member }) {
  return (
    <article className="relative rounded-[1.8rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
      <div>
        <div className="pr-0 sm:pr-44">
          <h3 className="text-2xl font-semibold text-[var(--color-text)]">{member.name}</h3>
          <p className="mt-1 text-sm font-medium uppercase text-[var(--color-primary)]">
            {member.role}
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{member.affiliation}</p>
        </div>
        {hasValidEmail(member.email) ? (
          <a
            href={`mailto:${member.email}`}
            // 独立委员卡片继续使用右上角邮箱胶囊，维持人物目录区的识别度。
            className="absolute right-6 top-6 rounded-full border border-[var(--color-line)] bg-[var(--color-soft)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[rgba(37,99,235,0.24)] hover:text-[var(--color-primary)]"
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
  )
}

function GroupedMemberBlock({ member, isFirst }) {
  return (
    <section className={isFirst ? '' : 'border-t border-[rgba(148,163,184,0.22)] pt-6'}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h4 className="text-2xl font-semibold text-[var(--color-text)]">{member.name}</h4>
          <p className="text-sm font-medium uppercase text-[var(--color-primary)]">
            {member.role}
          </p>
          <p className="text-sm text-[var(--color-muted)]">{member.affiliation}</p>
        </div>
        {hasValidEmail(member.email) ? (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex w-fit rounded-full border border-[var(--color-line)] bg-[var(--color-soft)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:border-[rgba(37,99,235,0.24)] hover:text-[var(--color-primary)]"
          >
            {member.email}
          </a>
        ) : null}
      </div>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
        {member.bioParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}

export function CommitteeSection({ committee }) {
  // 青年成员合并为单张整行卡片，资深委员继续保持双列独立卡片。
  const groupedMembers = committee.members.filter((member) => GROUPED_MEMBER_NAMES.includes(member.name))
  const featuredMembers = committee.members.filter((member) => !GROUPED_MEMBER_NAMES.includes(member.name))

  return (
    <SectionShell
      id="committee"
      title={committee.title}
      align="left"
      containerClassName="max-w-6xl"
    >
      <div className="space-y-6">
        <div data-testid="committee-grid" className="grid gap-5 md:grid-cols-2">
          {featuredMembers.map((member) => (
            <FeaturedMemberCard key={`${member.name}-${member.email}`} member={member} />
          ))}
        </div>

        <article
          data-testid="committee-grouped-card"
          className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-8"
        >
          <div className="space-y-6">
            {groupedMembers.map((member, index) => (
              <GroupedMemberBlock
                key={`${member.name}-${member.email}`}
                member={member}
                isFirst={index === 0}
              />
            ))}
          </div>
        </article>
      </div>
    </SectionShell>
  )
}

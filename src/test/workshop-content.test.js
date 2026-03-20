import { workshopContent } from '../content/workshop-content'

describe('workshop content model', () => {
  it('contains the expanded single-page sections and updated committee data', () => {
    expect(workshopContent.brandLabel).toBe('HVG 2026')

    expect(workshopContent.tabs.map((tab) => tab.label)).toEqual([
      'OVERVIEW',
      'Topics',
      'Important Dates',
      'Instructions for Authors',
      'Committee',
      'Workshop Schedule',
      'Contact',
    ])

    expect(workshopContent.hero.title).toBe('Human-Centric Video Generation(HVG)')
    expect(workshopContent.committee.title).toBe('Committee')
    expect(workshopContent.overview.paragraphs.length).toBeGreaterThan(1)

    expect(workshopContent.topics.title).toBe('Topics')
    expect(workshopContent.topics.items.length).toBeGreaterThan(3)

    expect(workshopContent.importantDates.title).toBe('Important Dates')
    expect(workshopContent.importantDates.items).toEqual([
      'Submission Deadline: May 01, 2026',
      'Author Notification: June 10, 2026',
      'Camera-Ready Deadline: June 20, 2026',
      'Workshop Date: August 21, 2026',
    ])

    expect(workshopContent.contact.title).toBe('Contact')
    expect(workshopContent.contact.name).toBe('Quanhui Tang')
    expect(workshopContent.contact.email).toBe('qhtang25@m.fudan.edu.cn')

    expect(workshopContent.authorInstructions.submissionGuidelines).toContain(
      'The conference workshop proceeding will be published in the Lecture Notes in Computer Science (LNCS) series.',
    )
    expect(workshopContent.authorInstructions.authorsWebsiteUrl).toBe('https://icpr2026.org/authors.html')
    expect(workshopContent.authorInstructions.cmtAcknowledgement).toContain(
      'The Microsoft CMT service was used for managing the peer-reviewing process for this conference.',
    )

    expect(workshopContent.committee.members.length).toBeGreaterThan(0)
    expect(workshopContent.committee.members.find((member) => member.name === 'Kaihui Cheng')?.email).toBe(
      'khcheng24@m.fudan.edu.cn',
    )
    expect(workshopContent.committee.members.find((member) => member.name === 'Baoyou Chen')).toMatchObject({
      affiliation: 'Fudan University',
      email: 'bychen25@m.fudan.edu.cn',
    })

    const earlyCareerMembers = workshopContent.committee.members.filter((member) =>
      ['Hui Li', 'Baoyou Chen', 'Mingwang Xu', 'Kaihui Cheng', 'Jiahao Cui', 'Quanhui Tang'].includes(member.name),
    )

    expect(earlyCareerMembers).toHaveLength(6)
    expect(earlyCareerMembers.every((member) => member.bioParagraphs.length === 1)).toBe(true)

    expect(workshopContent.program.date).toBe('Friday, 21 August 2026')
    expect(workshopContent.program.slot).toBe('Full-Day Workshop | 08:30-17:30')
    expect(workshopContent.program.adjacentWorkshops).toBeUndefined()
  })
})


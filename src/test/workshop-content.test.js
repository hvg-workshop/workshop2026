import { workshopContent } from '../content/workshop-content'

describe('workshop content model', () => {
  it('contains the single-page tabs and core content blocks', () => {
    expect(workshopContent.tabs.map((tab) => tab.label)).toEqual([
      'OVERVIEW',
      'INSTRUCTIONS FOR AUTHORS',
      'COMMITTEE',
      'WORKSHOP SCHEDULE',
    ])
    expect(workshopContent.hero.title).toBe('Human-Centric Video Generation(HVG)')
    expect(workshopContent.committee.title).toBe('COMMITTEE')
    expect(workshopContent.overview.paragraphs.length).toBeGreaterThan(1)
    expect(workshopContent.authorInstructions.submissionGuidelines).toContain(
      'The conference workshop proceeding will be published in the Lecture Notes in Computer Science (LNCS) series.',
    )
    expect(workshopContent.authorInstructions.authorsWebsiteUrl).toBe('https://icpr2026.org/authors.html')
    expect(workshopContent.authorInstructions.cmtAcknowledgement).toContain(
      'The Microsoft CMT service was used for managing the peer-reviewing process for this conference.',
    )
    expect(workshopContent.committee.members.length).toBeGreaterThan(0)
    expect(workshopContent.program.date).toBe('Friday, 21 August 2026')
    expect(workshopContent.program.slot).toBe('Full-Day Workshop | 08:30 – 17:30')
    expect(workshopContent.program.adjacentWorkshops).toBeUndefined()
  })
})

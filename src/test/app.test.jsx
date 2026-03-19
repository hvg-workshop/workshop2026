import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import App from '../App'

describe('HVG single-page site', () => {
  it('renders the workshop hero and uppercase tab navigation', () => {
    render(<App />)

    const overviewTab = screen.getByRole('link', { name: 'OVERVIEW' })
    const heroHeading = screen.getByRole('heading', { name: 'Human-Centric Video Generation(HVG)' })

    expect(heroHeading).toBeInTheDocument()
    expect(screen.getByText('ICPR 2026 WORKSHOP')).toBeInTheDocument()
    expect(screen.queryByText('PROPOSAL')).not.toBeInTheDocument()
    expect(
      screen.getByText(
        'Advancing controllable, realistic, and physically plausible human video synthesis for the ICPR 2026 research community.',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByText('Static Single-Page Site')).not.toBeInTheDocument()
    expect(screen.queryByText('Double-blind')).not.toBeInTheDocument()
    expect(screen.queryByText('Microsoft CMT')).not.toBeInTheDocument()
    expect(overviewTab).toHaveAttribute('href', '#overview')
    expect(screen.getByRole('link', { name: 'INSTRUCTIONS FOR AUTHORS' })).toHaveAttribute(
      'href',
      '#instructions-for-authors',
    )
    expect(screen.getByRole('link', { name: 'COMMITTEE' })).toHaveAttribute('href', '#committee')
    expect(screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })).toHaveAttribute(
      'href',
      '#workshop-schedule',
    )
    expect(document.getElementById('overview')).toContainElement(heroHeading)
    expect(overviewTab.className).not.toContain('text-white')
    expect(
      screen.queryByText(
        'A concise editorial overview of the workshop motivation, research pillars, and target topics.',
      ),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Workshop Scope')).not.toBeInTheDocument()
    expect(screen.queryByText('Author Information')).not.toBeInTheDocument()
    expect(screen.queryByText('Organizing Team')).not.toBeInTheDocument()
    expect(screen.queryByText('Schedule Snapshot')).not.toBeInTheDocument()
    expect(screen.getByText('ICPR 2026 WORKSHOP')).toBeInTheDocument()
    expect(screen.queryByText('PROPOSAL')).not.toBeInTheDocument()
    expect(screen.queryByText('Static Single-Page Site')).not.toBeInTheDocument()
    expect(screen.queryByText('Double-blind')).not.toBeInTheDocument()
    expect(screen.queryByText('Microsoft CMT')).not.toBeInTheDocument()
  })

  it('updates the active tab when the current section hash changes', () => {
    window.history.pushState({}, '', '#overview')
    render(<App />)

    const overviewTab = screen.getByRole('link', { name: 'OVERVIEW' })
    const committeeTab = screen.getByRole('link', { name: 'COMMITTEE' })

    expect(overviewTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
    expect(committeeTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')

    window.history.pushState({}, '', '#committee')
    window.dispatchEvent(new HashChangeEvent('hashchange'))

    return waitFor(() => {
      expect(committeeTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(overviewTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('syncs hash and active state when clicking the WORKSHOP SCHEDULE tab', async () => {
    window.history.pushState({}, '', '#overview')
    render(<App />)

    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })

    fireEvent.click(scheduleTab)

    await waitFor(() => {
      expect(window.location.hash).toBe('#workshop-schedule')
      expect(scheduleTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('keeps OVERVIEW active and scrolls to the hero when clicking OVERVIEW from a lower section', async () => {
    window.history.pushState({}, '', '#committee')
    render(<App />)

    window.scrollTo.mockClear()

    const overviewSection = document.getElementById('overview')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 700 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 1400 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 2100 })

    Object.defineProperty(window, 'scrollY', {
      value: 1500,
      writable: true,
      configurable: true,
    })

    const overviewTab = screen.getByRole('link', { name: 'OVERVIEW' })

    fireEvent.click(overviewTab)
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#overview')
      expect(overviewTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })
  })

  it('updates the active tab while scrolling after a tab jump', async () => {
    window.history.pushState({}, '', '#overview')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 700 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 1400 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 2100 })

    const committeeTab = screen.getByRole('link', { name: 'COMMITTEE' })
    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })

    window.history.pushState({}, '', '#committee')
    window.dispatchEvent(new HashChangeEvent('hashchange'))

    await waitFor(() => {
      expect(committeeTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
    })

    Object.defineProperty(window, 'scrollY', {
      value: 2050,
      writable: true,
      configurable: true,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(scheduleTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(committeeTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
      expect(window.location.hash).toBe('#workshop-schedule')
    })
  })

  it('activates WORKSHOP SCHEDULE near the page bottom even when the last section is short', async () => {
    window.history.pushState({}, '', '#committee')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 1560 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 2720 })

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3600,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 2705,
    })

    fireEvent.scroll(window)

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' }).className).toContain(
        'bg-[rgba(37,99,235,0.12)]',
      )
      expect(window.location.hash).toBe('#workshop-schedule')
    })
  })

  it('renders the author instructions with the CMT acknowledgement and link', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'INSTRUCTIONS FOR AUTHORS' })).toBeInTheDocument()
    expect(
      screen.queryByText(
        'This section combines core author guidance, submission logistics, and the proposal-side review, diversity, and ethics statements required for the workshop website.',
      ),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Submission Guidelines')).toBeInTheDocument()
    expect(screen.getByText('Submission System')).toBeInTheDocument()
    expect(screen.getByText('Acknowledgement')).toBeInTheDocument()
    expect(screen.getByText('Ethics')).toBeInTheDocument()
    expect(screen.queryByText('Page Limits')).not.toBeInTheDocument()
    expect(screen.queryByText('Reviewing Process')).not.toBeInTheDocument()
    expect(screen.queryByText('Diversity')).not.toBeInTheDocument()
    expect(
      screen.getByText(
        /The conference workshop proceeding will be published in the Lecture Notes in Computer Science \(LNCS\) series\./i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ICPR 2026 website' })).toHaveAttribute(
      'href',
      'https://icpr2026.org/authors.html',
    )
    const icprWebsiteLink = screen.getByRole('link', { name: 'ICPR 2026 website' })
    const cmtLink = screen.getByRole('link', { name: /the microsoft cmt submission system/i })

    expect(cmtLink).toHaveAttribute(
      'href',
      'https://cmt3.research.microsoft.com/',
    )
    expect(cmtLink).toHaveAttribute('target', '_blank')
    expect(icprWebsiteLink).toHaveAttribute('target', '_blank')
    expect(icprWebsiteLink.className).toContain('font-bold')
    expect(icprWebsiteLink.className).toContain('text-[var(--color-text)]')
    expect(icprWebsiteLink.className).toContain('text-[1.125rem]')
    expect(icprWebsiteLink.className).not.toContain('text-[var(--color-primary)]')
    expect(cmtLink.className).toContain('font-bold')
    expect(cmtLink.className).toContain('text-[var(--color-text)]')
    expect(cmtLink.className).toContain('text-[1.125rem]')
    expect(cmtLink.className).not.toContain('text-[var(--color-primary)]')
    expect(
      screen.getByText(
        'The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.',
      ),
    ).toBeInTheDocument()

    const submissionGuidelinesCard = screen.getByText('Submission Guidelines').closest('article')
    const submissionSystemCard = screen.getByText('Submission System').closest('article')
    const acknowledgementCard = screen.getByText('Acknowledgement').closest('article')

    expect(submissionGuidelinesCard?.className).toContain('border-[var(--color-line)]')
    expect(submissionGuidelinesCard?.className).toContain('bg-white')
    expect(submissionSystemCard?.className).toBe(submissionGuidelinesCard?.className)
    expect(acknowledgementCard?.className).toBe(submissionGuidelinesCard?.className)
  })

  it('renders overview pillars inside a single grouped card', () => {
    render(<App />)

    const pillarsCard = screen.getByTestId('overview-pillars-card')
    const pillarItems = screen.getAllByTestId('overview-pillar-item')
    const pillarsTitle = screen.getByRole('heading', { name: 'Core Research Pillars' })
    const topicsTitle = screen.getByRole('heading', { name: 'Topics' })
    const firstPillarTitle = screen.getByRole('heading', { name: 'Conditional Motion Synthesis' })

    expect(pillarsCard).toBeInTheDocument()
    expect(pillarItems).toHaveLength(3)
    expect(pillarsTitle).toBeInTheDocument()
    expect(topicsTitle.className).toBe(pillarsTitle.className)
    expect(firstPillarTitle.className).toContain('text-xl')
    expect(firstPillarTitle.className).not.toContain('text-2xl')
    expect(screen.queryByText('01')).not.toBeInTheDocument()
    expect(screen.queryByText('02')).not.toBeInTheDocument()
    expect(screen.queryByText('03')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('overview-pillar-dot')).toHaveLength(3)
  })

  it('renders committee and WORKSHOP SCHEDULE content', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'COMMITTEE' })).toHaveAttribute('href', '#committee')
    expect(screen.getByRole('heading', { name: 'COMMITTEE' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'GENERAL CHAIRS' })).not.toBeInTheDocument()
    expect(screen.getByText('Siyu Zhu')).toBeInTheDocument()
    expect(screen.getByText(/He leads the generative vision lab/i)).toBeInTheDocument()
    expect(screen.queryByText('WORKSHOP CONTACT')).not.toBeInTheDocument()
    expect(screen.getByText('siyuzhu@fudan.edu.cn')).toBeInTheDocument()
    expect(screen.getByText('wangjingdong@baidu.com')).toBeInTheDocument()
    expect(screen.queryByText('Email to be confirmed')).not.toBeInTheDocument()
    expect(screen.getByTestId('committee-grid').className).toContain('md:grid-cols-2')

    const siyuEmailChip = screen.getByRole('link', { name: 'siyuzhu@fudan.edu.cn' })
    const siyuCard = siyuEmailChip.closest('article')

    expect(siyuCard?.className).toContain('relative')
    expect(siyuEmailChip.className).toContain('absolute')
    expect(siyuEmailChip.className).toContain('top-6')
    expect(siyuEmailChip.className).toContain('right-6')

    expect(screen.getByRole('heading', { name: 'WORKSHOP SCHEDULE' })).toBeInTheDocument()
    expect(screen.getByText('Friday, 21 August 2026')).toBeInTheDocument()
    expect(screen.getByText('Full-Day Workshop | 08:30 – 17:30')).toBeInTheDocument()
    expect(screen.queryByText('Adjacent Friday Morning Workshops')).not.toBeInTheDocument()
    expect(screen.getAllByText('HVG').length).toBeGreaterThan(0)
    expect(
      screen.queryByText(
        'HVG 2026 is presented as a light academic editorial microsite for the ICPR 2026 workshop proposal, author information, and committee overview.',
      ),
    ).not.toBeInTheDocument()
  })

  it('reveals the back-to-top button after scrolling and triggers smooth scroll', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const backToTopButton = screen.getByRole('button', { name: 'Scroll to top' })
    expect(backToTopButton.className).toContain('opacity-0')
    expect(backToTopButton.className).toContain('right-8')
    expect(backToTopButton.className).toContain('bottom-8')
    expect(backToTopButton).not.toHaveTextContent('Back to top')

    Object.defineProperty(window, 'scrollY', {
      value: 640,
      writable: true,
      configurable: true,
    })
    fireEvent.scroll(window)

    expect(backToTopButton.className).toContain('opacity-100')
    fireEvent.click(backToTopButton)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})

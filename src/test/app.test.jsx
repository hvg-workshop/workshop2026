import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { vi } from 'vitest'

import App from '../App'

describe('HVG single-page site', () => {
  it('renders the updated tab labels and centered hero', () => {
    const { container } = render(<App />)

    const nav = container.querySelector('nav')
    const tabs = within(nav).getAllByRole('link')
    const tabLabels = tabs.map((tab) => tab.textContent)
    const heroHeading = screen.getByRole('heading', { name: 'Human-Centric Video Generation(HVG)' })
    const heroContent = screen.getByTestId('hero-content')
    const hero = container.querySelector('header')

    expect(tabLabels).toEqual([
      'OVERVIEW',
      'TOPICS',
      'IMPORTANT DATES',
      'INSTRUCTIONS FOR AUTHORS',
      'COMMITTEE',
      'WORKSHOP SCHEDULE',
      'CONTACT',
    ])
    expect(screen.getByRole('link', { name: 'OVERVIEW' })).toHaveAttribute('href', '#overview')
    expect(screen.getByRole('link', { name: 'TOPICS' })).toHaveAttribute('href', '#topics')
    expect(screen.getByRole('link', { name: 'IMPORTANT DATES' })).toHaveAttribute('href', '#important-dates')
    expect(screen.getByRole('link', { name: 'INSTRUCTIONS FOR AUTHORS' })).toHaveAttribute(
      'href',
      '#instructions-for-authors',
    )
    expect(screen.getByRole('link', { name: 'COMMITTEE' })).toHaveAttribute('href', '#committee')
    expect(screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })).toHaveAttribute(
      'href',
      '#workshop-schedule',
    )
    expect(screen.getByRole('link', { name: 'CONTACT' })).toHaveAttribute('href', '#contact')
    expect(nav?.compareDocumentPosition(hero)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(heroContent.className).toContain('items-center')
    expect(heroContent.className).toContain('text-center')
    expect(document.getElementById('overview')).toContainElement(heroHeading)
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

  it('syncs hash and active state when clicking the Contact tab', async () => {
    window.history.pushState({}, '', '#overview')
    render(<App />)

    const contactTab = screen.getByRole('link', { name: 'CONTACT' })

    fireEvent.click(contactTab)

    await waitFor(() => {
      expect(window.location.hash).toBe('#contact')
      expect(contactTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('keeps OVERVIEW active and scrolls to the hero when clicking OVERVIEW from a lower section', async () => {
    window.history.pushState({}, '', '#committee')
    render(<App />)

    window.scrollTo.mockClear()

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 680 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1280 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 1880 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2480 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3080 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 3680 })

    Object.defineProperty(window, 'scrollY', {
      value: 2500,
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

  it('updates the active tab while scrolling to Important Dates after a tab jump', async () => {
    window.history.pushState({}, '', '#overview')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 5200,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 680 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1280 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 1880 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2480 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3080 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 3680 })

    const datesTab = screen.getByRole('link', { name: 'IMPORTANT DATES' })

    Object.defineProperty(window, 'scrollY', {
      value: 1240,
      writable: true,
      configurable: true,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(datesTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(window.location.hash).toBe('#important-dates')
    })
  })

  it('activates Contact near the page bottom even when the last section is short', async () => {
    window.history.pushState({}, '', '#committee')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 4980,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 4075,
    })

    fireEvent.scroll(window)

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'CONTACT' }).className).toContain(
        'bg-[rgba(37,99,235,0.12)]',
      )
      expect(window.location.hash).toBe('#contact')
    })
  })

  it('re-dispatches hashchange when clicking CONTACT while the hash is already #contact', () => {
    window.history.pushState({}, '', '#contact')
    render(<App />)

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
    const contactTab = screen.getByRole('link', { name: 'CONTACT' })

    fireEvent.click(contactTab)

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(HashChangeEvent))
    dispatchSpy.mockRestore()
  })

  it('keeps WORKSHOP SCHEDULE active when near the bottom but Contact has not been reached yet', async () => {
    window.history.pushState({}, '', '#overview')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 4200,
    })

    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })

    fireEvent.click(scheduleTab)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 3330,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#workshop-schedule')
      expect(scheduleTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(screen.getByRole('link', { name: 'CONTACT' }).className).not.toContain(
        'bg-[rgba(37,99,235,0.12)]',
      )
    })
  })

  it('keeps CONTACT active after a tab jump even if WORKSHOP SCHEDULE is still intersecting', async () => {
    const originalIntersectionObserver = globalThis.IntersectionObserver
    const observerInstances = []

    class ControlledIntersectionObserver {
      constructor(callback) {
        this.callback = callback
        observerInstances.push(this)
      }

      observe() {}
      unobserve() {}
      disconnect() {}

      trigger(entries) {
        this.callback(entries)
      }
    }

    globalThis.IntersectionObserver = ControlledIntersectionObserver
    window.IntersectionObserver = ControlledIntersectionObserver

    try {
      window.history.pushState({}, '', '#overview')
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
        configurable: true,
      })
      render(<App />)

      const overviewSection = document.getElementById('overview')
      const topicsSection = document.getElementById('topics')
      const datesSection = document.getElementById('important-dates')
      const authorsSection = document.getElementById('instructions-for-authors')
      const committeeSection = document.getElementById('committee')
      const scheduleSection = document.getElementById('workshop-schedule')
      const contactSection = document.getElementById('contact')

      Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
      Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
      Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
      Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
      Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
      Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
      Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        writable: true,
        value: 900,
      })
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 6200,
      })

      const contactTab = screen.getByRole('link', { name: 'CONTACT' })

      fireEvent.click(contactTab)

      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        writable: true,
        value: 3988,
      })

      observerInstances.at(-1)?.trigger([
        { target: scheduleSection, isIntersecting: true },
        { target: contactSection, isIntersecting: false },
      ])

      await waitFor(() => {
        expect(window.location.hash).toBe('#contact')
        expect(contactTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
        expect(screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' }).className).not.toContain(
          'bg-[rgba(37,99,235,0.12)]',
        )
      })
    } finally {
      globalThis.IntersectionObserver = originalIntersectionObserver
      window.IntersectionObserver = originalIntersectionObserver
    }
  })

  it('does not fall back to WORKSHOP SCHEDULE when CONTACT becomes near-bottom before reaching its activation line', async () => {
    window.history.pushState({}, '', '#overview')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 4800,
    })

    const contactTab = screen.getByRole('link', { name: 'CONTACT' })

    fireEvent.click(contactTab)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 3892,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#contact')
      expect(contactTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' }).className).not.toContain(
        'bg-[rgba(37,99,235,0.12)]',
      )
    })
  })

  it('syncs hash and active tab upward from CONTACT to WORKSHOP SCHEDULE', async () => {
    window.history.pushState({}, '', '#overview')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 4980,
    })

    const contactTab = screen.getByRole('link', { name: 'CONTACT' })
    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })

    fireEvent.click(contactTab)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 4075,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#contact')
      expect(contactTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
    })

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 3330,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#workshop-schedule')
      expect(scheduleTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(contactTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('syncs hash and active tab upward from WORKSHOP SCHEDULE to COMMITTEE', async () => {
    window.history.pushState({}, '', '#overview')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 4980,
    })

    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })
    const committeeTab = screen.getByRole('link', { name: 'COMMITTEE' })

    fireEvent.click(scheduleTab)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 3330,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#workshop-schedule')
      expect(scheduleTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
    })

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 2620,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#committee')
      expect(committeeTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(scheduleTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('cancels a pending CONTACT jump when the user scrolls upward away from it', async () => {
    window.history.pushState({}, '', '#committee')
    Object.defineProperty(window, 'scrollY', {
      value: 2740,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 6200,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })

    const contactTab = screen.getByRole('link', { name: 'CONTACT' })
    const committeeTab = screen.getByRole('link', { name: 'COMMITTEE' })

    fireEvent.click(contactTab)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 2600,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#committee')
      expect(committeeTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(contactTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('cancels a pending WORKSHOP SCHEDULE jump when the user scrolls upward away from it', async () => {
    window.history.pushState({}, '', '#important-dates')
    Object.defineProperty(window, 'scrollY', {
      value: 1280,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 6200,
    })
    render(<App />)

    const overviewSection = document.getElementById('overview')
    const topicsSection = document.getElementById('topics')
    const datesSection = document.getElementById('important-dates')
    const authorsSection = document.getElementById('instructions-for-authors')
    const committeeSection = document.getElementById('committee')
    const scheduleSection = document.getElementById('workshop-schedule')
    const contactSection = document.getElementById('contact')

    Object.defineProperty(overviewSection, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(topicsSection, 'offsetTop', { configurable: true, value: 780 })
    Object.defineProperty(datesSection, 'offsetTop', { configurable: true, value: 1420 })
    Object.defineProperty(authorsSection, 'offsetTop', { configurable: true, value: 2080 })
    Object.defineProperty(committeeSection, 'offsetTop', { configurable: true, value: 2740 })
    Object.defineProperty(scheduleSection, 'offsetTop', { configurable: true, value: 3440 })
    Object.defineProperty(contactSection, 'offsetTop', { configurable: true, value: 4100 })

    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })
    const topicsTab = screen.getByRole('link', { name: 'TOPICS' })

    fireEvent.click(scheduleTab)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 1240,
    })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(window.location.hash).toBe('#topics')
      expect(topicsTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(scheduleTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })

  it('renders the author instructions with the CMT acknowledgement and link', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Instructions for Authors' })).toBeInTheDocument()
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

    const icprWebsiteLink = screen.getByRole('link', { name: 'ICPR 2026 website' })
    const cmtLink = screen.getByRole('link', { name: /the microsoft cmt submission system/i })

    expect(icprWebsiteLink).toHaveAttribute('href', 'https://icpr2026.org/authors.html')
    expect(cmtLink).toHaveAttribute('href', 'https://cmt3.research.microsoft.com/HVG2026')
    expect(cmtLink).toHaveAttribute('target', '_blank')
    expect(icprWebsiteLink).toHaveAttribute('target', '_blank')
    expect(icprWebsiteLink.className).toContain('font-bold')
    expect(icprWebsiteLink.className).toContain('text-[var(--color-text)]')
    expect(icprWebsiteLink.className).toContain('text-[1rem]')
    expect(icprWebsiteLink.className).toContain('underline')
    expect(icprWebsiteLink.className).toContain('underline-offset-4')
    expect(icprWebsiteLink).toHaveStyle({
      textDecorationLine: 'underline',
      textUnderlineOffset: '0.22em',
    })
    expect(cmtLink.className).toContain('font-bold')
    expect(cmtLink.className).toContain('text-[var(--color-text)]')
    expect(cmtLink.className).toContain('text-[1rem]')
    expect(cmtLink.className).toContain('underline')
    expect(cmtLink.className).toContain('underline-offset-4')
    expect(cmtLink).toHaveStyle({
      textDecorationLine: 'underline',
      textUnderlineOffset: '0.22em',
    })
    expect(
      screen.getByText(
        'The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.',
      ),
    ).toBeInTheDocument()
  })

  it('renders overview pillars and separates Topics into its own section', () => {
    render(<App />)

    const overviewSection = screen.getByRole('heading', { name: 'Overview' }).closest('section')
    const topicsSection = document.getElementById('topics')
    const pillarsCard = screen.getByTestId('overview-pillars-card')
    const pillarItems = screen.getAllByTestId('overview-pillar-item')
    const pillarsTitle = screen.getByRole('heading', { name: 'Core Research Pillars' })
    const firstPillarTitle = screen.getByRole('heading', { name: 'Conditional Motion Synthesis' })
    const topicsList = within(topicsSection).getByRole('list')

    expect(pillarsCard).toBeInTheDocument()
    expect(pillarItems).toHaveLength(3)
    expect(pillarsTitle).toBeInTheDocument()
    expect(pillarsTitle.className).toContain('text-2xl')
    expect(firstPillarTitle.className).toContain('text-xl')
    expect(screen.queryByText('01')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('overview-pillar-dot')).toHaveLength(3)
    expect(screen.getByRole('heading', { name: 'Topics' })).toBeInTheDocument()
    expect(within(topicsSection).getByText(/Text-Driven Synthesis/i)).toBeInTheDocument()
    expect(within(topicsSection).getAllByTestId('topic-dot')).toHaveLength(8)
    expect(topicsList.className).toContain('text-base')
    expect(within(overviewSection).queryByText(/Text-Driven Synthesis/i)).not.toBeInTheDocument()
  })

  it('renders Important Dates, Committee updates, Workshop Schedule, and Contact', () => {
    render(<App />)

    const importantDatesSection = screen.getByRole('heading', { name: 'Important Dates' }).closest('section')

    expect(screen.getByRole('heading', { name: 'Important Dates' })).toBeInTheDocument()
    expect(within(importantDatesSection).getByTestId('important-date-row-0').textContent).toBe(
      'Submission Deadline:May 01, 2026',
    )
    expect(within(importantDatesSection).getByTestId('important-date-row-1').textContent).toBe(
      'Author Notification:June 10, 2026',
    )
    expect(within(importantDatesSection).getByTestId('important-date-row-2').textContent).toBe(
      'Camera-Ready Deadline:June 20, 2026',
    )
    expect(within(importantDatesSection).getByTestId('important-date-row-3').textContent).toBe(
      'Workshop Date:August 21, 2026',
    )
    expect(within(importantDatesSection).getByTestId('important-date-row-1').className).toContain('border-t')

    expect(screen.getByRole('heading', { name: 'Committee' })).toBeInTheDocument()
    expect(screen.getByText('Hui Li')).toBeInTheDocument()
    expect(screen.getByText('Baoyou Chen')).toBeInTheDocument()
    expect(screen.getByText(/video face restortion and human-centric video generation/i)).toBeInTheDocument()
    expect(screen.getByText('khcheng24@m.fudan.edu.cn')).toBeInTheDocument()
    expect(screen.getByText('bychen25@m.fudan.edu.cn')).toBeInTheDocument()
    expect(screen.getByTestId('committee-grid').className).toContain('md:grid-cols-2')
    expect(screen.getByTestId('committee-grid').querySelectorAll('article')).toHaveLength(5)
    expect(screen.getByTestId('committee-grouped-card')).toBeInTheDocument()
    expect(screen.queryByText('Organizing Members')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Early-Career Organizing Team' })).not.toBeInTheDocument()

    const committeeSection = screen.getByRole('heading', { name: 'Committee' }).closest('section')
    const groupedCard = screen.getByTestId('committee-grouped-card')
    const huiCard = within(groupedCard).getByText('Hui Li').closest('section')
    const baoyouCard = within(groupedCard).getByText('Baoyou Chen').closest('section')
    const quanhuiCard = within(groupedCard).getByText('Quanhui Tang').closest('section')
    const earlyCareerCards = [huiCard, baoyouCard, quanhuiCard]

    expect(
      screen.getAllByRole('link', { name: /@/i }).find((emailLink) => emailLink.textContent === 'siyuzhu@fudan.edu.cn')
        ?.className,
    ).toContain('absolute')
    expect(within(groupedCard).getByRole('link', { name: 'bychen25@m.fudan.edu.cn' }).className).not.toContain(
      'absolute',
    )
    expect(
      earlyCareerCards.every((card) => within(card).getAllByText((_, element) => element?.tagName === 'P').length >= 3),
    ).toBe(true)
    expect(huiCard?.closest('article')).toBe(groupedCard)
    expect(baoyouCard?.compareDocumentPosition(within(groupedCard).getByText('Mingwang Xu').closest('section'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(committeeSection.querySelectorAll('article')).toHaveLength(6)

    expect(screen.getByRole('heading', { name: 'Workshop Schedule' })).toBeInTheDocument()
    expect(screen.getByText('Friday, 21 August 2026')).toBeInTheDocument()
    expect(screen.getByText('Full-Day Workshop | 08:30-17:30')).toBeInTheDocument()
    expect(screen.getAllByText('HVG').length).toBeGreaterThan(0)

    const contactSection = document.getElementById('contact')

    expect(within(contactSection).getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
    expect(within(contactSection).getByText('Quanhui Tang')).toBeInTheDocument()
    expect(within(contactSection).getByRole('link', { name: 'qhtang25@m.fudan.edu.cn' })).toHaveAttribute(
      'href',
      'mailto:qhtang25@m.fudan.edu.cn',
    )
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

  it('syncs hash and active tab back to OVERVIEW when clicking back-to-top from WORKSHOP SCHEDULE', async () => {
    window.history.pushState({}, '', '#workshop-schedule')
    Object.defineProperty(window, 'scrollY', {
      value: 640,
      writable: true,
      configurable: true,
    })
    render(<App />)

    const backToTopButton = screen.getByRole('button', { name: 'Scroll to top' })
    const overviewTab = screen.getByRole('link', { name: 'OVERVIEW' })
    const scheduleTab = screen.getByRole('link', { name: 'WORKSHOP SCHEDULE' })

    expect(backToTopButton.className).toContain('opacity-100')
    expect(scheduleTab.className).toContain('bg-[rgba(37,99,235,0.12)]')

    fireEvent.click(backToTopButton)

    await waitFor(() => {
      expect(window.location.hash).toBe('#overview')
      expect(overviewTab.className).toContain('bg-[rgba(37,99,235,0.12)]')
      expect(scheduleTab.className).not.toContain('bg-[rgba(37,99,235,0.12)]')
    })
  })
})

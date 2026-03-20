import { useMemo } from 'react'

import { useActiveSection } from '../hooks/use-active-section'
import { scrollToSection } from '../lib/section-navigation'

export function StickyTabs({ brandLabel, tabs }) {
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const activeSection = useActiveSection(sectionIds)

  const handleTabClick = (event, sectionId) => {
    event.preventDefault()

    const nextHash = `#${sectionId}`

    if (window.location.hash !== nextHash) {
      // 显式写入 hash，确保点击 tab 后 URL、滚动和激活态始终走同一条同步链路。
      window.history.pushState(window.history.state, '', nextHash)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
      return
    }

    scrollToSection(sectionId)
  }

  return (
    <nav className="relative sticky top-0 z-40 border-b border-[var(--color-line)] bg-[rgba(250,250,250,0.96)] backdrop-blur-xl">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] sm:left-6 lg:left-8">
        {brandLabel}
      </span>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-3 lg:justify-center">
            {tabs.map((tab) => {
              const isActive = activeSection === tab.id

              return (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(event) => handleTabClick(event, tab.id)}
                  className={`inline-flex whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-semibold tracking-[0.22em] transition ${
                    isActive
                      ? 'border-[rgba(37,99,235,0.22)] bg-[rgba(37,99,235,0.12)] text-[var(--color-text)] shadow-[inset_0_0_0_1px_rgba(37,99,235,0.08)]'
                      : 'border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[rgba(37,99,235,0.24)] hover:bg-[rgba(37,99,235,0.04)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {tab.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

import { useMemo } from 'react'

import { useActiveSection } from '../hooks/use-active-section'

export function StickyTabs({ tabs }) {
  const sectionIds = useMemo(() => tabs.map((tab) => tab.id), [tabs])
  const activeSection = useActiveSection(sectionIds)
  const groupStartIds = new Set(['important-dates', 'committee'])

  const handleTabClick = (event, sectionId) => {
    event.preventDefault()

    const nextHash = `#${sectionId}`

    if (window.location.hash !== nextHash) {
      // 显式写入 hash，确保点击 tab 后 URL、滚动和激活态保持同一条同步链路。
      window.history.pushState(window.history.state, '', nextHash)
    }

    // 即使 hash 没变，也重新触发一次同步，避免高亮状态和 URL 偶发漂移。
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[rgba(250,250,250,0.96)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:justify-center lg:px-8">
        {tabs.map((tab) => {
          const isActive = activeSection === tab.id

          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={(event) => handleTabClick(event, tab.id)}
              className={`inline-flex whitespace-nowrap rounded-full border px-5 py-2 text-xs font-semibold transition ${
                groupStartIds.has(tab.id)
                  ? 'relative ml-3 before:absolute before:-left-3 before:top-1/2 before:h-5 before:w-px before:-translate-y-1/2 before:bg-[rgba(148,163,184,0.42)]'
                  : ''
              } ${
                isActive
                  ? 'border-[rgba(37,99,235,0.22)] bg-[rgba(37,99,235,0.12)] text-[var(--color-text)] shadow-[inset_0_0_0_1px_rgba(37,99,235,0.08)]'
                  : 'border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[rgba(37,99,235,0.24)] hover:bg-[rgba(37,99,235,0.04)] hover:text-[var(--color-text)]'
              }`}
            >
              {tab.label.toUpperCase()}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

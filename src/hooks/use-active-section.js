import { useEffect, useRef, useState } from 'react'

import {
  getSectionHash,
  isNearPageBottom,
  scrollToSection,
  SECTION_SCROLL_OFFSET,
} from '../lib/section-navigation'

export function useActiveSection(sectionIds) {
  const pendingHashTargetRef = useRef('')
  const pendingTargetScrollTopRef = useRef(0)
  const pendingScrollDirectionRef = useRef('down')
  const visibleSectionIdsRef = useRef(new Set())
  const [activeSection, setActiveSection] = useState(() => {
    const hashValue = getSectionHash(sectionIds)
    return hashValue || (sectionIds[0] ?? '')
  })

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    if (!sections.length) {
      return undefined
    }

    const syncHash = (nextSectionId) => {
      const nextHash = `#${nextSectionId}`

      if (window.location.hash === nextHash) {
        return
      }

      window.history.replaceState(window.history.state, '', nextHash)
    }

    const resolveNextSection = () => {
      if (isNearPageBottom()) {
        return sections.at(-1)?.id ?? ''
      }

      const visibleSections = sections.filter((section) => visibleSectionIdsRef.current.has(section.id))

      if (visibleSections.length) {
        return visibleSections.at(-1)?.id ?? ''
      }

      const activationLine = window.scrollY + SECTION_SCROLL_OFFSET + 48
      let nextActiveSection = sections[0]?.id ?? ''

      for (const section of sections) {
        if (activationLine >= section.offsetTop) {
          nextActiveSection = section.id
        }
      }

      return nextActiveSection
    }

    const commitActiveSection = (nextSectionId, options = {}) => {
      const { syncUrl = true } = options

      if (!nextSectionId) {
        return
      }

      setActiveSection(nextSectionId)

      if (syncUrl) {
        syncHash(nextSectionId)
      }
    }

    const setPendingTarget = (nextSectionId) => {
      const targetSection = document.getElementById(nextSectionId)
      const targetScrollTop = Math.max((targetSection?.offsetTop ?? 0) - SECTION_SCROLL_OFFSET, 0)

      pendingHashTargetRef.current = nextSectionId
      pendingTargetScrollTopRef.current = targetScrollTop
      pendingScrollDirectionRef.current = targetScrollTop >= window.scrollY ? 'down' : 'up'
    }

    const clearPendingTarget = () => {
      pendingHashTargetRef.current = ''
      pendingTargetScrollTopRef.current = 0
    }

    const resolveByScrollPosition = () => {
      // 点击 tab 后先锁定目标，等页面真正滚动到位再切回实时滚动判定。
      if (pendingHashTargetRef.current) {
        const targetSection = document.getElementById(pendingHashTargetRef.current)

        if (targetSection) {
          const targetScrollTop = pendingTargetScrollTopRef.current
          const scrollDirection = pendingScrollDirectionRef.current
          const hasReachedTarget =
            Math.abs(window.scrollY - targetScrollTop) <= 16 ||
            (scrollDirection === 'down' && window.scrollY >= targetScrollTop - 16) ||
            (scrollDirection === 'up' && window.scrollY <= targetScrollTop + 16) ||
            (targetSection.id === sections.at(-1)?.id && isNearPageBottom())

          if (!hasReachedTarget) {
            commitActiveSection(pendingHashTargetRef.current, { syncUrl: false })
            return
          }
        }

        clearPendingTarget()
      }

      commitActiveSection(resolveNextSection())
    }

    const handleHashChange = () => {
      const hashValue = getSectionHash(sectionIds)

      if (hashValue) {
        setPendingTarget(hashValue)
        commitActiveSection(hashValue, { syncUrl: false })
        window.requestAnimationFrame(() => {
          scrollToSection(hashValue)
        })
        return
      }

      clearPendingTarget()
      resolveByScrollPosition()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSectionIdsRef.current.add(entry.target.id)
          } else {
            visibleSectionIdsRef.current.delete(entry.target.id)
          }
        })

        resolveByScrollPosition()
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const initialHashValue = getSectionHash(sectionIds)

    if (initialHashValue) {
      setPendingTarget(initialHashValue)
      commitActiveSection(initialHashValue, { syncUrl: false })
      window.requestAnimationFrame(() => {
        scrollToSection(initialHashValue, 'auto')
      })
    } else {
      resolveByScrollPosition()
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('scroll', resolveByScrollPosition, { passive: true })
    window.addEventListener('resize', resolveByScrollPosition)

    return () => {
      observer.disconnect()
      visibleSectionIdsRef.current = new Set()
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('scroll', resolveByScrollPosition)
      window.removeEventListener('resize', resolveByScrollPosition)
    }
  }, [sectionIds])

  return activeSection
}

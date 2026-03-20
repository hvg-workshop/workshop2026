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
  const lastScrollYRef = useRef(0)
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

    lastScrollYRef.current = window.scrollY

    const getSectionIndex = (sectionId) => sections.findIndex((section) => section.id === sectionId)

    const syncHash = (nextSectionId) => {
      const nextHash = `#${nextSectionId}`

      if (window.location.hash === nextHash) {
        return
      }

      window.history.replaceState(window.history.state, '', nextHash)
    }

    const resolveNextSection = () => {
      if (window.scrollY <= 24) {
        return sections[0]?.id ?? ''
      }

      const activationLine = window.scrollY + SECTION_SCROLL_OFFSET + 48
      let offsetSectionId = sections[0]?.id ?? ''

      for (const section of sections) {
        if (activationLine >= section.offsetTop) {
          offsetSectionId = section.id
        }
      }

      const lastSection = sections.at(-1)

      // 最后一个区块较短时，滚动到底部附近也要允许它成为激活态。
      if (isNearPageBottom() && lastSection) {
        const hasReachedLastSection =
          visibleSectionIdsRef.current.has(lastSection.id) || activationLine >= lastSection.offsetTop

        if (hasReachedLastSection) {
          return lastSection.id
        }
      }

      const visibleSections = sections.filter((section) => visibleSectionIdsRef.current.has(section.id))
      const deepestVisibleSection = visibleSections.at(-1)

      if (!deepestVisibleSection) {
        return offsetSectionId
      }

      // 只有当可见区里的 section 确实比“已越过顶部”的 section 更靠后时，才允许它覆盖激活态。
      return getSectionIndex(deepestVisibleSection.id) >= getSectionIndex(offsetSectionId)
        ? deepestVisibleSection.id
        : offsetSectionId
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
      lastScrollYRef.current = window.scrollY
    }

    const clearPendingTarget = () => {
      pendingHashTargetRef.current = ''
      pendingTargetScrollTopRef.current = 0
    }

    const resolveByScrollPosition = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current

      // 点击 tab 后先锁定目标，等页面真正滚动到位后再恢复实时滚动判定。
      if (pendingHashTargetRef.current) {
        const targetSection = document.getElementById(pendingHashTargetRef.current)

        if (targetSection) {
          const targetScrollTop = pendingTargetScrollTopRef.current
          const scrollDirection = pendingScrollDirectionRef.current
          const activationLine = currentScrollY + SECTION_SCROLL_OFFSET + 48
          const isLastTarget = targetSection.id === sections.at(-1)?.id
          const scrollDelta = Math.abs(currentScrollY - previousScrollY)
          const isSignificantReverse = scrollDelta > 24
          const isReversingAwayFromTarget =
            isSignificantReverse &&
            ((scrollDirection === 'down' && currentScrollY < previousScrollY) ||
              (scrollDirection === 'up' && currentScrollY > previousScrollY))
          const hasReachedTarget =
            Math.abs(currentScrollY - targetScrollTop) <= 32 ||
            (scrollDirection === 'down' && currentScrollY >= targetScrollTop - 32) ||
            (scrollDirection === 'up' && currentScrollY <= targetScrollTop + 32) ||
            (isLastTarget &&
              isNearPageBottom() &&
              (visibleSectionIdsRef.current.has(targetSection.id) || activationLine >= targetSection.offsetTop))

          if (!hasReachedTarget && !isReversingAwayFromTarget) {
            lastScrollYRef.current = currentScrollY
            commitActiveSection(pendingHashTargetRef.current, { syncUrl: false })
            return
          }

          clearPendingTarget()
        } else {
          clearPendingTarget()
        }
      }

      lastScrollYRef.current = currentScrollY
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

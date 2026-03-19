export const SECTION_SCROLL_OFFSET = 112
const SCROLL_PADDING = 8

export function getSectionHash(sectionIds) {
  const hashValue = window.location.hash.replace('#', '')
  return sectionIds.includes(hashValue) ? hashValue : ''
}

export function isNearPageBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - SCROLL_PADDING
}

export function scrollToSection(sectionId, behavior = 'smooth') {
  const section = document.getElementById(sectionId)

  if (!section) {
    return
  }

  const targetTop = Math.max(section.offsetTop - SECTION_SCROLL_OFFSET, 0)
  window.scrollTo({ top: targetTop, behavior })
}

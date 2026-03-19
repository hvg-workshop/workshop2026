import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock
window.IntersectionObserver = IntersectionObserverMock
window.scrollTo = vi.fn()

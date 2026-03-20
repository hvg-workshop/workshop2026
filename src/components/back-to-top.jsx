import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  const handleBackToTop = () => {
    const nextHash = '#overview'

    if (window.location.hash !== nextHash) {
      // 回顶按钮也走和 tab 点击一致的 hash 同步链路，避免 URL 和激活态滞后。
      window.history.pushState(window.history.state, '', nextHash)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 480)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleBackToTop}
      className={`fixed bottom-8 right-8 z-40 rounded-full border border-[var(--color-line)] bg-white p-3 text-[var(--color-text)] shadow-[0_14px_35px_rgba(15,23,42,0.14)] transition ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 15V5M10 5L5.75 9.25M10 5L14.25 9.25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

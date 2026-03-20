export function Hero({ hero, id }) {
  return (
    <header id={id} className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(217,119,6,0.08),_transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div
          data-testid="hero-content"
          className="mx-auto flex max-w-5xl flex-col items-center space-y-7 text-center"
        >
          <div className="inline-flex rounded-full border border-[var(--color-line)] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            {hero.eventLabel}
          </div>
          <div className="space-y-5">
            <h1 className="mx-auto max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--color-text)] sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

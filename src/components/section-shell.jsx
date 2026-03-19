export function SectionShell({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-[var(--color-line)] py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <div className="w-full text-center">
          <h2 className="font-serif text-4xl tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
            {title}
          </h2>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  )
}

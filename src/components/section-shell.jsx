function joinClasses(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export function SectionShell({
  id,
  title,
  children,
  align = 'left',
  sectionClassName = '',
  containerClassName = '',
  titleClassName = '',
  contentClassName = '',
}) {
  return (
    <section
      id={id}
      className={joinClasses(
        'scroll-mt-28 border-b border-[var(--color-line)] py-16 sm:py-20',
        sectionClassName,
      )}
    >
      <div
        className={joinClasses(
          'mx-auto flex flex-col gap-8',
          align === 'center' ? 'max-w-5xl items-center' : 'max-w-6xl',
          containerClassName,
        )}
      >
        <div className={joinClasses('w-full', align === 'center' ? 'text-center' : 'text-left')}>
          <h2
            className={joinClasses(
              'font-serif text-4xl tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl',
              titleClassName,
            )}
          >
            {title}
          </h2>
        </div>
        <div className={joinClasses('w-full', contentClassName)}>{children}</div>
      </div>
    </section>
  )
}

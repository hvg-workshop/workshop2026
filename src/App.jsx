import { BackToTop } from './components/back-to-top'
import { CommitteeSection } from './components/committee-section'
import { Footer } from './components/footer'
import { Hero } from './components/hero'
import { AuthorsSection } from './components/instructions-section'
import { OverviewSection } from './components/overview-section'
import { ProgramSection } from './components/program-section'
import { StickyTabs } from './components/sticky-tabs'
import { workshopContent } from './content/workshop-content'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-text)]">
      <Hero id="overview" hero={workshopContent.hero} />
      <StickyTabs tabs={workshopContent.tabs} />
      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <OverviewSection overview={workshopContent.overview} />
        <AuthorsSection instructions={workshopContent.authorInstructions} />
        <CommitteeSection committee={workshopContent.committee} />
        <ProgramSection program={workshopContent.program} />
      </main>
      <Footer footer={workshopContent.footer} />
      <BackToTop />
    </div>
  )
}

export default App

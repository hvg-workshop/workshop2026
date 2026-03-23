import { BackToTop } from './components/back-to-top'
import { CommitteeSection } from './components/committee-section'
import { ContactSection } from './components/contact-section'
import { Footer } from './components/footer'
import { Hero } from './components/hero'
import { ImportantDatesSection } from './components/important-dates-section'
import { AuthorsSection } from './components/instructions-section'
import { OverviewSection } from './components/overview-section'
import { ProgramSection } from './components/program-section'
import { SpeakersSection } from './components/speakers-section'
import { StickyTabs } from './components/sticky-tabs'
import { TopicsSection } from './components/topics-section'
import { workshopContent } from './content/workshop-content'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-text)]">
      <StickyTabs tabs={workshopContent.tabs} />
      <Hero id="overview" hero={workshopContent.hero} />
      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <OverviewSection overview={workshopContent.overview} />
        <TopicsSection topics={workshopContent.topics} />
        <SpeakersSection speakers={workshopContent.speakers} />
        <ImportantDatesSection importantDates={workshopContent.importantDates} />
        <AuthorsSection instructions={workshopContent.authorInstructions} />
        <CommitteeSection committee={workshopContent.committee} />
        <ProgramSection program={workshopContent.program} />
        <ContactSection contact={workshopContent.contact} />
      </main>
      <Footer footer={workshopContent.footer} />
      <BackToTop />
    </div>
  )
}

export default App

import { FileText } from 'lucide-react'
import Experience from './Experience'
import Projects from './Projects'
import Coursework from './Coursework'

type ArchiveKind = 'experience' | 'projects' | 'coursework'

interface ArchivePageProps { kind: ArchiveKind }

const ArchivePage = ({ kind }: ArchivePageProps) => {
  const title = kind === 'experience' ? 'More Experience' : kind === 'projects' ? 'More Projects' : 'Coursework Archive'

  return (
    <div className="min-h-screen bg-primary">
      <header className="sticky top-0 z-50 border-b border-cream/10 bg-primary/90 px-6 py-5 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="./" className="text-xl font-bold text-cream hover:text-accent transition-colors">Connor van Herick</a>
          <nav className="flex items-center gap-3 text-sm font-semibold">
            <a href="./" className="rounded-xl px-4 py-2 text-cream/70 hover:bg-cream/5 hover:text-cream transition-colors">Home</a>
            <a href="./Connor_van_Herick_Resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-2 text-cream/70 hover:bg-cream/5 hover:text-cream transition-colors"><FileText size={16} className="mr-1 inline" />Resume</a>
          </nav>
        </div>
      </header>
      <main id="main-content">
        <div className="mx-auto max-w-7xl px-6 pt-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Portfolio archive</p>
          <h1 className="mt-4 text-5xl font-bold text-cream md:text-6xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/60">Depth for recruiters and collaborators who want the complete record.</p>
        </div>
        {kind === 'experience' && <Experience archive />}
        {kind === 'projects' && <Projects archive />}
        {kind === 'coursework' && <Coursework archive />}
      </main>
    </div>
  )
}

export default ArchivePage

import { useEffect, useState } from 'react'
import { FileText, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, animateScroll as scroll } from 'react-scroll'

interface NavbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  mode: 'explore' | 'recruiter'
  onToggleMode: () => void
}

const Navbar = ({ theme, onToggleTheme, mode, onToggleMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const sections = mode === 'explore' ? ['experience', 'projects', 'building', 'about', 'contact'] : ['experience', 'projects', 'contact']
  const labels: Record<string, string> = { experience: 'Work', building: 'Currently' }

  useEffect(() => {
    const updateActiveSection = () => {
      let current = ''
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top <= 100) current = section
      })
      setActiveSection(current)
    }
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    document.addEventListener('keydown', closeOnEscape)
    updateActiveSection()
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [mode])

  const navLink = (section: string, mobile = false) => (
    <Link key={section} to={section} smooth duration={500} onClick={() => setIsOpen(false)} aria-current={activeSection === section ? 'location' : undefined} className={`cursor-pointer font-medium transition-colors hover:text-cream ${mobile ? 'block border-b border-cream/10 py-4 text-lg' : 'text-sm'} ${activeSection === section ? 'text-cream' : 'text-cream/55'}`}>
      {labels[section] ?? section.charAt(0).toUpperCase() + section.slice(1)}
    </Link>
  )

  return (
    <nav aria-label="Primary navigation" className="fixed top-0 z-50 w-full border-b border-cream/10 bg-primary/95">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6">
        <Link to="hero" className="site-name cursor-pointer text-xl font-semibold tracking-[-0.045em] text-cream transition-opacity hover:opacity-70" onClick={() => scroll.scrollToTop()} smooth duration={500}>Connor</Link>

        <div className="hidden items-center gap-7 lg:flex">
          {sections.map(section => navLink(section))}
          <a href="./Connor_van_Herick_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-l border-cream/10 pl-6 text-sm font-medium text-cream/70 transition-colors hover:text-cream"><FileText size={15} /> Resume</a>
          <button type="button" onClick={onToggleMode} className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/50 transition-colors hover:text-cream" aria-label={`Switch to ${mode === 'explore' ? 'recruiter' : 'explore'} view`}>{mode}</button>
          <button type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} className="text-cream/55 transition-colors hover:text-cream">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
        </div>

        <button type="button" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(current => !current)} className="p-2 text-cream/75 transition-colors hover:text-cream lg:hidden">{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>

      {isOpen && <div id="mobile-navigation" className="border-t border-cream/10 bg-primary px-6 pb-6 lg:hidden">
        <div className="pt-2">{sections.map(section => navLink(section, true))}</div>
        <div className="flex items-center justify-between pt-5 text-sm">
          <a href="./Connor_van_Herick_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-cream/70"><FileText size={15} /> Resume</a>
          <div className="flex items-center gap-4">
            <button type="button" onClick={onToggleMode} className="font-semibold uppercase tracking-[0.1em] text-cream/60">{mode}</button>
            <button type="button" onClick={onToggleTheme} className="text-cream/60" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
          </div>
        </div>
      </div>}
    </nav>
  )
}

export default Navbar

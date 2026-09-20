import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Menu, X, Linkedin, Sun, Moon } from 'lucide-react'
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
  const sectionLabels: Record<string, string> = { experience: 'Work', building: 'Currently' }

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            current = section
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mode])

  return (
    <nav aria-label="Primary navigation" className="fixed top-0 w-full z-50 bg-primary/85 backdrop-blur-2xl border-b border-cream/10 shadow-2xl shadow-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-5">
          <Link 
            to="hero" 
            className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent hover:scale-[1.02] transition-all duration-300"
            onClick={() => scroll.scrollToTop()}
            smooth={true}
            duration={500}
          >
            CV
          </Link>

          {/* Desktop menu */}
          <div className="hidden xl:flex items-center space-x-2">
            {sections.map((section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={800}
                aria-current={activeSection === section ? 'location' : undefined}
                className={`px-4 py-2 font-semibold rounded-xl transition-all duration-300 ${
                  activeSection === section 
                    ? 'bg-accent/10 text-accent border border-accent/30 shadow-lg' 
                    : 'text-cream/70 hover:text-cream hover:bg-cream/5 hover:shadow-lg'
                }`}
              >
                {sectionLabels[section] ?? section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
            <a
              href="./Connor_van_Herick_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-semibold rounded-xl text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors"
            >
              <FileText size={18} className="inline mr-2" />
              Resume
            </a>
            <button type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <div role="group" aria-label="Portfolio view" className="ml-2 inline-flex rounded-xl border border-cream/10 bg-cream/5 p-1">
              {(['explore', 'recruiter'] as const).map(option => <button key={option} type="button" aria-pressed={mode === option} onClick={() => mode !== option && onToggleMode()} className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-colors ${mode === option ? 'bg-accent text-primary' : 'text-cream/60 hover:text-cream'}`}>{option}</button>)}
            </div>
            <a 
              href="https://www.linkedin.com/in/connor-vanherick/" 
              target="_blank" 
              rel="noopener"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent text-primary font-semibold rounded-xl shadow-lg hover:shadow-accent/30 transition-colors duration-300"
            >
              <Linkedin size={20} className="inline mr-2" />
              LinkedIn
            </a>
          </div>

          {/* Compact controls stay visible on smaller screens so the two views are discoverable. */}
          <div className="flex items-center gap-2 xl:hidden">
            <div role="group" aria-label="Portfolio view" className="inline-flex rounded-xl border border-cream/10 bg-cream/5 p-1">
              {(['explore', 'recruiter'] as const).map(option => <button key={option} type="button" aria-pressed={mode === option} onClick={() => mode !== option && onToggleMode()} className={`rounded-lg px-2 py-1 text-[11px] font-bold capitalize transition-colors ${mode === option ? 'bg-accent text-primary' : 'text-cream/60 hover:text-cream'}`}>{option}</button>)}
            </div>
            <button
              type="button"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 hover:bg-cream/5 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            id="mobile-navigation"
            className="xl:hidden pb-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3 pt-4 border-t border-cream/10">
              {sections.map((section) => (
                <Link
                  key={section}
                  to={section}
                  smooth={true}
                  duration={800}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-4 font-semibold rounded-xl transition-colors hover:bg-cream/5 ${
                    activeSection === section ? 'bg-accent/20 text-accent border border-accent/30' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                    {sectionLabels[section] ?? section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              ))}
              <a
                href="./Connor_van_Herick_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 font-semibold rounded-xl text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </a>
              <button type="button" onClick={onToggleTheme} className="flex items-center gap-2 rounded-xl px-4 py-3 text-left font-semibold text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              <div role="group" aria-label="Portfolio view" className="flex rounded-xl border border-cream/10 bg-cream/5 p-1">
                {(['explore', 'recruiter'] as const).map(option => <button key={option} type="button" aria-pressed={mode === option} onClick={() => mode !== option && onToggleMode()} className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold capitalize transition-colors ${mode === option ? 'bg-accent text-primary' : 'text-cream/60 hover:text-cream'}`}>{option}</button>)}
              </div>
              <a 
                href="https://www.linkedin.com/in/connor-vanherick/" 
                target="_blank" 
                rel="noopener"
                className="py-3 px-4 bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent text-primary font-semibold rounded-xl shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Linkedin } from 'lucide-react'
import { Link, animateScroll as scroll } from 'react-scroll'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const sections = ['about', 'experience', 'projects', 'contact']

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-primary/85 backdrop-blur-2xl border-b border-cream/10 shadow-2xl shadow-black/20">
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
          <div className="hidden lg:flex items-center space-x-2">
            {sections.map((section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={800}
                className={`px-4 py-2 font-semibold rounded-xl transition-all duration-300 ${
                  activeSection === section 
                    ? 'bg-accent/10 text-accent border border-accent/30 shadow-lg' 
                    : 'text-cream/70 hover:text-cream hover:bg-cream/5 hover:shadow-lg'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
            <a 
              href="https://www.linkedin.com/in/connor-vanherick/" 
              target="_blank" 
              rel="noopener"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent text-primary font-semibold rounded-xl shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300"
            >
              <Linkedin size={20} className="inline mr-2" />
              LinkedIn
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-cream/5 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden pb-6 overflow-hidden"
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
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              ))}
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

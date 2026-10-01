import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-scroll'

interface FooterProps { mode?: 'explore' | 'recruiter' }

const Footer = ({ mode = 'explore' }: FooterProps) => {
  const links = mode === 'explore' ? ['experience', 'projects', 'building', 'about', 'coursework', 'contact'] : ['experience', 'projects', 'contact']
  const labels: Record<string, string> = { experience: 'Work', building: 'Currently' }

  return (
    <footer className="border-t border-cream/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link to="hero" smooth duration={500} className="site-name cursor-pointer text-lg font-semibold tracking-[-0.04em] text-cream">Connor van Herick</Link>
          <p className="mt-2 text-sm text-cream/45">Computer Science + Data Science · UC Berkeley</p>
          <p className="mt-5 text-xs text-cream/35">© 2026 Connor van Herick</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          {links.map(link => <Link key={link} to={link} smooth duration={500} className="cursor-pointer text-cream/55 transition-colors hover:text-accent">{labels[link] ?? link.charAt(0).toUpperCase() + link.slice(1)}</Link>)}
          {mode === 'explore' && <a href="./outside-work/" className="text-cream/55 transition-colors hover:text-accent">Outside work</a>}
          <span className="hidden h-4 w-px bg-cream/15 sm:block" />
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/connor-vanherick/" target="_blank" rel="noopener noreferrer" className="text-cream/55 transition-colors hover:text-accent"><Linkedin size={17} /></a>
          <a aria-label="GitHub" href="https://github.com/cvanherick" target="_blank" rel="noopener noreferrer" className="text-cream/55 transition-colors hover:text-accent"><Github size={17} /></a>
          <a aria-label="Email Connor" href="mailto:cvanherick@berkeley.edu" className="text-cream/55 transition-colors hover:text-accent"><Mail size={17} /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

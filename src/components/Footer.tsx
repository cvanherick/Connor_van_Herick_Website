import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
    <footer className="bg-slate-980 border-t border-slate-800/50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Link to="hero" smooth={true} duration={800} className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent hover:scale-105 transition-transform mb-4 inline-block">
              Connor van Herick
            </Link>
            <p className="text-slate-500 text-sm max-w-md mx-auto lg:mx-0">
              Computer Science @ UC Berkeley
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-bold text-slate-200 mb-6">Links</h4>
            <div className="space-y-3">
              <Link to="projects" smooth={true} duration={800} className="block text-slate-400 hover:text-accent transition-colors font-medium">
                Projects
              </Link>
              <Link to="experience" smooth={true} duration={800} className="block text-slate-400 hover:text-accent transition-colors font-medium">
                Experience
              </Link>
              <Link to="contact" smooth={true} duration={800} className="block text-slate-400 hover:text-accent transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>

          <div className="text-center lg:col-span-2">
            <h4 className="text-lg font-bold text-slate-200 mb-8">Connect</h4>
            <div className="flex justify-center lg:justify-start gap-6 mb-8">
              <a href="https://www.linkedin.com/in/connor-vanherick/" target="_blank" rel="noopener" className="w-16 h-16 bg-slate-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300 group border border-slate-800/50 hover:border-accent/50">
                <Linkedin size={24} className="group-hover:rotate-12" />
              </a>
              <a href="https://github.com/connorvanherick" target="_blank" rel="noopener" className="w-16 h-16 bg-slate-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300 group border border-slate-800/50 hover:border-accent/50">
                <Github size={24} className="group-hover:rotate-12" />
              </a>
              <a href="mailto:connor@connorvanherick.com" className="w-16 h-16 bg-slate-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300 group border border-slate-800/50 hover:border-accent/50">
                <Mail size={24} className="group-hover:rotate-12" />
              </a>
            </div>
            <p className="text-slate-600 text-sm text-center lg:text-left">
              © 2026 Connor van Herick. Berkeley EECS. Built with React + Tailwind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


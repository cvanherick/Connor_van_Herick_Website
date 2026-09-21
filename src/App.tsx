import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ConnectPrompt from './components/ConnectPrompt'
import About from './components/About'
import Coursework from './components/Coursework'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Skills from './components/Skills'
import WhatImBuilding from './components/WhatImBuilding'
import ArchivePage from './components/ArchivePage'
import OutsideWorkPage from './components/OutsideWorkPage'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark')
  const [mode, setMode] = useState<'explore' | 'recruiter'>(() => {
    const queryMode = new URLSearchParams(window.location.search).get('mode')
    return queryMode === 'recruiter' ? 'recruiter' : (localStorage.getItem('portfolio-view-mode') as 'explore' | 'recruiter') || 'explore'
  })
  const pathname = window.location.pathname

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.mode = mode
    localStorage.setItem('portfolio-view-mode', mode)
  }, [mode])

  if (pathname.includes('/experience')) return <ArchivePage kind="experience" />
  if (pathname.includes('/projects')) return <ArchivePage kind="projects" />
  if (pathname.includes('/coursework')) return <ArchivePage kind="coursework" />
  if (pathname.includes('/outside-work')) return <OutsideWorkPage />

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div role="status" className="relative z-[60] flex min-h-10 items-center justify-center bg-secondary px-4 py-2 text-center text-xs font-bold text-primary md:text-sm">
        This website is a work in progress and under development — excuse any mess.
      </div>
      <div className="skills-marquee" aria-label="Skills and focus areas: 73M plus financial records, uplift modeling, ROS 2 robotics, XGBoost and LightGBM, computer vision, Databricks pipelines, and multi-agent systems">
        <div className="skills-marquee__viewport">
          <div className="skills-marquee__track" aria-hidden="true">
            {[0, 1].map(copy => <div className="skills-marquee__group" key={copy}>
              {['73M+ financial records', 'uplift modeling', 'ROS 2 robotics', 'XGBoost + LightGBM', 'computer vision', 'Databricks pipelines', 'multi-agent systems'].map(skill => <span className="skills-marquee__item" key={`${copy}-${skill}`}>{skill}<span className="skills-marquee__separator">·</span></span>)}
            </div>)}
          </div>
        </div>
      </div>
      <div className="pointer-events-none fixed inset-0 opacity-70 bg-[linear-gradient(120deg,rgba(20,184,166,0.08),transparent_35%,rgba(245,158,11,0.07)_68%,transparent)]" />
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} mode={mode} onToggleMode={() => setMode(current => current === 'explore' ? 'recruiter' : 'explore')} />
        <main id="main-content"><Hero /><ConnectPrompt />
        <Experience />
        <Projects />
        {mode === 'explore' && <><WhatImBuilding /><About /></>}
        <Skills />
        <Coursework />
        <Contact /></main>
        <Footer />
      </div>
    </div>
  )
}

export default App

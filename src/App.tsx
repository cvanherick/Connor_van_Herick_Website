import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Coursework from './components/Coursework'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatImBuilding from './components/WhatImBuilding'
import ArchivePage from './components/ArchivePage'
import OutsideWorkPage from './components/OutsideWorkPage'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark')
  const [mode, setMode] = useState<'explore' | 'recruiter'>(() => {
    const queryMode = new URLSearchParams(window.location.search).get('mode')
    if (queryMode === 'explore' || queryMode === 'recruiter') return queryMode
    return localStorage.getItem('portfolio-view-mode') === 'recruiter' ? 'recruiter' : 'explore'
  })
  const pathname = window.location.pathname

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.mode = mode
    localStorage.setItem('portfolio-view-mode', mode)
    const params = new URLSearchParams(window.location.search)
    if (mode === 'recruiter') params.set('mode', 'recruiter')
    else params.delete('mode')
    const query = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
  }, [mode])

  if (pathname.includes('/experience')) return <ArchivePage kind="experience" />
  if (pathname.includes('/projects')) return <ArchivePage kind="projects" />
  if (pathname.includes('/coursework')) return <ArchivePage kind="coursework" />
  if (pathname.includes('/outside-work')) return <OutsideWorkPage />

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} mode={mode} onSetMode={(nextMode) => { if (nextMode === mode) return; setMode(nextMode); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }} />
        <main id="main-content"><Hero />
        <Experience mode={mode} />
        <Projects />
        {mode === 'explore' && <><WhatImBuilding /><About /></>}
        {mode === 'explore' && <Coursework />}
        <Contact /></main>
        <Footer mode={mode} />
      </div>
    </div>
  )
}

export default App

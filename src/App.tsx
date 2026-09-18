import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Coursework from './components/Coursework'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Skills from './components/Skills'
import WhatImBuilding from './components/WhatImBuilding'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="pointer-events-none fixed inset-0 opacity-70 bg-[linear-gradient(120deg,rgba(20,184,166,0.08),transparent_35%,rgba(245,158,11,0.07)_68%,transparent)]" />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content"><Hero />
        <WhatImBuilding />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Coursework />
        <Contact /></main>
        <Footer />
      </div>
    </div>
  )
}

export default App

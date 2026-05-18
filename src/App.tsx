import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import WhatImBuilding from './components/WhatImBuilding'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <WhatImBuilding />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

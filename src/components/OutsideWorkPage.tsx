import { ArrowLeft, Mountain, Users } from 'lucide-react'

const OutsideWorkPage = () => (
  <div className="min-h-screen bg-primary">
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-primary/90 px-6 py-5 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="./" className="text-xl font-bold text-cream transition-colors hover:text-accent">Connor van Herick</a>
        <a href="./" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream"><ArrowLeft size={16} /> Back home</a>
      </div>
    </header>
    <main id="main-content" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="section-kicker">Beyond the keyboard</p>
      <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-cream md:text-7xl">Outside of work</h1>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-cream/65">Climbing, skiing, and community keep me curious, grounded, and comfortable working through hard problems.</p>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <figure className="group overflow-hidden rounded-3xl border border-cream/10 bg-surface/70 md:col-span-2">
          <img src="./assets/climbing-optimized.jpg" alt="Connor climbing outdoors" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <figcaption className="flex items-start gap-3 px-6 py-5 text-cream/70"><Mountain className="mt-0.5 shrink-0 text-accent" size={20} /><span>Climbing outdoors and learning to stay patient through complex routes.</span></figcaption>
        </figure>
        <figure className="group overflow-hidden rounded-3xl border border-cream/10 bg-surface/70">
          <img src="./assets/skiing-optimized.jpg" alt="Connor skiing in the Sierra" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <figcaption className="px-5 py-4 text-sm font-medium text-cream/65">Skiing in the Sierra.</figcaption>
        </figure>
        <div className="card flex flex-col justify-center p-8">
          <Users className="text-accent" size={28} />
          <h2 className="mt-5 text-2xl font-semibold text-cream">Community and leadership</h2>
          <p className="mt-3 leading-relaxed text-cream/65">As Treasurer and Membership Officer for Cal Climbing, I help support club operations, member coordination, and a welcoming student community.</p>
          <a href="./#experience" className="mt-6 inline-flex w-fit rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 font-semibold text-accent transition-colors hover:bg-accent/20">See related experience <span className="ml-2" aria-hidden="true">→</span></a>
        </div>
      </div>
    </main>
  </div>
)

export default OutsideWorkPage

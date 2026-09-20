import { ArrowUpRight, CalendarDays } from 'lucide-react'

const ConnectPrompt = () => {
  return (
    <section aria-labelledby="connect-prompt-title" className="px-6 pb-10 md:pb-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-3xl border border-secondary/30 bg-secondary/10 px-6 py-6 md:flex-row md:items-center md:px-8">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 rounded-2xl bg-secondary/20 p-3 text-secondary" aria-hidden="true">
            <CalendarDays size={22} />
          </div>
          <div>
            <h2 id="connect-prompt-title" className="text-xl font-semibold text-cream">Schedule a time to connect</h2>
          </div>
        </div>
        <a href="https://calendar.app.google/pwfKRt1mxRrWAtH97" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex w-full items-center gap-2 md:w-auto">
          Schedule a time to connect <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  )
}

export default ConnectPrompt

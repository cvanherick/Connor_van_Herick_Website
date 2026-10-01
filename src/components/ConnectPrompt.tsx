import { ArrowUpRight, CalendarDays } from 'lucide-react'

const ConnectPrompt = () => {
  return (
    <div aria-labelledby="connect-prompt-title" className="mt-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 border-y border-cream/10 py-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 text-accent" aria-hidden="true">
            <CalendarDays size={20} />
          </div>
          <div>
            <h2 id="connect-prompt-title" className="text-lg font-semibold text-cream">Schedule a time to connect</h2>
          </div>
        </div>
        <a href="https://calendar.app.google/pwfKRt1mxRrWAtH97" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex w-full items-center gap-2 md:w-auto">
          Schedule a time to connect <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  )
}

export default ConnectPrompt

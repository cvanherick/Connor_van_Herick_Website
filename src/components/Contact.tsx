import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import ConnectPrompt from './ConnectPrompt'

const Contact = () => {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-24 md:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="section-heading mb-6">
            <span id="contact-title">Let’s Talk</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cream/65">
            I’m exploring 2027 opportunities in ML engineering, AI engineering, software engineering, and applied data science.
          </p>
        </motion.div>

        <ConnectPrompt />

        <div className="grid items-start gap-8 border-t border-cream/10 pt-8 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="flex items-start gap-4 py-2">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cream/10 text-accent">
                <Mail size={19} />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-cream">Email</h4>
                <a href="mailto:cvanherick@berkeley.edu" className="text-cream/70 hover:text-accent transition-colors font-medium break-all">
                  cvanherick@berkeley.edu
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 py-2">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cream/10 text-accent">
                <MapPin size={19} />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-cream">Location</h4>
                <p className="text-cream/70">UC Berkeley, California</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="border-l-2 border-accent/45 pl-6 md:pl-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">Start a conversation</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-cream">Interested in working together?</h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/65">
                The fastest way to reach me is email. Include a little context about what you’re building or exploring, and I’ll get back to you.
              </p>
              <a href="mailto:cvanherick@berkeley.edu" className="mt-8 btn btn-primary inline-flex items-center gap-2 text-lg">
                Email Connor <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

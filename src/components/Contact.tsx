import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-6">
            <span id="contact-title">Get In Touch</span>
          </h2>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto">
            I’m open to thoughtful conversations about ML, systems, and ambitious products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="card p-8 flex items-start gap-4 hover:lift">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Mail size={24} className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Email</h4>
                <a href="mailto:cvanherick@berkeley.edu" className="text-cream/70 hover:text-accent transition-colors font-medium break-all">
                  cvanherick@berkeley.edu
                </a>
              </div>
            </div>

            <div className="card p-8 flex items-start gap-4 hover:lift">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin size={24} className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Location</h4>
                <p className="text-cream/70">UC Berkeley, California</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="card p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-secondary font-semibold">Start a conversation</p>
              <h3 className="mt-4 text-3xl font-bold text-cream">Have a problem worth solving?</h3>
              <p className="mt-4 text-lg leading-relaxed text-cream/65">
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

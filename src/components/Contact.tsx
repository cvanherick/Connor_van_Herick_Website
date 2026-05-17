import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setStatus("Thank you! I'll get back to you soon.")
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations.
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
                <a href="mailto:connor@connorvanherick.com" className="text-slate-300 hover:text-accent transition-colors font-medium break-all">
                  connor@connorvanherick.com
                </a>
              </div>
            </div>

            <div className="card p-8 flex items-start gap-4 hover:lift">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin size={24} className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Location</h4>
                <p className="text-slate-300">UC Berkeley, California</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 font-medium mb-3">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-3">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-3">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-all duration-300 resize-vertical"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full btn btn-primary text-lg py-5 font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
                {status && (
                  <p className="text-center text-accent font-medium pt-4">{status}</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact


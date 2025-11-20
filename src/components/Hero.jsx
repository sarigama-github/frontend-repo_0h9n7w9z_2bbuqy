import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Stream, Collect and Share
            <span className="block bg-gradient-to-r from-indigo-400 to-fuchsia-300 bg-clip-text text-transparent">Movies, Dramas & Cartoons</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-lg text-slate-300 max-w-xl"
          >
            A modern home for your favorite titles. Upload your catalog, organize by genres, and browse in a cinematic interface.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop" alt="Cinema" className="w-full h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/70 to-transparent"></div>
          <div className="absolute bottom-0 p-4">
            <p className="text-slate-200 text-sm">Curate your own MOVIEPLACE library</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

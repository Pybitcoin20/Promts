import { motion } from 'motion/react';
import { HeroCanvas } from '../canvas/HeroCanvas';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroCanvas />

      {/* Floating 3D Elements Simulated with Glassmorphism */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [-6, -4, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[30%] w-56 h-72 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl z-20 hidden lg:flex flex-col p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Active Kernel</span>
        </div>
        <div className="space-y-3 mt-auto">
          <div className="h-2 bg-white/10 rounded-full w-full" />
          <div className="h-2 bg-white/10 rounded-full w-[80%]" />
          <div className="h-2 bg-white/10 rounded-full w-[90%]" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [4, 6, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] bottom-[25%] w-64 h-44 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl shadow-2xl z-20 hidden lg:block p-6"
      >
        <div className="text-blue-400 font-mono text-[10px] mb-2">[SYS_ANALYSIS]</div>
        <div className="text-xl font-bold tracking-tight mb-4">98.4% Efficiency</div>
        <div className="flex gap-1">
          <div className="flex-1 h-10 bg-blue-500/20 rounded-sm border-t border-blue-400/50" />
          <div className="flex-1 h-10 bg-blue-500/40 rounded-sm border-t border-blue-400" />
          <div className="flex-1 h-10 bg-blue-500/20 rounded-sm border-t border-blue-400/50" />
        </div>
      </motion.div>
      
      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-blue-400">Next-Gen Prompt Engine Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[86px] leading-[0.9] font-sans font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
        >
          The Architecture of <br />
          Artificial Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-xl text-white/50 mb-12 font-light leading-relaxed"
        >
          Master the art of generative engineering with cinematic precision. 
          Orchestrate complex workflows through our industry-leading Prompt Metadigital structure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton className="px-8 py-4 rounded-full bg-white text-black font-bold group overflow-hidden">
            <span className="flex items-center gap-2">
              Start Building <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-brand-blue/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </MagneticButton>
          
          <button className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-all">
            Browse Gallery
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-brand-blue to-transparent"
        />
      </div>
    </section>
  );
}

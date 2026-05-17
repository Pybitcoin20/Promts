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
        animate={{ 
          y: [0, -20, 0], 
          rotateX: [0, 10, 0],
          rotateY: [-6, -4, -6] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[5%] top-[25%] w-64 h-80 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl z-20 hidden lg:flex flex-col p-6 perspective-1000"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Active Kernel</span>
          </div>
          <div className="text-[10px] text-blue-400 font-mono">v4.0.2</div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="space-y-2">
            <div className="h-1 bg-white/10 rounded-full w-full" />
            <div className="h-1 bg-white/10 rounded-full w-[80%]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 rounded-lg bg-blue-500/10 border border-blue-500/20" />
            <div className="h-12 rounded-lg bg-purple-500/10 border border-purple-500/20" />
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex justify-between text-[10px] text-white/40">
            <span>NETWORK LOAD</span>
            <span>42%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ["40%", "60%", "42%"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" 
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 30, 0], 
          rotateX: [0, -5, 0],
          rotateY: [4, 8, 4] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] bottom-[20%] w-72 h-52 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl shadow-2xl z-20 hidden lg:block p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-blue-400 font-mono text-[10px] tracking-widest">[SYS_ANALYSIS]</div>
          <div className="w-4 h-4 rounded-full border border-blue-400/30 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-ping" />
          </div>
        </div>
        
        <div className="text-3xl font-sans font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
          98.4% <span className="text-sm font-light text-white/30">Efficiency</span>
        </div>
        
        <div className="flex gap-2 items-end h-16">
          {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h}%`, `${Math.min(100, h+20)}%`, `${h}%`] }}
              transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex-1 bg-blue-500/20 rounded-sm border-t border-blue-400/50"
            />
          ))}
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
          style={{ transformStyle: "preserve-3d" }}
          className="text-6xl md:text-[86px] leading-[0.9] font-sans font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
        >
          <motion.span 
            animate={{ z: [0, 50, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="block"
          >
            The Architecture of
          </motion.span>
          <motion.span
            animate={{ z: [0, 80, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="block mt-2"
          >
            Artificial Intelligence
          </motion.span>
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

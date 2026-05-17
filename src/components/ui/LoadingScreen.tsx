import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center gap-12"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center relative overflow-hidden"
            >
              <span className="text-white font-bold text-4xl">A</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-white/20 border-dashed rounded-2xl scale-125"
              />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand-blue blur-3xl -z-10"
            />
          </div>

          <div className="w-64 space-y-4">
            <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: `${progress - 100}%` }}
                className="absolute inset-0 bg-brand-blue shadow-[0_0_10px_#0ea5e9]"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>Initializing Core</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

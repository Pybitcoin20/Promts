import { motion } from 'motion/react';
import { Cpu, Globe, Lock, Zap, MousePointer2, Layers } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const FEATURES = [
  {
    title: "Quantum Processing",
    description: "Real-time prompt optimization powered by custom neural engines.",
    icon: <Cpu className="text-brand-blue" />,
    className: "md:col-span-2 md:row-span-2",
    bg: "bg-brand-blue/5"
  },
  {
    title: "Global Sync",
    description: "Collaborate across borders with millisecond latency.",
    icon: <Globe className="text-brand-purple" />,
    className: "md:col-span-1 md:row-span-1",
    bg: "bg-brand-purple/5"
  },
  {
    title: "Vault Security",
    description: "Enterprise-grade encryption for your intellectual property.",
    icon: <Lock className="text-red-400" />,
    className: "md:col-span-1 md:row-span-2",
    bg: "bg-red-500/5"
  },
  {
    title: "Instant Deploy",
    description: "One-click integration with major AI APIs and frameworks.",
    icon: <Zap className="text-yellow-400" />,
    className: "md:col-span-1 md:row-span-1",
    bg: "bg-yellow-500/5"
  },
  {
    title: "Interactive Canvas",
    description: "Visual logic builders for complex prompt chaining.",
    icon: <Layers className="text-brand-cyan" />,
    className: "md:col-span-2 md:row-span-1",
    bg: "bg-brand-cyan/5"
  }
];

export function BentoFeatures() {
  return (
    <section className="py-32 px-6 md:px-12 bg-black/40 backdrop-blur-3xl relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tighter mb-6">Engineered for the Elite</h2>
          <p className="text-white/40 max-w-xl mx-auto font-light">
            Our infrastructure is built to support the high-density requirements 
            of modern AI-first workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "group relative p-8 rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-white/[0.02]",
                feature.className,
                "bg-white/[0.03] backdrop-blur-sm"
              )}
            >
              <div className="absolute top-0 right-0 p-8 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 opacity-20 group-hover:opacity-100">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <MousePointer2 size={16} />
                </div>
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

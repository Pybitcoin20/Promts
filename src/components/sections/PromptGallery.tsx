import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

const PROMPTS = [
  {
    id: 1,
    title: "Ethereal Landscapes",
    author: "Neon_Dreamer",
    image: "https://picsum.photos/seed/ai1/800/600",
    likes: "2.4k",
    type: "Midjourney"
  },
  {
    id: 2,
    title: "Cybernetic Portraits",
    author: "Future_Art",
    image: "https://picsum.photos/seed/ai2/800/1000",
    likes: "1.8k",
    type: "Stable Diffusion"
  },
  {
    id: 3,
    title: "Minimalist Architecture",
    author: "Form_Studio",
    image: "https://picsum.photos/seed/ai3/800/800",
    likes: "3.1k",
    type: "Flux"
  },
  {
    id: 4,
    title: "Hyperrealistic Nature",
    author: "Earth_AI",
    image: "https://picsum.photos/seed/ai4/800/1200",
    likes: "950",
    type: "DALL-E 3"
  },
  {
    id: 5,
    title: "Liquid Gold Abstract",
    author: "Midas_Touch",
    image: "https://picsum.photos/seed/ai5/1000/800",
    likes: "5.6k",
    type: "Midjourney"
  },
  {
    id: 6,
    title: "Neon City Life",
    author: "Urban_Synth",
    image: "https://picsum.photos/seed/ai6/800/900",
    likes: "1.2k",
    type: "Stable Diffusion"
  }
];

function PromptCard({ prompt, index }: { prompt: typeof PROMPTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden glass border-white/5 hover:border-white/20 transition-all duration-500 mb-6"
    >
      <div className="relative aspect-auto overflow-hidden">
        <img
          src={prompt.image}
          alt={prompt.title}
          className="w-full transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[0.5] group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-brand-blue">
            {prompt.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-1 group-hover:text-brand-blue transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-white/40 mb-4">by @{prompt.author}</p>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-4 text-white/40">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Heart size={16} />
              <span className="text-xs font-medium">{prompt.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MessageSquare size={16} />
            </button>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function PromptGallery() {
  return (
    <section id="gallery" className="relative py-32 px-6 md:px-12 aurora-bg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter mb-4">
              Explore the <br />
              <span className="text-white/40">Meta-Digital</span> Frontier
            </h2>
            <p className="text-white/50 text-lg font-light">
              Thousands of hand-crafted prompts verified for high-performance 
              creative output across every major AI framework.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all font-medium bg-white/5 backdrop-blur-md">
              Trending
            </button>
            <button className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all">
              New Releases
            </button>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {PROMPTS.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

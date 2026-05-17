import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send } from 'lucide-react';
import { createPrompt } from '@/src/services/promptService';

export function CreatePromptModal({ isOpen, onClose, onSuccess }: { 
  isOpen: boolean, 
  onClose: () => void,
  onSuccess: () => void
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Midjourney');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await createPrompt({ title, content, type });
      setTitle('');
      setContent('');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl glass p-8 rounded-3xl border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-brand-blue/20 text-brand-blue">
                <Sparkles size={20} />
              </div>
              <h2 className="text-2xl font-sans font-bold">Initialize New Prompt</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g. Cyberpunk Neon Cathedral"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">AI Model</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors appearance-none"
                >
                  <option value="Midjourney">Midjourney</option>
                  <option value="Stable Diffusion">Stable Diffusion</option>
                  <option value="DALL-E 3">DALL-E 3</option>
                  <option value="Flux">Flux</option>
                  <option value="GPT">GPT</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Prompt Content</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Masterpiece, ultra detailed, volumetric lighting..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-blue transition-colors min-h-[150px] resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-brand-blue text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-blue/80 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Initializing..." : (
                  <>
                    Initialize <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

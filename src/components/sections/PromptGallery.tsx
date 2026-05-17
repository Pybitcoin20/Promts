import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Heart, MessageSquare, Share2, Bookmark, Plus } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { getPrompts, likePrompt, toggleSavePrompt, getUserLikedPrompts } from '@/src/services/promptService';
import { CreatePromptModal } from '../modals/CreatePromptModal';

interface Prompt {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  image?: string;
  likesCount: number;
  type: string;
}

function PromptCard({ prompt, index, isLiked, isSaved, onLike, onSave }: { 
  prompt: Prompt, 
  index: number,
  isLiked: boolean,
  isSaved: boolean,
  onLike: (id: string) => void,
  onSave: (id: string) => void
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { user } = useAuth();

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl overflow-hidden glass border-white/5 hover:border-white/20 transition-all duration-500 mb-6"
    >
      <div className="relative aspect-auto overflow-hidden" style={{ transform: "translateZ(50px)" }}>
        <img
          src={prompt.image || `https://picsum.photos/seed/${prompt.id}/800/600`}
          alt={prompt.title}
          className="w-full transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[0.5] group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-brand-blue">
            {prompt.type}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); onSave(prompt.id); }}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-all",
              isSaved ? "bg-brand-blue text-white" : "bg-black/50 text-white/60 hover:text-white"
            )}
          >
            <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-6" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-sans font-semibold mb-1 group-hover:text-brand-blue transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-white/40 mb-4 font-light">by @{prompt.authorName}</p>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-4 text-white/40">
            <button 
              onClick={() => onLike(prompt.id)}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                isLiked ? "text-red-400" : "hover:text-white"
              )}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-xs font-medium">{prompt.likesCount}</span>
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
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'likes' | 'saved'>('explore');
  const { user } = useAuth();

  const fetchPrompts = async () => {
    const data = await getPrompts();
    if (data) setPrompts(data as Prompt[]);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const liked = await getUserLikedPrompts(user.uid);
        if (liked) setLikedIds(liked);
      };
      fetchUserData();
    }
  }, [user]);

  const handleLike = async (id: string) => {
    if (!user) return; // Prompt sign in
    const liked = await likePrompt(id);
    setLikedIds(prev => liked ? [...prev, id] : prev.filter(pId => pId !== id));
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, likesCount: p.likesCount + (liked ? 1 : -1) } : p));
  };

  const handleSave = async (id: string) => {
    if (!user) return;
    const saved = await toggleSavePrompt(id);
    setSavedIds(prev => saved ? [...prev, id] : prev.filter(pId => pId !== id));
  };

  const filteredPrompts = prompts.filter(p => {
    if (activeTab === 'explore') return true;
    if (activeTab === 'likes') return likedIds.includes(p.id);
    if (activeTab === 'saved') return savedIds.includes(p.id);
    return true;
  });

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
            <button 
              onClick={() => setActiveTab('explore')}
              className={cn(
                "px-6 py-3 rounded-full border transition-all font-medium",
                activeTab === 'explore' ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
              )}
            >
              Explore
            </button>
            {user && (
              <>
                <button 
                  onClick={() => setActiveTab('likes')}
                  className={cn(
                    "px-6 py-3 rounded-full border transition-all font-medium",
                    activeTab === 'likes' ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
                  )}
                >
                  My Likes
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={cn(
                    "px-6 py-3 rounded-full border transition-all font-medium",
                    activeTab === 'saved' ? "bg-white text-black border-white" : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
                  )}
                >
                  Saved
                </button>
              </>
            )}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full bg-brand-blue text-white font-bold hover:bg-brand-blue/80 transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              Share
            </button>
          </div>
        </div>

        <CreatePromptModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchPrompts} 
        />

        {filteredPrompts.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPrompts.map((prompt, i) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                index={i}
                isLiked={likedIds.includes(prompt.id)}
                isSaved={savedIds.includes(prompt.id)}
                onLike={handleLike}
                onSave={handleSave}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-white/20 text-lg">
              {activeTab === 'explore' ? "No prompts found in the nexus." : "No prompts found in this collection."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

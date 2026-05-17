import { motion } from 'motion/react';
import { Menu, Search, User, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { loginWithGoogle, logout } from '@/src/lib/firebase';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, username, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 transition-all duration-500",
        isScrolled ? "py-4 bg-black/40 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <span className="text-xl font-sans font-bold tracking-tight uppercase">
          Aetherial
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        {['Showcase', 'Models', 'API', 'Enterprise'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-white transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-white">{username}</span>
              <button 
                onClick={logout}
                className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest"
              >
                Sign Out
              </button>
            </div>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
                <User size={16} />
              </div>
            )}
          </div>
        ) : (
          <>
            <button 
              onClick={loginWithGoogle}
              className="px-5 py-2 text-sm font-medium border border-white/10 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={loginWithGoogle}
              className="hidden md:flex px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-all"
            >
              Join Waitlist
            </button>
          </>
        )}
        <button className="md:hidden p-2 text-white/60 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>
  );
}

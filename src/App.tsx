/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SmoothScroll } from './components/layout/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { PromptGallery } from './components/sections/PromptGallery';
import { BentoFeatures } from './components/sections/BentoFeatures';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CursorGlow } from './components/ui/CursorGlow';
import { motion } from 'motion/react';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative bg-[#050505] min-h-screen">
        {/* Background Aurora Lighting Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-overlay" />

        <CursorGlow />
        <LoadingScreen />
        <Navbar />
        
        <main>
          <Hero />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <PromptGallery />
            <BentoFeatures />
          </motion.div>
        </main>

        <footer className="py-20 px-6 md:px-12 border-t border-white/10 mesh-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-display font-bold">Aetherial</span>
              </div>
              <p className="text-white/40 max-w-sm mb-8">
                Defining the next generation of digital creativity through 
                immersive AI prompting technologies.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Discord', 'GitHub'].map(social => (
                  <a key={social} href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Platform</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Models</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Company</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="container mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
            <span>© 2026 Aetherial AI. Built for the future.</span>
            <div className="flex gap-8">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}

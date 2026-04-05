import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 bg-[#0F1C12] border-t-3 border-[#16A34A] text-white overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <Shield size={28} className="text-[#16A34A]" />
              <span className="text-2xl font-display font-black tracking-tight uppercase">
                Smart Grievance<span className="text-[#16A34A]">.</span>AI
              </span>
            </div>
            <p className="text-white/60 font-sans text-sm leading-relaxed">
              Empowering communities with autonomous civic intelligence. Redefining the interface between citizens and authority through trust and transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#16A34A]">Platform</h4>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Workflow</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Intelligence</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#16A34A]">Legal</h4>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Security</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#16A34A]">Social</h4>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Github</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-green-600/15 gap-6">
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} SGMS INFRASTRUCTURE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
             <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">System Status: Optimal</span>
          </div>
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#16A34A]/10 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;

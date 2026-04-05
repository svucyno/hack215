import { Brain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import IntelligenceScene from '../components/animations/IntelligenceScene';

const AIIntelligencePage = () => {
  return (
    <div className="font-sans bg-[#EEF7EE] min-h-screen pt-24 overflow-x-hidden">
      {/* Full Width Dark Hero */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        background: 'linear-gradient(135deg, #050d08 0%, #0a1f0f 40%, #061a10 100%)',
        minHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 25px 50px -12px rgba(22, 163, 74, 0.25)'
      }}>
        <IntelligenceScene />
        
        <div className="container mx-auto px-6 max-w-[1240px] relative z-20">
          <div style={{ padding: '80px 0', maxWidth: '55%' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#16A34A]/25 border border-[#22C55E]/40 text-[#86EFAC] font-mono text-[10px] uppercase font-black tracking-widest mb-8"
            >
              Neural Infrastructure
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} 
               className="text-6xl md:text-[92px] font-display font-black text-white tracking-tight leading-none uppercase mb-8"
            >
              Operational <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4ADE80] to-[#22C55E] italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Intelligence</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} 
              className="text-2xl text-white/70 font-sans font-normal leading-relaxed max-w-xl opacity-90"
            >
              High-precision grievance logic that understands context, intent, and priority in real-time.
            </motion.p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 max-w-[1240px] py-40 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 flex flex-col gap-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-5 mt-4">
              {[
                { title: 'Vernacular Translation', desc: 'Detects and translates 20+ dialects to standardized English instantly.' },
                { title: 'Semantic Triage', desc: 'Goes beyond keywords to understand the actual severity of incidents.' },
                { title: 'Intent Mapping', desc: 'Correctively routes grievances even when citizen terminology is unclear.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white border border-[rgba(0,0,0,0.07)] border-l-[3px] border-l-[#16A34A] rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-[#DCFCE7] rounded-xl flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                    <Brain size={20} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-display font-bold text-[#0F1C12] uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-[#374151] opacity-70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex-1 w-full bg-white border border-[rgba(22,163,74,0.15)] rounded-3xl p-10 lg:p-16 relative overflow-hidden shadow-sm">
            <div className="flex flex-col gap-10 relative z-10">
               <h3 className="text-4xl font-display font-black text-[#0F1C12] tracking-tighter uppercase leading-none">The Brain <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#16A34A] to-[#22C55E] italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Behind The Portal</span></h3>
               <p className="text-[#374151] font-sans leading-relaxed opacity-80">Our proprietary neural framework doesn't just store grievances—it reasons through them. By analyzing sentiment, historical context, and legislative requirements, it transforms raw data into actionable intelligence for every civic officer.</p>
               <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-4 text-sm font-bold text-[#16A34A] uppercase tracking-widest"><div className="w-10 h-[2px] bg-[#16A34A]" /> Context Aware Reasoning</div>
                 <div className="flex items-center gap-4 text-sm font-bold text-[#16A34A] uppercase tracking-widest"><div className="w-10 h-[2px] bg-[#16A34A]" /> Multi-dialect understanding</div>
                 <div className="flex items-center gap-4 text-sm font-bold text-[#16A34A] uppercase tracking-widest"><div className="w-10 h-[2px] bg-[#16A34A]" /> Bias-free prioritization</div>
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIIntelligencePage;

import React from 'react';
import { Mic, BrainCircuit, FileText, UserCheck, Sparkles, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import CapabilitiesScene from '../components/animations/CapabilitiesScene';

const FeaturesPage = () => {
  const features = [
    { icon: <Mic size={24} />, title: 'MULTILINGUAL INPUT', description: 'Log complaints in your native language with real-time translation and voice-to-text processing for truly inclusive civic access.' },
    { icon: <BrainCircuit size={24} />, title: 'AI CLASSIFICATION', description: 'Advanced NLP automatically categorizes incidents and predicts priority levels for immediate response routing.' },
    { icon: <FileText size={24} />, title: 'GRIEVANCE ANALYSIS', description: 'Transform raw citizen statements into structured, ready-to-process civic grievance summaries instantly.' },
    { icon: <UserCheck size={24} />, title: 'SMART ASSIGNMENT', description: 'Algorithmically match cases to the most suitable staff based on workload, location, and specialized expertise.' },
    { icon: <Sparkles size={24} />, title: 'AI CASE ASSISTANT', description: 'An intelligent copilot for staff to quickly query case details, summarize history, and generate automated alerts.' },
    { icon: <Activity size={24} />, title: 'OPERATIONAL LOGS', description: 'Transparent, end-to-end visibility for citizens to monitor their case status and resolution updates with full immutability.' }
  ];

  return (
    <div className="font-sans bg-[#F8FBF8] min-h-screen pt-24">
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
        <CapabilitiesScene />
        
        <div className="container mx-auto px-6 max-w-[1240px] relative z-20">
          <div style={{ padding: '80px 0', maxWidth: '55%' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#16A34A]/25 border border-[#22C55E]/40 text-[#86EFAC] font-mono text-[10px] uppercase font-black tracking-widest mb-8"
            >
              Capabilities
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-8xl font-display font-[800] text-white tracking-tight leading-none uppercase mb-8"
            >
              Breaking Traditional <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4ADE80] to-[#22C55E] italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Boundaries</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-white/70 font-sans font-normal leading-relaxed max-w-xl opacity-90"
            >
              Equipping citizens and civic authorities with next-generation analytical power to build a better, more responsive community.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-[1240px] py-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-10 bg-white border border-[rgba(0,0,0,0.07)] border-l-[3px] border-l-[#16A34A] rounded-2xl hover:shadow-[0_12px_40px_rgba(22,163,74,0.16)] hover:-translate-y-2 transition-all duration-500 flex flex-col gap-8 relative overflow-hidden shadow-[0_4px_24px_rgba(22,163,74,0.08)]"
            >
              <div className="w-14 h-14 bg-[#DCFCE7] rounded-xl flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-500">
                {f.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-display font-bold text-[#0F1C12] tracking-tight uppercase leading-none group-hover:text-[#16A34A] transition-colors">{f.title}</h3>
                <p className="text-sm text-[#374151] font-sans font-medium leading-relaxed opacity-70">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 p-12 lg:p-24 bg-white border border-[rgba(22,163,74,0.15)] flex flex-col items-center text-center gap-10 overflow-hidden relative group rounded-2xl shadow-sm">
          <h2 className="text-4xl md:text-6xl font-display font-black text-[#0F1C12] tracking-tighter relative z-10 leading-none uppercase">
            Experience the <br /> <span className="title-gradient-green" style={{ background: 'linear-gradient(135deg, #16A34A, #22C55E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Future of Governance</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 relative z-10 mt-4">
            <Link to="/register" className="btn-civic-primary flex items-center justify-center gap-3 px-10">
              START REPORTING TODAY <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-civic-ghost px-10">
              LOG IN TO PORTAL
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;

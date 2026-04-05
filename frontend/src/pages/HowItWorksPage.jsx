import React from 'react';
import { Mic, FileText, UserCheck, Activity, Brain, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import WorkflowScene from '../components/animations/WorkflowScene';

const HowItWorksPage = () => {
  const steps = [
    { title: 'SUBMIT GRIEVANCE', desc: 'Citizen inputs details via text or voice in their native language.', icon: <Mic className="text-[#16A34A]" /> },
    { title: 'AI PROCESSING', desc: 'System parses, translates, and structures the incoming data stream.', icon: <Brain className="text-[#059669]" /> },
    { title: 'TRIAGE & PRIORITY', desc: 'Automated priority classification takes place instantly.', icon: <ShieldCheck className="text-[#22C55E]" /> },
    { title: 'STAFF ASSIGNMENT', desc: 'Smart routing allocates to the most appropriate civic department.', icon: <UserCheck className="text-[#16A34A]" /> },
    { title: 'DRAFT GENERATION', desc: 'AI drafts official summaries ready for staff endorsement.', icon: <FileText className="text-[#6B7280]" /> },
    { title: 'RESOLUTION', desc: 'Actionable data is sent to the field for rapid service restoration.', icon: <Activity className="text-[#15803D]" /> }
  ];

  return (
    <div className="font-sans bg-[#EEF7EE] min-h-screen pt-24">
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
        <WorkflowScene />
        
        <div className="container mx-auto px-6 max-w-[1240px] relative z-20">
          <div style={{ padding: '80px 0', maxWidth: '55%' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#16A34A]/25 border border-[#22C55E]/40 text-[#86EFAC] font-mono text-[10px] uppercase font-black tracking-widest mb-8"
            >
              The Process
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-[92px] font-display font-black text-white tracking-tighter leading-none uppercase mb-8"
            >
              End-To-End <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4ADE80] to-[#22C55E] italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Industrial Flow</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="text-xl text-white/70 font-sans font-normal leading-relaxed max-w-xl mt-4 opacity-90"
            >
              Seamlessly bridging the gap between issue occurrence and resolution through decentralized intelligence.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-[1240px] py-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative pb-20">
          <div className="hidden lg:block absolute top-[50%] left-10 right-10 h-[2px] border-t-2 border-dashed border-[#16A34A]/20 -z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center gap-10 bg-white border border-[rgba(0,0,0,0.07)] border-l-[3px] border-l-[#16A34A] rounded-2xl p-12 group hover:shadow-[0_12px_40px_rgba(22,163,74,0.16)] hover:translate-y-[-8px] transition-all duration-500 relative overflow-hidden shadow-[0_4px_24px_rgba(22,163,74,0.08)]"
            >
              <div className="absolute -top-10 -right-4 text-[120px] font-display font-black text-[#16A34A] select-none pointer-events-none opacity-[0.08] group-hover:opacity-[0.10] transition-opacity">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="w-24 h-24 rounded-2xl bg-[#DCFCE7] border border-[rgba(22,163,74,0.1)] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#16A34A] group-hover:text-white group-hover:shadow-[0_8px_30px_rgba(22,163,74,0.30)]">
                {step.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-display font-bold text-[#0F1C12] uppercase tracking-tight leading-none group-hover:text-[#16A34A] transition-colors">{step.title}</h4>
                <p className="text-sm text-[#374151] font-sans font-medium leading-relaxed opacity-70 px-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 w-full flex flex-col md:flex-row items-center gap-16 p-12 lg:p-24 bg-white border border-[rgba(22,163,74,0.15)] rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#16A34A]/05 blur-[150px] rounded-full" />
          <div className="flex-1 flex flex-col gap-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-[#0F1C12] tracking-tighter uppercase leading-none">Ready to see <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#16A34A] to-[#22C55E] italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>It In Action?</span></h2>
            <p className="text-xl text-[#374151] font-sans font-normal leading-relaxed opacity-80">Connect with local departments and experience modern public services optimized by AI.</p>
            <div className="flex flex-col sm:flex-row gap-6 mt-4">
              <Link to="/register" className="btn-civic-primary flex items-center justify-center gap-3 px-12">
                GET STARTED NOW <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-civic-ghost px-14 font-black">
                LOG IN
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl relative lg:translate-x-12">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#16A34A]/10 to-transparent blur-3xl opacity-30" />
             <img src="/images/staff_ai_dashboard_1774207821043.png" alt="Officer Dashboard" className="w-full h-auto rounded-xl shadow-[0_20px_60px_rgba(22,163,74,0.16)] border border-[rgba(22,163,74,0.1)] grayscale-[0.3] hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;

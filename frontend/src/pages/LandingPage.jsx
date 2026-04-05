import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Activity, Brain, ArrowRight, Cpu, Database, Zap, Globe } from 'lucide-react';
import Footer from '../components/Footer';

const LandingPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const headline = "Empowering Civic Intelligence Thru AI Automation";
  const words = headline.split(' ');

  const heroStyles = {
    background: '#FFFFFF',
    backgroundImage: 'radial-gradient(ellipse 60% 50% at 10% 20%, rgba(34,197,94,0.10) 0%, transparent 65%), radial-gradient(circle, rgba(22,163,74,0.06) 1px, transparent 1px)',
    backgroundSize: '100% 100%, 28px 28px'
  };

  const dashboardCardStyles = {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(22,163,74,0.20)',
    boxShadow: '0 8px 32px rgba(22,163,74,0.12)'
  };

  return (
    <div className="flex flex-col bg-[#F8FBF8] selection:bg-[#16A34A]/20 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-40 pb-20 overflow-hidden" style={heroStyles}>
        <div className="container mx-auto px-6 max-w-[1240px] relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 flex flex-col gap-10 text-center lg:text-left">
            <div className="reveal-up">
              <div className="badge-civic border border-[rgba(22,163,74,0.30)] shadow-sm">
                Enterprise-Grade System
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-display font-[900] text-[#0F1C12] leading-[1.0] tracking-[-0.05em]">
              {words.map((word, i) => (
                <span 
                  key={i} 
                  className="animate-word" 
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {word === 'AI' ? <span className="title-gradient-green" style={{ background: 'linear-gradient(135deg, #16A34A, #22C55E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span> : word}&nbsp;
                </span>
              ))}
            </h1>
            
            <p className="reveal-up text-xl md:text-[22px] text-[#374151] max-w-2xl mx-auto lg:mx-0 font-sans font-normal leading-[1.7]" style={{ transitionDelay: '0.6s' }}>
              Redefining public service through high-precision grievance classification and automated resolution pipelines. Built for trust. Optimized for civic growth.
            </p>
            
            <div className="reveal-up flex flex-col sm:flex-row items-center gap-6 mt-4 lg:justify-start justify-center" style={{ transitionDelay: '0.8s' }}>
              <Link to="/register" className="btn-civic-primary w-full sm:w-auto text-lg px-10">
                FILE A GRIEVANCE
              </Link>
              <Link to="/how-it-works" className="btn-civic-ghost w-full sm:w-auto text-lg px-10">
                SEE HOW IT WORKS
              </Link>
            </div>
          </div>
          
          <div className="reveal-up flex-1 w-full max-w-3xl relative" style={{ transitionDelay: '0.4s' }}>
            {/* Dashboard Mockup Card */}
            <div className="rounded-2xl p-4 lg:p-7 overflow-hidden" style={dashboardCardStyles}>
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="h-32 rounded-xl bg-[#EEF7EE] border border-[rgba(22,163,74,0.05)] flex flex-col p-5 justify-between">
                  <div className="text-[10px] font-mono text-[#6B7280] uppercase tracking-widest font-bold">Intake Flow</div>
                  <div className="text-2xl font-display font-black text-[#16A34A]">ACTIVE</div>
                  <div className="w-full h-1.5 bg-[#16A34A]/10 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-[#16A34A] to-[#22C55E]" />
                  </div>
                </div>
                <div className="h-32 rounded-xl bg-[#EEF7EE] border border-[rgba(22,163,74,0.05)] flex flex-col p-5 justify-between">
                  <div className="text-[10px] font-mono text-[#6B7280] uppercase tracking-widest font-bold">Accuracy</div>
                  <div className="text-2xl font-display font-black text-[#16A34A]">98.4%</div>
                  <div className="w-full h-1.5 bg-[#16A34A]/10 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#16A34A]" />
                  </div>
                </div>
                <div className="col-span-2 h-52 rounded-xl bg-white border border-[rgba(22,163,74,0.1)] p-5 flex flex-col gap-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-[rgba(22,163,74,0.05)] pb-3">
                    <div className="text-[11px] font-mono text-[#15803D] uppercase tracking-widest flex items-center gap-2 font-bold">
                       <span className="w-2 h-2 rounded-full bg-[#22C55E] signal-dot" />
                       REAL-TIME TRIAGE
                    </div>
                    <div className="text-[10px] text-[#6B7280] font-mono font-medium tracking-tighter">NODE_ACTIVE: GW-505</div>
                  </div>
                  <div className="space-y-3 pt-1">
                    {[
                      { t: 'Deciphering Telugu voice input...', c: 'text-[#16A34A]' },
                      { t: 'Categorized: Water Infrastructure', c: 'text-[#374151]' },
                      { t: 'Priority level 4 detected: Critical', c: 'text-[#EF4444]' },
                      { t: 'Routing case to HMWSSB Node...', c: 'text-[#374151]' }
                    ].map((log, i) => (
                      <div key={i} className={`text-[11px] font-mono ${log.c} flex gap-2 font-medium`}>
                        <span className="opacity-30">[{i+1}]</span> {log.t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 bg-[#EEF7EE] border-y border-[rgba(22,163,74,0.1)] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
             {[
               { val: '24ms', label: 'Processing Speed', icon: <Zap size={16} className="text-[#16A34A]" /> },
               { val: '100%', label: 'Transparency', icon: <Globe size={16} className="text-[#059669]" /> },
               { val: '99.9%', label: 'Availability', icon: <Cpu size={16} className="text-[#15803D]" /> },
               { val: 'Encrypted', label: 'Data Security', icon: <Database size={16} className="text-[#6B7280]" /> }
             ].map((stat, i) => (
                <div key={i} className="reveal-up flex flex-col items-center gap-3" style={{ transitionDelay: `${i * 0.1}s` }}>
                   <div className="flex items-center gap-3">
                     {stat.icon}
                     <h4 className="text-4xl md:text-5xl font-display font-[900] text-[#0F1C12] tracking-tighter">{stat.val}</h4>
                   </div>
                   <p className="text-[11px] font-mono font-bold text-[#6B7280] uppercase tracking-[0.25em]">{stat.label}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Module Overview */}
      <section className="py-40 relative bg-white">
        <div className="container mx-auto px-6 max-w-[1240px]">
          <div className="reveal-up flex flex-col gap-6 mb-32 items-center text-center">
             <div className="badge-civic">CAPABILITIES</div>
             <h2 className="text-5xl md:text-7xl font-display font-black text-[#0F1C12] tracking-tight leading-none uppercase">
               The <span className="title-gradient-green">Next Gen</span>
             </h2>
             <p className="text-xl text-[#374151] max-w-xl opacity-80 font-sans mt-4">Exploring the architecture behind localized civic intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Core Capabilities', path: '/features', desc: 'Enterprise-grade AI classification and multilingual intake logic.', icon: <Sparkles size={32} /> },
              { title: 'Operational Flow', path: '/how-it-works', desc: 'Seamless industrial process from citizen input to departmental resolution.', icon: <Activity size={32} /> },
              { title: 'Neural Infra', path: '/ai-intelligence', desc: 'The architectural backbone of our automated intelligence and geospatial analysis.', icon: <Brain size={32} /> }
            ].map((card, i) => (
              <Link 
                key={i} 
                to={card.path}
                className="reveal-up group p-12 bg-white border border-[rgba(0,0,0,0.07)] border-l-[3px] border-l-[#16A34A] rounded-2xl hover:shadow-[0_12px_40px_rgba(22,163,74,0.16)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center gap-8 shadow-[0_4px_24px_rgba(22,163,74,0.08)]"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-20 h-20 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-500">
                  {card.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-display font-[800] text-[#0F1C12] tracking-tight uppercase leading-none">{card.title}</h3>
                  <p className="text-[#374151] font-sans font-medium text-sm leading-relaxed opacity-70">{card.desc}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-[#16A34A] font-bold text-[11px] font-mono uppercase tracking-widest group-hover:gap-4 transition-all mt-4 border-b border-transparent hover:border-[#16A34A] pb-1">
                   ENTER MODULE <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navStyles = {
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(22,163,74,0.12)'
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]" style={navStyles}>
      <div className="container mx-auto px-6 max-w-[1240px] h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#22C55E] flex items-center justify-center text-white shadow-lg shadow-green-500/10 group-hover:scale-105 transition-transform duration-300">
            <Shield size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-display font-black text-[#0F1C12] tracking-tighter uppercase">
            Smart Grievance<span className="text-[#16A34A]">.</span>AI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link to="/features" className="nav-link" style={{ color: '#374151' }}>Capabilities</Link>
          <Link to="/how-it-works" className="nav-link" style={{ color: '#374151' }}>Workflow</Link>
          <Link to="/ai-intelligence" className="nav-link" style={{ color: '#374151' }}>Intelligence</Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/login" className="text-sm font-semibold text-[#6B7280] hover:text-[#16A34A] transition-colors">
            Log in
          </Link>
          <button 
            onClick={() => navigate('/register')}
            className="px-6 py-2.5 bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white rounded-[6px] font-semibold text-sm hover:shadow-[0_8px_30px_rgba(22,163,74,0.2)] hover:translate-y-[-1px] active:scale-95 transition-all duration-300"
          >
            Register Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#0F1C12] p-2 hover:bg-[#DCFCE7] rounded-lg transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[rgba(22,163,74,0.15)] shadow-2xl transition-all duration-500 origin-top overflow-hidden ${isOpen ? 'max-h-[500px] py-10' : 'max-h-0 py-0'}`}>
        <div className="container mx-auto px-6 flex flex-col gap-8">
          <Link onClick={() => setIsOpen(false)} to="/features" className="text-2xl font-display font-bold text-[#0F1C12] hover:text-[#16A34A]">
            Capabilities
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/how-it-works" className="text-2xl font-display font-bold text-[#0F1C12] hover:text-[#16A34A]">
            Workflow
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/ai-intelligence" className="text-2xl font-display font-bold text-[#0F1C12] hover:text-[#16A34A]">
            Intelligence
          </Link>
          <div className="h-px bg-[rgba(22,163,74,0.1)]" />
          <div className="flex flex-col gap-4">
             <Link onClick={() => setIsOpen(false)} to="/login" className="text-center text-[#6B7280] font-bold uppercase tracking-widest text-xs py-2">
                Log in
             </Link>
             <Link onClick={() => setIsOpen(false)} to="/register" className="btn-civic-primary text-center py-4">
                Register Now
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

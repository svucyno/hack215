import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCitizenLang } from '../context/CitizenLanguageContext';
import { LanguageToggle } from './citizen/LanguageToggle';
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  Map as MapIcon, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Edit3,
  BarChart3,
  FileText,
  Building,
  Users,
  ShieldAlert,
  Flag,
  Menu,
  Zap,
  Activity,
  ShieldCheck,
  Target,
  Bot,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isCollapsed, setIsCollapsed, user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  const { t } = useCitizenLang();

  const menuItems = (() => {
    const role = user?.role;
    if (role === 'USER') {
      return [
        { label: t('nav_overview'), icon: <LayoutDashboard size={20} />, path: '/user/dashboard', tagline: t('nav_overview_sub') },
        { label: t('nav_grievanceAI'), icon: <Bot size={20} />, path: '/user/voice-assistant', tagline: t('nav_grievanceAI_sub') },
        { label: t('nav_myGrievances'), icon: <List size={20} />, path: '/user/my-complaints', tagline: t('nav_myGrievances_sub') },
        { label: t('nav_zoneMap'), icon: <MapIcon size={20} />, path: '/user/complaint-map', tagline: t('nav_zoneMap_sub') },
        { label: t('nav_feedback'), icon: <MessageSquare size={20} />, path: '/user/feedback', tagline: t('nav_feedback_sub') },
        { label: t('nav_profile'), icon: <User size={20} />, path: '/user/profile', tagline: t('nav_profile_sub') },
      ];
    }
    if (role === 'STAFF') {
      return [
        { label: 'Field Dashboard', icon: <LayoutDashboard size={20} />, path: '/staff', tagline: 'Command Center' },
        { label: 'Task Deployment', icon: <ClipboardList size={20} />, path: '/staff/assigned', tagline: 'Active Missions' },
        { label: 'Efficiency Matrix', icon: <BarChart3 size={20} />, path: '/staff/workload', tagline: 'KPI Oversight' },
        { label: 'Identity Protocol', icon: <User size={20} />, path: '/staff/profile', tagline: 'Credentials' },
      ];
    }
    if (role === 'ADMIN') {
      return [
        { label: 'Service Hub', icon: <LayoutDashboard size={20} />, path: '/admin', tagline: 'Executive Control' },
        { label: 'AI Analyst', icon: <Bot size={20} />, path: '/admin/ai-assistant', tagline: 'Civic Analysis' },
        { label: 'Grievance Ledger', icon: <ShieldAlert size={20} />, path: '/admin/complaints', tagline: 'Issue Records' },
        { label: 'Zone Map', icon: <MapIcon size={20} />, path: '/admin/map', tagline: 'City Grid' },
        { label: 'Department Mgmt', icon: <Building size={20} />, path: '/admin/departments', tagline: 'Office Oversight' },
        { label: 'Staff Roster', icon: <Users size={20} />, path: '/admin/staffs', tagline: 'Personnel' },
        { label: 'Identity Protocol', icon: <User size={20} />, path: '/admin/profile', tagline: 'Admin Access' },
      ];
    }
    return [];
  })();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 250 }}
      className="fixed inset-y-0 left-0 bg-[#0F1C12] text-[#94A3B8] flex flex-col z-[70] border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)] transition-all duration-500"
    >
      {/* Brand Header */}
      <div className={`h-24 flex items-center px-6 transition-all duration-500 border-b border-white/5 relative overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#16A34A]/10 to-transparent opacity-50"></div>
        <div className="flex items-center gap-4 group relative z-10">
          <div className="bg-[#16A34A] p-2.5 rounded-2xl text-white shadow-[0_0_20px_rgba(22,163,74,0.4)] shrink-0 group-hover:rotate-12 transition-all duration-500">
            <Zap size={20} className="fill-white" />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white whitespace-nowrap uppercase leading-none drop-shadow-md">CIVIC<span className="text-[#16A34A]">SYSTEMS</span></span>
              <span className="text-[8px] font-black text-[#22C55E] uppercase tracking-[0.5em] mt-1 opacity-80">Grievance Portal</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2.5 overflow-y-auto no-scrollbar relative z-10">
        {user?.role === 'USER' && (
          <div style={{ 
            padding: '8px 12px 4px',
            borderBottom: '1px solid rgba(22,163,74,0.15)',
            marginBottom: '8px'
          }}>
            {!isCollapsed && (
              <div style={{ 
                fontSize: '9px', 
                color: 'rgba(22,163,74,0.6)', 
                letterSpacing: '0.1em',
                marginBottom: '6px',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                LANGUAGE / భాష
              </div>
            )}
            <LanguageToggle />
          </div>
        )}
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-[1.25rem] transition-all duration-500 group relative
                ${isActive 
                  ? 'bg-white/5 text-[#FFFFFF] border border-green-600/15 shadow-[0_10px_20px_rgba(0,0,0,0.3)]' 
                  : 'text-slate-500 hover:text-slate-200'
                }`}
            >
              {isActive && (
                 <motion.div 
                   layoutId="sidebar-active"
                   className="absolute left-0 w-1.5 h-8 bg-[#16A34A] rounded-r-full shadow-[0_0_15px_rgba(22,163,74,0.8)]"
                 />
              )}
              <div className={`shrink-0 transition-all duration-500 ${isActive ? 'text-[#22C55E] scale-110' : 'group-hover:scale-110 group-hover:text-[#22C55E]'}`}>
                {React.cloneElement(item.icon, { size: 20 })}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-[11px] font-black tracking-[0.1em] uppercase transition-colors">{item.label}</span>
                  <span className={`text-[8px] font-bold uppercase tracking-widest opacity-30 transition-opacity ${isActive ? 'opacity-80' : 'group-hover:opacity-60'}`}>{item.tagline}</span>
                </div>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-10 px-6 py-3 bg-[#F8FBF8]/90 backdrop-blur-xl text-[#0F1C12] text-[10px] font-black uppercase tracking-widest rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-green-600/15 z-[80] shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-none translate-x-4 group-hover:translate-x-0">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Status Matrix */}
      {!isCollapsed && (
        <div className="px-6 py-6 relative z-10">
           <div className="p-5 overflow-hidden rounded-3xl border border-white/5 flex flex-col gap-4 bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Activity size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                      {user?.role === 'USER' ? t('nav_neuralLink') : 'Neural Link'}
                    </span>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                      {user?.role === 'USER' ? t('nav_efficiency') : 'Efficiency'}
                    </span>
                    <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">92.4%</span>
                 </div>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] shadow-[0_0_10px_rgba(22,163,74,0.5)]"></motion.div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/5 bg-[#0F1C12] relative z-20">
        {!isCollapsed && (
          <div className="mb-6 px-4 py-4 bg-white/5 rounded-[1.5rem] flex items-center gap-4 border border-white/5 shadow-inner group hover:border-green-600/15 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white flex items-center justify-center text-[14px] font-black shrink-0 border border-green-600/15 shadow-2xl group-hover:scale-105 transition-transform">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.8)] animate-pulse"></div>
                <span className="text-[11px] font-black text-white uppercase tracking-tighter truncate opacity-90">{user?.name}</span>
              </div>
              <span className="text-[8px] font-black text-[#16A34A] uppercase tracking-[0.3em] mt-0.5">
                {user?.role === 'USER' ? t('nav_userRole') : `${user?.role} NODE`}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:bg-rose-600 hover:text-white hover:shadow-[0_10px_25px_rgba(225,29,72,0.4)] transition-all group duration-500 ${isCollapsed ? 'justify-center bg-white/5' : ''}`}
        >
          <LogOut size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
          {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {user?.role === 'USER' ? t('nav_terminate') : 'Terminate Session'}
          </span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

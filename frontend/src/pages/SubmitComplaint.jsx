import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';
import { useCitizenLang } from '../context/CitizenLanguageContext';

const SubmitComplaint = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useCitizenLang();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      <header className="header-box flex flex-col gap-4 relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 -mr-20 -mt-20 blur-[100px] rounded-full group-hover:bg-primary-500/20 transition-all duration-1000"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <Link to="/user/dashboard" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-[#0F1C12] border border-white/5">
              <ArrowLeft size={18} />
            </Link>
          <div className="bg-[#BBF7D0] py-6 px-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(74,222,128,0.1)] border border-green-200/50 relative overflow-hidden group/header flex-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#BBF7D0] to-[#4ADE80]"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover/header:bg-white/40 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none uppercase text-[#064E3B]">
                {t('sc_header_title')}
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#064E3B]/70 leading-relaxed max-w-xl">
                {t('sc_header_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
      </header>

       <div className="w-full">
         <ComplaintForm user={user} onSuccess={() => navigate('/user/dashboard')} />
       </div>
    </div>
  );
};

export default SubmitComplaint;

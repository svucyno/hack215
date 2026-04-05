import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, ShieldCheck, AlertCircle } from 'lucide-react';

const OfficerDeptModal = ({ isOpen, onClose, officer, user, departments, onUpdate }) => {
  const [selectedDept, setSelectedDept] = useState('');
  const [status, setStatus] = useState('Active');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (officer) {
      setSelectedDept(officer.departmentId?._id || officer.departmentId || '');
      setStatus(officer.status || 'Active');
      setError('');
    }
  }, [officer]);

  const handleUpdate = async () => {
    if (!selectedDept) {
      setError('Please select a department branch.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_BASE}/api/admin/staff/${officer._id}/department`, {
        departmentId: selectedDept,
        status: status
      }, config);
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update personnel file.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!officer) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-3xl overflow-hidden border border-slate-100"
          >
            <div className="p-8 md:p-12 flex flex-col gap-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded w-max">Personnel Management</span>
                  <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Officer Deployment</h2>
                  <p className="text-xs text-slate-500 font-medium">Managing assignments for <span className="text-slate-900 font-bold">{officer.name}</span>.</p>
                </div>
                <button onClick={onClose} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-bold animate-in fade-in zoom-in duration-300">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Authority Branch</label>
                  <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" size={18} />
                    <select
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Operational Status</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" size={18} />
                    <select
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleUpdate}
                  disabled={submitting}
                  className="btn-primary py-4 font-bold text-base shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2 group w-full"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Update Personnel Record</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OfficerDeptModal;

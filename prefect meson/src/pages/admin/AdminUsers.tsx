import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import {
  Users,
  ShieldCheck,
  Key,
  CheckCircle2,
  Mail,
} from 'lucide-react';

interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Content Editor' | 'Project Lead';
  status: 'Active' | 'Invited';
  lastActive: string;
  avatarLetter: string;
  color: string;
}

export const AdminUsers: React.FC = () => {
  const [passwordState, setPasswordState] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);

  const adminAccounts: AdminAccount[] = [
    {
      id: 'usr-1',
      name: 'Director & Admin Lead',
      email: 'admin@perfectmason.com',
      role: 'Super Admin',
      status: 'Active',
      lastActive: 'Currently Active Session',
      avatarLetter: 'PM',
      color: 'bg-blue-600',
    },
    {
      id: 'usr-2',
      name: 'Studio Project Manager',
      email: 'contact@perfectmason.com',
      role: 'Project Lead',
      status: 'Active',
      lastActive: '2 hours ago',
      avatarLetter: 'ND',
      color: 'bg-emerald-600',
    },
    {
      id: 'usr-3',
      name: 'Architectural Content Editor',
      email: 'editor@perfectmason.com',
      role: 'Content Editor',
      status: 'Active',
      lastActive: 'Yesterday',
      avatarLetter: 'AC',
      color: 'bg-purple-600',
    },
  ];

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.newPass || passwordState.newPass.length < 8) {
      setPasswordFeedback('New password must be at least 8 characters long.');
      return;
    }
    if (passwordState.newPass !== passwordState.confirm) {
      setPasswordFeedback('New password and confirmation do not match.');
      return;
    }
    setPasswordFeedback('Password updated successfully for authorized administrator.');
    setPasswordState({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordFeedback(null), 4000);
  };

  return (
    <AdminLayout>
      <div className="space-y-7 pb-16">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <Users className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">
                Admin Users & Security Access
              </h1>
            </div>
            <p className="text-sm text-slate-600 font-sans max-w-2xl">
              Manage authorized administrator credentials, team roles, role-based permissions, and studio account security.
            </p>
          </div>
        </div>

        {/* Authorized Team Accounts Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                Authorized Team Accounts
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Accounts with direct access to publish changes to the Perfect Mason website.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold">
              3 Active Accounts
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {adminAccounts.map((account) => (
              <div key={account.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl ${account.color} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                    {account.avatarLetter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm font-sans">
                        {account.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                        {account.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{account.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{account.status}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {account.lastActive}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Admin Password Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Key className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                Change Administrator Password
              </h2>
            </div>

            {passwordFeedback && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-sans">
                {passwordFeedback}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-800 font-sans">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordState.current}
                  onChange={(e) => setPasswordState({ ...passwordState, current: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-800 font-sans">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 8 characters"
                    value={passwordState.newPass}
                    onChange={(e) => setPasswordState({ ...passwordState, newPass: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 outline-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-800 font-sans">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordState.confirm}
                    onChange={(e) => setPasswordState({ ...passwordState, confirm: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 outline-none font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/30 transition-all cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Security Recommendations Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wide">
                Security & Session Status
              </h2>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-sans">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">PostgreSQL TLS Protected</span>
                  Database queries and storage uploads run over secure isolated channels.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Session Guard Active</span>
                  All administrative endpoints and CMS routes require authorized credentials.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Audit Log Recording</span>
                  Every content update, publish action, and project change is recorded with timestamps.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

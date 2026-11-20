import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[80vh] bg-white text-slate-900 pt-36 pb-24 flex items-center justify-center select-none px-6">
      <div className="max-w-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-950 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-950 block">
          ERROR 404 // PAGE NOT FOUND
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-slate-950">
          Architectural Landmark Not Found
        </h1>

        <p className="text-base text-slate-600 font-sans leading-relaxed">
          The requested page or blueprint does not exist or has been relocated within the Perfect Mason master architecture.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-950 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO HOMEPAGE</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/gallery')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-sans text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>EXPLORE PORTFOLIO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import { forwardRef } from 'react';
import { InteriorScene } from '../../data/interiorsData';
import { InteriorCard } from './InteriorCard';

interface InteriorPanelProps {
  scene: InteriorScene;
  index: number;
  totalScenes: number;
  onSelectScene?: (scene: InteriorScene) => void;
}

export const InteriorPanel = forwardRef<HTMLDivElement, InteriorPanelProps>(
  ({ scene, totalScenes, onSelectScene }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          willChange: 'transform',
        }}
        className="interior-panel absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-end select-none bg-slate-950"
      >
        {/* 1. FULLSCREEN 8K INTERIOR PHOTOGRAPH (100vw x 100vh object-cover) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover object-center block"
            style={{ opacity: 1 }}
          />

          {/* Readability Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/45 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2. ATTACHED INFORMATION CARD (Moves In Lockstep With Image) */}
        <InteriorCard
          scene={scene}
          totalScenes={totalScenes}
          onSelectScene={onSelectScene}
        />
      </div>
    );
  }
);

InteriorPanel.displayName = 'InteriorPanel';

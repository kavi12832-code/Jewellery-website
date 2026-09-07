import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbiance: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startAtelierSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Warm atmospheric drone chords (F# major / Champagne gold tuning: 185Hz, 277Hz, 370Hz)
      const freqs = [185.0, 277.18, 369.99, 554.37];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle LFO for breathing warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.03 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      // Occasional delicate crystal chime note
      const playRandomChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const chimeFreqs = [739.99, 1108.73, 1479.98, 2217.46];
        const randomFreq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(randomFreq, ctx.currentTime);

        chimeGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(masterGain);
        chimeOsc.start();
        chimeOsc.stop(ctx.currentTime + 3.6);
      };

      intervalRef.current = window.setInterval(() => {
        if (Math.random() > 0.4) {
          playRandomChime();
        }
      }, 4000);

      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio playback error', e);
    }
  };

  const stopSoundscape = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        gainNodeRef.current = null;
        setIsPlaying(false);
      }, 1000);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startAtelierSoundscape();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute Atelier Soundscape' : 'Immerse in Atelier Ambiance (Harmonic Chimes)'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-espresso-900/60 backdrop-blur-md text-xs tracking-widest uppercase text-champagne-300/80 hover:text-gold-400 hover:border-gold-500/50 transition-all duration-300 group"
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-gold-400" />
          <span className="hidden sm:inline font-cormorant italic text-sm tracking-wider">Atelier Ambiance</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-white/50 group-hover:text-gold-400 transition-colors" />
          <span className="hidden sm:inline font-cormorant italic text-sm tracking-wider">Soundscape</span>
        </>
      )}
    </button>
  );
};

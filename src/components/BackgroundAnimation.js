import React, { useRef, useEffect, useCallback } from 'react';
import './Background.css';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  const startVanta = useCallback(() => {
    if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    if (!vantaRef.current) return;

    vantaEffectRef.current = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xffffff,
      backgroundColor: 0x0a0a0a,
      points: 10.00,
      maxDistance: 20.00,
      spacing: 15.00,
    });
  }, []);

  useEffect(() => {
    startVanta();
    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, [startVanta]);

  const handleClick = () => {
    startVanta();
  };

  return (
    <div
      ref={vantaRef}
      onClick={handleClick}
      style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, backgroundImage: 'url("/path/to/your/background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}
    >
      {children}
      <div className="overlay">
        <div className="statistics-bar">
          <div className="stat-item"></div>
          <div className="stat-item"></div>
          <div className="stat-item"></div>
        </div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
};

export default VantaBackground;

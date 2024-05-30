// src/hooks/useRange.ts
import { useState, useRef } from 'react';

interface Range {
  min: number;
  max: number;
}

const useRange = (initialMin: number, initialMax: number, fixedValues: number[] = []) => {
  const [range, setRange] = useState<Range>({ min: initialMin, max: initialMax });
  const sliderRef = useRef<HTMLDivElement>(null);
  const minBallRef = useRef<HTMLDivElement>(null);
  const maxBallRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, ball: 'min' | 'max') => {
    e.preventDefault();
    const moveBall = (e: MouseEvent) => {
      if (sliderRef.current && minBallRef.current && maxBallRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;
        let value = Math.round((percentage / 100) * (initialMax - initialMin) + initialMin);

        if (fixedValues.length > 0) {
          value = fixedValues.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
        }

        if (ball === 'min' && value < range.max && value >= initialMin) {
          setRange(prev => ({ ...prev, min: value }));
        } else if (ball === 'max' && value > range.min && value <= initialMax) {
          setRange(prev => ({ ...prev, max: value }));
        }
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', moveBall);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', moveBall);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return { range, setRange, sliderRef, minBallRef, maxBallRef, handleMouseDown };
};

export default useRange;

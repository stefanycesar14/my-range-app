// src/components/Range.tsx
import React, { useEffect, useState } from 'react';
import useRange from '../hooks/useRange';
import useFetchRange from '../hooks/useFetchRange';
import styles from '@/styles/Range.module.css';

interface RangeProps {
  apiUrl: string;
  type: 'normal' | 'fixed';
}

const Range = ({ apiUrl, type }: RangeProps) => {
  const { range: initialRange, fixedValues, loading, error } = useFetchRange(apiUrl);
  const [initialMin, setInitialMin] = useState(0);
  const [initialMax, setInitialMax] = useState(100);
  const { range, setRange, sliderRef, minBallRef, maxBallRef, handleMouseDown } = useRange(initialMin, initialMax, type === 'fixed' ? fixedValues : []);

  useEffect(() => {
    if (type === 'normal' && initialRange) {
      setInitialMin(initialRange.min);
      setInitialMax(initialRange.max);
      setRange({ min: initialRange.min, max: initialRange.max });
    } else if (type === 'fixed' && fixedValues.length > 0) {
      setInitialMin(fixedValues[0]);
      setInitialMax(fixedValues[fixedValues.length - 1]);
      setRange({ min: fixedValues[0], max: fixedValues[fixedValues.length - 1] });
    }
  }, [initialRange, fixedValues, type, setRange]);

  const getProportionalLeft = (value: number) => {
    if (fixedValues.length > 0) {
      const index = fixedValues.indexOf(value);
      if (index !== -1) {
        return (index / (fixedValues.length - 1)) * 100;
      }
    }
    return 0;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (type === 'fixed' && fixedValues.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.rangeContainer} ref={sliderRef}>
          <div
            className={styles.ball}
            style={{ left: `${getProportionalLeft(range.min)}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
            ref={minBallRef}
          ></div>
          <div
            className={styles.ball}
            style={{ left: `${getProportionalLeft(range.max)}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
            ref={maxBallRef}
          ></div>
          <div className={styles.slider}></div>
        </div>
        <div className={styles.labels}>
          {fixedValues.map((value, index) => (
            <label key={index}>{value}</label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.rangeContainer} ref={sliderRef}>
        <div
          className={styles.ball}
          style={{ left: `${((range.min - initialMin) / (initialMax - initialMin)) * 100}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
          ref={minBallRef}
        ></div>
        <div
          className={styles.ball}
          style={{ left: `${((range.max - initialMin) / (initialMax - initialMin)) * 100}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
          ref={maxBallRef}
        ></div>
        <div className={styles.slider}></div>
      </div>
      <div className={styles.labels}>
        <label>{range.min}</label>
        <label>{range.max}</label>
      </div>
    </div>
  );
};

export default Range;

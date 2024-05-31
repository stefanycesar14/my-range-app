import React, { useEffect, useState } from 'react';
import useRange from '../hooks/useRange';
import useFetchRange from '../hooks/useFetchRange';
import styles from '../styles/Range.module.css';

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

  const getColorFromGradient = (value: number) => {
    const percentage = getProportionalLeft(value) / 100;
    const color1 = { r: 224, g: 195, b: 252 };
    const color2 = { r: 142, g: 197, b: 252 };
    const r = color1.r + percentage * (color2.r - color1.r);
    const g = color1.g + percentage * (color2.g - color1.g);
    const b = color1.b + percentage * (color2.b - color1.b);
    return `rgb(${r}, ${g}, ${b})`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (type === 'fixed' && fixedValues.length > 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Exercise 2</h1>
        <div className={styles.rangeContainer} ref={sliderRef}>
          <div
            className={styles.ball}
            style={{
              left: `${getProportionalLeft(range.min)}%`,
              background: getColorFromGradient(range.min),
            }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
            ref={minBallRef}
          >
            {range.min}
          </div>
          <div
            className={styles.ball}
            style={{
              left: `${getProportionalLeft(range.max)}%`,
              background: getColorFromGradient(range.max),
            }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
            ref={maxBallRef}
          >
            {range.max}
          </div>
          <div className={styles.slider}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Exercise 1</h1>
      <div className={styles.rangeContainer} ref={sliderRef}>
        <div
          className={styles.ball}
          style={{
            left: `${((range.min - initialMin) / (initialMax - initialMin)) * 100}%`,
            background: getColorFromGradient(range.min),
          }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
          ref={minBallRef}
        >
          {range.min}
        </div>
        <div
          className={styles.ball}
          style={{
            left: `${((range.max - initialMin) / (initialMax - initialMin)) * 100}%`,
            background: getColorFromGradient(range.max),
          }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
          ref={maxBallRef}
        >
          {range.max}
        </div>
        <div className={styles.slider}></div>
      </div>
    </div>
  );
};

export default Range;



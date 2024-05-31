import React from 'react';
import Range from '@/components/Range';
import styles from '@/styles/Range.module.css';
const Exercise1 = () => {
  return (
    <div className={styles.appBackground}>
      <h1 className={styles.title}>Ejercicio 1: Rango Normal</h1>
      <Range apiUrl="http://demo9745462.mockable.io/normal" type="normal" />
    </div>
  );
};

export default Exercise1;

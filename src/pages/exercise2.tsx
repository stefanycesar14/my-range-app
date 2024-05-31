import React from 'react';
import Range from '@/components/Range';
import styles from '@/styles/Range.module.css';
const Exercise2 = () => {
  return (
    <div className={styles.appBackground}>
      <h1 className={styles.title}>Ejercicio 2: Rango de Valores Fijos</h1>
      <Range apiUrl="http://demo9745462.mockable.io/fixed" type="fixed" />
    </div>
  );
};

export default Exercise2;

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Range.module.css';

const Home = () => {
  return (
  <div className={styles.appBackground}>
      <div className={styles.container}>
     
     <h1 className={styles.title}>Welcome to the Range Slider App</h1>
     <div>
       <Link href="/exercise1">
         <button className={styles.button}>Exercise 1</button>
       </Link>
       <Link href="/exercise2">
         <button className={styles.button}>Exercise 2</button>
       </Link>
     </div>
   </div>
  </div>
  );
};

export default Home;


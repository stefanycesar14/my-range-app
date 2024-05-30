import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <ul>
        <li>
          <Link href="/exercise1">Ejercicio 1: Rango Normal</Link>
        </li>
        <li>
          <Link href="/exercise2">Ejercicio 2: Rango de Valores Fijos</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

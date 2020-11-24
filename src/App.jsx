import React, { useState } from 'react';
import './App.scss';
import Search from './component/Search';
import Result from './component/Result';

export default function App() {
  const [city, setCity] = useState('Jakarta');

  function changeCity(event) {
    setCity(event.target.value);
  }
  return (
    <div id="app">
      <Search city={city} changeCity={changeCity} />
      <Result city={city} />
    </div>
  );
}

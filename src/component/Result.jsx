import React, { useEffect, useState } from 'react';
import '../style/Result.scss';

export default function Result(props) {
  const [result, setResult] = useState({});
  const [units, setUnits] = useState('metric');
  const [showResult, setShowResult] = useState(false);

  function getFahrenheit() {
    const celcius = result.temp;
    return Math.round((celcius * 9) / 5 + 32);
  }

  function changeUnits() {
    if (units == 'metric') {
      setUnits('imperial');
    } else {
      setUnits('metric');
    }
  }

  async function fetchWeather(location) {
    const apiKey = '2e26dda3d1cad9a9762aaef146d6df48';
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,
      );
      if (!response.ok) {
        setShowResult(false);
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const responseJson = await response.json();

      setResult({
        name: responseJson.name,
        ...responseJson.main,
        weather: { ...responseJson.weather },
      });

      setShowResult(true);
    } catch (error) {
      console.log(console.log(error.message));
    }
  }

  useEffect(() => {
    console.log(props.city);
    const timer = setTimeout(() => {
      fetchWeather(props.city);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.city]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div id="result">
      {showResult ? (
        <div id="wrapper">
          <p id="name">{result.name}</p>
          <div id="weather">
            <img
              src="https://openweathermap.org/img/wn/10n@2x.png"
              alt="weather"
            />
            <p id="temp" onClick={changeUnits}>
              {units == 'metric' ? Math.round(result.temp) : getFahrenheit()}
              {units == 'metric' ? '°C' : '°F'}
            </p>
          </div>
          <p id="desc">{result.weather[0].description}</p>
        </div>
      ) : null}
    </div>
  );
}

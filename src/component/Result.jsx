import React, { useEffect, useState } from 'react';
import '../style/Result.scss';

export default function Result(props) {
  const [result, setResult] = useState({});
  const [units, setUnits] = useState('metric');

  const apiKey = 'd661ec879e0404ab15475ffddc0f7ef3';

  async function fetchWeather(location) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`,
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const responseJson = await response.json();

    setResult({
      name: responseJson.name,
      ...responseJson.main,
      weather: { ...responseJson.weather },
    });
  }

  useEffect(() => {
    console.log(props.city);
    fetchWeather(props.city);
  }, [props.city]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return <div id="result"></div>;
}

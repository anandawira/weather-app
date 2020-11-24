import React from 'react';
import '../style/Search.scss';

export default function Search(props) {
  return (
    <div id="search">
      <h1>WEATHER APP</h1>
      <div id="search-box">
        <input type="text" name="locationInput" id="locationInput" placeholder='Location' onChange={props.changeCity} value={props.city}/>
      </div>
    </div>
  );
}

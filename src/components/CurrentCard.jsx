import React from "react";
import './styles/currentCard.css'

function CurrentCard({ data, unit }) {
  let date = new Date().toLocaleString();

  function getCardinalDirection(angle) {
    var val = Math.floor(angle / 22.5 + 0.5);
    var arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  }
  // cheek address
 const Address=+(data.resolvedAddress.split(','))[0]?data.timezone:data.resolvedAddress
  const card = (
    <div className="card row mx-auto ">
      <div className="icon-text col-sm-12 col-md-4">
        <span className="icon">
          <img
            className="img-fluid w-50 mb-2"
            src={`../assets/${data.currentConditions.icon}.png`}
          />
        </span>
        <p className="condition">{data.currentConditions.conditions}</p>
        <div className="title">
          <p>{Address}</p>
        </div>
        <p className="time d-block">{date}</p>
      </div>
      <div className="data col-sm-12 col-md-8">
        <div className="row">
          <div className="col-sm-12">
            <div className="header">Temp</div>
            <div className="temp">
              <span>{Math.round(data.currentConditions.temp)}</span>
              {unit=='metric'?' °C':' °F'}
            </div>
          </div>

          <div className="col-sm-6 col-md-6">
            <div className="header">Sunset</div>
            <div className="value">{(data.currentConditions.sunset).split(':')[0]+':'+(data.currentConditions.sunset).split(':')[1]} PM</div>
          </div>

          <div className="col-sm-6 col-md-6">
            <div className="header">Sunrise</div>
            <div className="value">{(data.currentConditions.sunrise).split(':')[0]+':'+(data.currentConditions.sunrise).split(':')[1]} AM</div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-3">
            <div className="header">pressure</div>
            <div className="value">
              {`${Math.round(data.currentConditions.pressure)} mb`}
              
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="header">Humidity</div>
            <div className="value">
              {Math.round(data.currentConditions.humidity) + " %"}
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="header">Wind Speed</div>
            <div className="value">
              {Math.round(data.currentConditions.windspeed)}
              {unit == "metric" ? " kph" : " mph"}
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="header">Wind Direction</div>
            <div className="value">
              {getCardinalDirection(data.currentConditions.winddir)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return data && card;
}

export default CurrentCard;

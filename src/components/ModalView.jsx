import React from "react";
import Modal from "react-bootstrap/Modal";
import "./styles/modal.css";

import { handelModal } from '../redux/DataSlice'
import { useSelector,useDispatch } from "react-redux";
import Charts from "./Charts";

function ModalView() {
  
  const { dayData,unit,modal} = useSelector((state) => state.data);
  const dispatch=useDispatch();

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	  }
	const day=`${new Date(dayData.datetime).toLocaleDateString("en-US", options).split(", ")[0]} `;
	const date=`${new Date(dayData.datetime).toLocaleDateString("en-US", options).split(", ")[1]} `;
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
  return (
    <>

      <Modal size="lg" show={modal} onHide={()=>dispatch(handelModal())}>
        <Modal.Body>
          <div className="current-weather-card card-module content-module ">
            <div className="card-header ">
              <h1>{day}</h1>
              <p className="sub">{date}</p>
              <span className="close-span" onClick={()=>dispatch(handelModal())}>X</span>
            </div>

            <div className="card-content">
              <div className="current-weather">
                <div className="">
                  <img src={`../assets/${dayData.icon}.png`}/>
                  <div className="temps">
                    <div className="display-temp">
                     {Math.round(dayData.temp)}{unit=='metric'?' °C':' °F'}
                    </div>
                  </div>
                </div>
                <h6 className="phrase">{dayData.conditions}</h6>
              </div>
              <div>
                <div className="max-temp">
				<p>{Math.round(dayData.tempmax)}{unit=='metric'?' °C':' °F'}</p> 
                  <div>
                    <div className="label">Max</div>
                  </div>
                </div>
                <div className="min-temp">
                  <p>{Math.round(dayData.tempmin)} {unit=='metric'?'°C':'°F'}</p> 
                  <div>
                    <div className="label">Min</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body-content">
              <h6 className="description">
                {dayData.description}
              </h6>

              <div className="panels">
                <div className="left">
                  <div className="panel-item ">
                    <span className='header'>Humidity</span><p className="value">{Math.round(dayData.humidity)} %</p>
                  </div>
                  <div className="panel-item">
                    <span className="header">Wind</span><p className="value"> 
					{getCardinalDirection(dayData.winddir)} {Math.round(dayData.windspeed)} {unit == "metric" ? " kph" : " mph"}
					</p>
                  </div>
                  <div className="panel-item">
                    <span className='header'>Wind Gusts</span><p className="value"> {Math.round(dayData.windgust)} {unit == "metric" ? " kph" : " mph"}</p>
                  </div>
				  <div className="panel-item">
					<span className='header'>Sunrise</span><p className="value">{(dayData.sunrise.split(':')[0]+':'+dayData.sunrise.split(':')[1])} AM</p>
                  </div>
                  <div className="panel-item">
				  <span className='header'>Sunset</span><p className="value">{(dayData.sunset.split(':')[0]+':'+dayData.sunset.split(':')[1])} PM</p>
                  </div>
                  </div>

                <div className="right">
                  <div className="panel-item">
                    <span className="header">Pressure</span><p className="value">{Math.round(dayData.pressure)} mb</p>
                  </div>
                  <div className="panel-item">
                    <span className='header'>Visibility</span><p className="value">{Math.round(dayData.visibility)} {unit == "metric" ? " km" : " miles"}</p>
				 </div>
				  <div className="panel-item">
                    <span className='header'>Cloud Cover</span><p className="value">{Math.round(dayData.cloudcover)}%</p>
                  </div>
				  <div className="panel-item">
                    <span className='header'>FeelsLike</span><p className="value">{Math.round(dayData.feelslike)}  {unit == "metric" ? " °C" : " °F"}</p>
                  </div>
                  <div className="panel-item">
                    <span className='header'>Snow</span><p className="value">{Math.round(dayData.snow)} {unit == "metric" ? " cm" : " inches"}</p>
                  </div>
               
                </div>
              </div>
            </div>
          </div>
          <Charts location='modal'/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalView;

import React from 'react'
import{useDispatch} from 'react-redux'
import { setDayData,handelModal } from '../redux/DataSlice'

function Card({day,unit}) {
const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
}
const date=new Date(day.datetime).toLocaleDateString("en-US", options);
const dispatch=useDispatch();
  return (
    <div className="card-forecast  " onClick={()=>{dispatch(setDayData(day)) ;dispatch(handelModal())}}>
    <div className="period" >
      {date}
    </div>
    <div className="box ">
      <div className="row">
        <div className="widget col-4">
          <span className="icon">
            <img
              className="img-fluid mb-2"
              src={`../assets/${day.icon}.png`}
            />
          </span>
          <p className="condition">{day.conditions}</p>
        </div>
        <div className="data col-8">
          <div className="row">
            <div className="box col">
              <div className=" header">Max</div>
              <div className="value">{Math.round(day.tempmax)}{unit=='metric'?' °C':' °F'}</div>
              <div className="normals">
                <div className="stats">
                  <p>{Math.round(day.normal.tempmax[0])}</p>
                  <p>min</p>
                </div>
                <div className="stats">
                  <p>{Math.round(day.normal.tempmax[1])}</p>
                  <p>mean</p>
                </div>
                <div className="stats">
                  <p>{Math.round(day.normal.tempmax[2])}</p>
                  <p>max</p>
                </div>
              </div>
            </div>

            <div className="box col">
              <div className=" header">Min</div>
              <div className="value">{Math.round(day.tempmin)}{unit=='metric'?' °C':' °F'}</div>
              <div className="normals">
                <div className="stats">
                  <p>{Math.round(day.normal.tempmin[0])}</p>
                  <p>min</p>
                </div>
                <div className="stats">
                  <p>{Math.round(day.normal.tempmin[1])}</p>
                  <p>mean</p>
                </div>
                <div className="stats">
                  <p>{Math.round(day.normal.tempmin[2])}</p>
                  <p>max</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="description" >
      {day.description}
    </div>
  </div>
  )
}

export default Card
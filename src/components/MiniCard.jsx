import React from 'react'
import  './styles/minicard.css'

import{useDispatch} from 'react-redux'
import { setDayData,handelModal } from '../redux/DataSlice'

function MiniCard({day,unit}) {
    let date=new Date(day.datetime)
    let time=`${date.toString().split(' ')[0]} ${date.getDate()} `

const dispatch=useDispatch();
  return (
    <div className="weakly-div my-1 " onClick={()=>{dispatch(setDayData(day)) ;dispatch(handelModal())}}>
              <div className='box'>
                <h6>{time}</h6>
                <div className='icon'><img src={`../assets/${day.icon}.png`} /></div>
                <p>{day.conditions}</p>
                <div className='temps'>
                    <div><p>{Math.round(day.tempmin)}{unit=='metric'?' °C':' °F'}</p><span className='header'>min</span></div>
                    <div><p>{Math.round(day.tempmax)}{unit=='metric'?' °C':' °F'}</p><span className='header'>max</span></div>
                </div>
              </div>

          </div>
  )
}

export default MiniCard
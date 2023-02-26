import React from "react";
import "./styles/forecastCard.css";
import Card from "./Card"
import MiniCard from "./MiniCard";
function ForecastCard({ data, unit,long }) {

  let days=data.days.slice(1,4);
  const card = (
   <>
     {long==='3days'?
     <div className="forecast-row ">
     {days.map((day,index) =><Card key={index}day={day} unit={unit}/>)}
     </div>
     :
     <div className="weakly-row">
     {data.days.map((day,index) =><MiniCard key={index} day={day} unit={unit}/>)} 
   </div>
     }
    
     
   </>
  );

  return data && card;
}

export default ForecastCard;

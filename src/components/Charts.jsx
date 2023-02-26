import React from "react";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,

} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

function Charts({location}) {
  const { data, loading, unit,dayData,modal } = useSelector((state) => state.data);
  const actualTemp = [];
  const maxTemp = [];
  const minTemp = [];
  const Days = [];
  const windSpeed = [];
  const windGust=[];
  const TempsHourly=[];
  const HoursTime=[];

  ///////////////////////////////////////////////////////////////////////////////////////////////
  !loading &&
    data?.days?.map((day) => {
      let date = new Date(day.datetime);
      let time = `${date.toString().split(" ")[0]} ${date.getDate()} `;
      Days.push(time);
      actualTemp.push(day.temp);
      minTemp.push(day.tempmin);
      maxTemp.push(day.tempmax);
      windSpeed.push(day.windspeed);
      windGust.push(day.windgust)

    });
    !loading &&modal&&
     dayData?.hours?.forEach((hour)=> {TempsHourly.push(hour.temp);
      HoursTime.push((hour.datetime).split(':').slice(0,2).join(':'));
    }) 
     /////////////////////////////////////////////////////////////////////////////////////////////
  const TempData = {
    labels: Days,
    datasets: [
      {
        label: "Temperature",
        data: actualTemp,
        borderColor: "#E14D2A",
        lineTension: 0.1,
      },
      {
        label: "Max Temperature",
        data: maxTemp,
        borderColor: "#CF0A0A",
        lineTension: 0.1,
      },
      {
        lineTension: 0.3,
        label: "Min Temperature",
        data: minTemp,
        borderColor: "#3E6D9C",
        lineTension: 0.1,
      },
    ],
  };
    
  const TempOptions = {
  
    interaction: {
      mode: 'index',
    },
    
    plugins: {
      tooltip: {
        callbacks: {
            label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} °${unit=='metric'?'C':'F'}`,
        },
    },
        legend: {
            labels: {
              usePointStyle: true,
              pointStyle:'rect'
            },
          },
      title: {
        display: true,
        text: "Temperature",
        font: {
          family: "system-ui",
          size: 20,
          weight: "600",
          style: "italic",
        },
        
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        
        title: {
          display: true,
          text: "Day",
          font: {
            family: "system-ui",
            size: 20,
            weight: "600",
            style: "italic",
          },
        },
      },
      y: {
        
        title: {
          display: true,
          text: `Temperature in ${unit == "metric" ? " Celsius" : " Farad"}`,
          font: {
            family: "system-ui",
            size: 20,
            weight: "600",
            style: "italic",
          },
          padding: { top: 0, left: 0, right: 20, bottom: 0 },
        },
      },
    },
  };

 
   /////////////////////////////////////////////////////////////////////////////////////////////
  const WindData = {
    labels:Days,
    datasets: [
      {
        label: 'Wind Speed',
        data: windSpeed,
        backgroundColor: '#fd8d3c',
      },
      {
        label: 'Wind Gust',
        data: windGust,
        backgroundColor: '#fed976',
      },
    ],
  };
  const WindOptions = {
    interaction: {
      mode: 'index',
    },
    
    plugins: {
      tooltip: {
        callbacks: {
            label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} ${unit=='metric'?'kph':'mph'}`,
        },
    },
        legend: {
            labels: {
              usePointStyle: true,
              pointStyle:'rect'
            },
          },
      title: {
        display: true,
        text: 'Wind Speed - Wind Gust',
        font: {
          family: "system-ui",
          size: 20,
          weight: "600",
          style: "italic",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  ///////////////////////////////////////////
  
 const HourData = {
  labels:HoursTime,
  datasets: [
    {
      fill: true,
      label: 'Temp',
      data: TempsHourly,
      borderColor:'#00000013',
      backgroundColor: '#ff5000d1',
    },
  ],
};
const HoursOptions = {
  lineTension:.4,
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
  },
  scales: {
    y: {
      
      title: {
        display: true,
        text: `Temperature in ${unit == "metric" ? " Celsius" : " Farad"}`,
        font: {
          family: "system-ui",
          size: 20,
          weight: "600",
          style: "italic",
        },
        padding: { top: 0, left: 0, right: 20, bottom: 0 },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
          label: (item) =>
              `${item.dataset.label}: ${item.formattedValue} °${unit=='metric'?'C':'F'}`,
      },
  },
    legend:{
      display: false,
    },
    title: {
      display: true,
      text: 'Temperature per hour',
      position:'bottom',
      font: {
        family: "system-ui",
        size: 15,
        weight: "600",
        style: "italic",
      },
    },
  },
};

  return (
 <div className="container ">
  {
    location=='modal'? 
    <Line options={HoursOptions} data={HourData} style={{ height:'300px',width:'75%' }}/>
    :
    <div className=' d-flex flex-column align-items-center pb-2 m-auto' style={{ height:'750px',width:'90%' }}>
    <div style={{width:'100%',height:'100%'}}>
      <Line options={TempOptions} data={TempData} />
    </div>
    <hr style={{width:'50%',margin:'10px auto'}}/>
    <div style={{width:'100%',height:'100%'}}>
      <Bar options={WindOptions} data={WindData} />
    </div>
    </div>
  }

 </div>
  );
}

export default Charts;

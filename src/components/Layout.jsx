import React,{useEffect} from 'react'
import CurrentCard from './CurrentCard'
import ForecastCard from './ForecastCard'
import DegreeButtons from './DegreeButtons'

import{useSelector,useDispatch} from 'react-redux'
import { fetchData } from '../redux/DataSlice'
import ModalView  from './ModalView'
import Charts from './Charts'
import LoaderSpinner from './LoaderSpinner'




function Layout() {

const {data,loading,unit,dayData,searchQuery,modal}=useSelector((state)=>state.data)
const dispatch=useDispatch();
useEffect(() => {
    dispatch(fetchData(searchQuery));
  }, [dispatch])

  return (
    <>
    {loading ?<LoaderSpinner/>:
    <>
        <div className="container d-flex ">
             <div className="weather">
             <DegreeButtons/>
                     <h3>Currently</h3>
                 <div className="row my-2 mx-auto " >
                     {!loading&&<CurrentCard data={data} unit={unit}/>}
                 </div>
                 <h3>3 Day Outlook</h3>
                 <div className="row my-2 mx-auto " >
                     {!loading&&<ForecastCard data={data} unit={unit} long='3days'/>}
                 </div>
                 <h3 className='mt-4'>Long Term Outlook</h3>
                 <div className="row my-2 mx-auto " >
                     {!loading&&<ForecastCard data={data} unit={unit} long='weakly'/>}
                 </div>
             </div>          
         </div>
             {Object.keys(dayData).length!==0&&<ModalView/>}
             {!loading&&<Charts location='home'/>}
 
     </>
     }
    </>
  )
}

export default Layout
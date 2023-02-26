import { useState } from 'react';
import { ButtonGroup,Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUnit, UpdateData } from '../redux/DataSlice';

function DegreeButtons() {
  
const [cheeked, setCheeked] = useState(1)
const dispatch=useDispatch()

const handelDegreeChange=(e)=>{
  setCheeked(e.target.id)
  dispatch(setUnit(e.target.value))
  dispatch(UpdateData())
}

  return (
    <div className='degree-group position-relative'>
      <ButtonGroup className='btn-group position-absolute' style={{right: '0'}} size="md">
        <Button value={'metric'} id='1' variant={cheeked==1?'primary':'outline-primary'} onClick={handelDegreeChange}><sup>&deg;</sup>C </Button>
        <Button value={'us'} id='2' variant={cheeked==2?'primary':'outline-primary'} onClick={handelDegreeChange}><sup>&deg;</sup>F </Button>
      </ButtonGroup>
    </div>

  )
}

export default DegreeButtons;

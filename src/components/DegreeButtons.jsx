import { ButtonGroup,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUnit, UpdateData } from '../redux/DataSlice';

function DegreeButtons() {
  

const dispatch=useDispatch()
const {unit } = useSelector((state) => state.data);

const handelDegreeChange=(e)=>{
  dispatch(setUnit(e.target.value))
  dispatch(UpdateData())
}

  return (
    <div className='degree-group position-relative'>
      <ButtonGroup className='btn-group position-absolute' style={{right: '0'}} size="md">
        <Button value={'metric'} id='1' variant={unit=='metric'?'primary':'outline-primary'} onClick={handelDegreeChange}><sup>&deg;</sup>C </Button>
        <Button value={'us'} id='2' variant={unit=='us'?'primary':'outline-primary'} onClick={handelDegreeChange}><sup>&deg;</sup>F </Button>
      </ButtonGroup>
    </div>

  )
}

export default DegreeButtons;

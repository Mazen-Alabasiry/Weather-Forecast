import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

// fetch weather data

export const fetchData = createAsyncThunk("data/fetchData", async (location, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    const {unit}=getState().data;

    const EndPoint=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&elements=datetime%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Csnow%2Cwindgust%2Cwindspeed%2Cwinddir%2Cpressure%2Ccloudcover%2Cvisibility%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Ccurrent%2Cfcst%2Cstatsfcst%2Cstats&key=${import.meta.env.VITE_API_KEY}&contentType=json&`
      const res = await  fetch(EndPoint)
      if (!res.ok) {
        throw rejectWithValue();
      }
      const data = await res.json();
      return data;
     
  });
  
  export const UpdateData = createAsyncThunk("data/updateData", async (_, {dispatch,getState}) => {
    const {searchQuery}=getState().data;;
    dispatch(fetchData(searchQuery))
  });
  

const initialState={data:{},dayData:{},loading:true,unit:'metric',error:false,searchQuery:'london',modal:false,latitude:null,longitude:null}

export const DataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        setUnit(state,action){
            state.unit=action.payload
        },
        setSearchQuery(state,action){
            state.searchQuery=action.payload
        },
        setDayData(state,action){
          state.dayData = action.payload
        },
        handelModal(state){
          state.modal = !state.modal
        },
        setLocationCoords(state,action){
          state.latitude=action.payload.latitude
          state.longitude=action.payload.longitude
        },

    },


    extraReducers:(builder)=>{
        builder
        .addCase(fetchData.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchData.fulfilled, (state,action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchData.rejected, (state) => {
          state.loading = false;
          state.error = true
        })
    }
})

export const {setUnit,setSearchQuery,setDayData,handelModal,setLocationCoords}=DataSlice.actions;
export default DataSlice.reducer;
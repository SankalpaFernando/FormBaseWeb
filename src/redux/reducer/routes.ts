import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProp = {
  currentProjectID: null | string;
}


const initialState:initialStateProp = {
  currentProjectID: null
}

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setCurrentProject:(state,action:PayloadAction<string>)=> {state.currentProjectID=action.payload}
  }
})


export const { setCurrentProject } = routeSlice.actions;
export default routeSlice.reducer;
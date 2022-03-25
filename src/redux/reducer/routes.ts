import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type currentProjectType = { id: string; name: string };

type initialStateProp = {
  currentProject: null | currentProjectType;
  currentFormID: null | string;
}

const initialState:initialStateProp = {
  currentProject: null,
  currentFormID: null

}

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<currentProjectType>) => { state.currentProject = action.payload },
    setCurrentForm: (state,action: PayloadAction<string>) => { state.currentFormID = action.payload}
  }
})


export const { setCurrentProject,setCurrentForm } = routeSlice.actions;
export default routeSlice.reducer;
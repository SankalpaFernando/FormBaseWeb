// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type currentProjectType = { id: string; name: string };

type initialStateProp = {
  currentProject: null | currentProjectType;
  currentFormID: null | string;
  currentUser: {
    name: string;
    email: string;
    photo: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState:initialStateProp = {
  currentProject: null,
  currentFormID: null,
  currentUser: null,
  isAuthenticated: false

}

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<currentProjectType>) => { state.currentProject = action.payload },
    setCurrentForm: (state, action: PayloadAction<string>) => { state.currentFormID = action.payload },
    setCurrentUser: (state, action: PayloadAction<{
      name: string; email: string; photo: string;
    }>) => { state.currentUser = action.payload },
    setIsAuthenticated:(state,action:PayloadAction<boolean>)=>{state.isAuthenticated = action.payload}
  }
})


export const { setCurrentProject,setCurrentForm,setCurrentUser,setIsAuthenticated } = routeSlice.actions;
export default routeSlice.reducer;
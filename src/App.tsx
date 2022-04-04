import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Outlet, Route,Routes, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import Projects from './pages/dashboard/Projects'
import ProjectInfo from "./pages/dashboard/ProjectInfo"
import FormInfo from './pages/dashboard/FormInfo';
import Redirect from './components/Redirect';
import Forms from './pages/dashboard/Forms'
import Template from './pages/dashboard/Template'
import Login from './pages/Login'
import { Switch } from '@mantine/core'
import AuthRoute from './layout/AuthRoute'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCurrentUser, setIsAuthenticated } from './redux/reducer/routes'
import {  useNavigate } from 'react-router'

function App() {
  const dispatch = useDispatch();
  
//   useEffect(() => {
//     console.log(window.location.ancestorOrigins);
//     axios
//     .get('http://localhost:5000/auth/user', { withCredentials: true })
//     .then((res) => res.data)
//     .then((data) => {
//       dispatch(setCurrentUser({ ...data }));
//       if (data !== null && data.name !== null) {
//         dispatch(setIsAuthenticated(true));
//       } else {
//         dispatch(setIsAuthenticated(false));
//         window.location.href = 'http://localhost:3000/login';
//       }
//     })
//     .catch(() => {
//       dispatch(setIsAuthenticated(false));
//     });
// },[]);
 
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route
                path="/dashboard"
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <AuthRoute>
                    <Projects />
                  </AuthRoute>
                }
              />
              <Route
                path="/templates"
                element={
                  <AuthRoute>
                    <Template />
                  </AuthRoute>
                }
              />
              <Route
                path="/projects/:projectID"
                element={
                  <AuthRoute>
                    <ProjectInfo />
                  </AuthRoute>
                }
              />
              <Route
                path="/forms/:formID"
                element={
                  <AuthRoute>
                    <FormInfo />
                  </AuthRoute>
                }
              />
              <Route
                path="/google/redirect/:code"
                element={
                  <AuthRoute>
                    <Redirect />
                  </AuthRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}




export default App

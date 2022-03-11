import { useState } from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import Projects from './pages/dashboard/Projects'
import ProjectInfo from "./pages/dashboard/ProjectInfo"

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects" element={<ProjectInfo />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App

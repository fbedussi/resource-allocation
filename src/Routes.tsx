import React from 'react'
import { Route, Routes as Switch } from 'react-router'

import AddProjectPage from './pages/AddProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import ProjectsPage from './pages/ProjectsPage'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/project/add" element={<AddProjectPage />} />
      <Route path="/project/edit/:projectId" element={<EditProjectPage />} />
    </Switch>
  )
}

export default Routes

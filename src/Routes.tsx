import React from 'react'
import { Route, Routes as Switch } from 'react-router'

import AddPersonPage from './pages/AddPersonPage'
import AddProjectPage from './pages/AddProjectPage'
import EditPersonPage from './pages/EditPersonPage'
import EditProjectPage from './pages/EditProjectPage'
import HomePage from './pages/HomePage'
import PersonsPage from './pages/PersonsPage'
import ProjectsPage from './pages/ProjectsPage'

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route path="/" element={<HomePage />} />
			<Route path="/projects" element={<ProjectsPage />} />
			<Route path="/project/add" element={<AddProjectPage />} />
			<Route path="/project/edit/:projectId" element={<EditProjectPage />} />
			<Route path="/persons" element={<PersonsPage />} />
			<Route path="/persons/add" element={<AddPersonPage />} />
			<Route path="/persons/edit/:personId" element={<EditPersonPage />} />
		</Switch>
	)
}

export default Routes

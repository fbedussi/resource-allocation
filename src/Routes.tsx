import React from 'react'
import { Route, Routes as Switch } from 'react-router'

import AddCompanyPage from './pages/AddCompanyPage'
import AddPersonPage from './pages/AddPersonPage'
import AddProjectPage from './pages/AddProjectPage'
import CompaniesPage from './pages/CompaniesPage'
import EditCompanyPage from './pages/EditCompanyPage'
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
			<Route path="/person/add" element={<AddPersonPage />} />
			<Route path="/person/edit/:personId" element={<EditPersonPage />} />
			<Route path="/companies" element={<CompaniesPage />} />
			<Route path="/company/add" element={<AddCompanyPage />} />
			<Route path="/company/edit/:companyId" element={<EditCompanyPage />} />
		</Switch>
	)
}

export default Routes

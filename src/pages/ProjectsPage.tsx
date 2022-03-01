import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { useGetProjectsQuery } from '../services/projects'
import { Alert, Fab } from '../styleguide'
import { AddIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'
import LoadingPage from './LoadingPage'

const Projects = styled.div`
	max-width: 1000px;
	padding: ${theme.spacing(2)};
	gap: ${theme.spacing(1)};
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

const ProjectsPage: React.FC = () => {
	const { t } = useTranslation()

	const projects = useGetProjectsQuery()

	const navigate = useNavigate()

	return (
		<>
			<Header title={t('projects.projects')} />

			{projects.isLoading && <LoadingPage />}

			<Projects>
				{projects.error && (
					<Alert severity="error">{t('projects.errorLoadingProjects')}</Alert>
				)}
				{projects.data?.map(project => (
					<ProjectCard
						key={project.id}
						projectId={project.id}
					/>
				))}
			</Projects>

			<Fab color="primary" onClick={() => navigate('/project/add')}>
				<AddIcon />
			</Fab>
		</>
	)
}

export default ProjectsPage

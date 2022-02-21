import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { useDeleteProjectMutation, useGetProjectsQuery } from '../services/projects'
import {
  Alert, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  Fab
} from '../styleguide'
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

	const [deleteProject, deleteProjectResult] = useDeleteProjectMutation()

	const navigate = useNavigate()

	const [deleteAlert, setDeleteAlert] = useState('')
	const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

	useEffect(() => {
		if (deleteProjectResult.status === 'rejected') {
			setDeleteErrorMessage(deleteProjectResult.error.toString())
		}
	}, [deleteProjectResult.status, deleteProjectResult.error])

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
						onDelete={setDeleteAlert}
					/>
				))}
			</Projects>

			<Fab color="primary" onClick={() => navigate('/project/add')}>
				<AddIcon />
			</Fab>

			<Dialog open={!!deleteAlert} onClose={() => setDeleteAlert('')}>
				<DialogContent>
					<DialogContentText>
						{t('projects.confirmDelete', {
							projectName: projects.data?.find(({ id }) => id === deleteAlert)
								?.name,
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteAlert('')}>
						{t('general.dismiss')}
					</Button>
					<Button
						onClick={() => {
							deleteProject(deleteAlert)
							setDeleteAlert('')
						}}
						autoFocus
					>
						{t('general.ok')}
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={!!deleteErrorMessage}
				onClose={() => setDeleteErrorMessage('')}
			>
				<DialogContent>
					<DialogContentText>
						{t('projects.errorDeletingProject', {
							errorMessage: deleteErrorMessage,
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={() => setDeleteErrorMessage('')}>
						{t('general.ok')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ProjectsPage

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router'

import Header from '../components/Header'
import ProjectForm from '../components/ProjectForm'
import { Id } from '../model/model'
import { useEditProjectMutation, useGetProjectQuery } from '../services/projects'
import { Alert } from '../styleguide'
import { Container } from '../styleguide/Container'

const EditProjectPage: React.FC = () => {
	const { projectId } = useParams<{ projectId: Id }>()

	const project = useGetProjectQuery(projectId || '')

	const { t } = useTranslation()

	const dispatch = useDispatch()

	const [editProject, editProjectResult] = useEditProjectMutation()

	return editProjectResult.status === 'fulfilled' ? (
		<Navigate to="/projects" />
	) : (
		<div>
			<Header title={t('projects.editProject')} />
			<Container>
				{!project ? (
					<Alert severity="error">{t('projects.projectNotFound')}</Alert>
				) : (
					<ProjectForm
						project={project}
						onSubmit={project => dispatch(editProject(project))}
					/>
				)}
			</Container>
		</div>
	)
}

export default EditProjectPage

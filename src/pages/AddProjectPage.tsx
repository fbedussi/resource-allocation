import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'

import Header from '../components/Header'
import ProjectForm from '../components/ProjectForm'
import { Project } from '../model/project'
import { useAddProjectMutation } from '../services/projects'
import { selectUserId } from '../store/user/selectors'
import { Container } from '../styleguide/Container'

const emptyProject: Project = {
	id: '',
	name: '',
	status: 'TBD',
	startDate: '',
}

const AddProjectPage: React.FC = () => {
	const { t } = useTranslation()

	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)

	const [addProject, addProjectResult] = useAddProjectMutation()

	return addProjectResult.status === 'fulfilled' ? (
		<Navigate to="/projects" />
	) : (
		<div>
			<Header title={t('projects.addProject')} />
			<Container>
				<ProjectForm
					project={emptyProject}
					onSubmit={project => dispatch(addProject({ ...project, userId }))}
				/>
			</Container>
		</div>
	)
}

export default AddProjectPage

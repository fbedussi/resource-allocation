import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Project } from '../model/project'
import { Button, DatePicker, TextField } from '../styleguide'
import theme from '../styleguide/theme'
import BackButton from './BackButton'
import ProjectStatusSelect from './ProjectStatusSelect'

const AddProjectForm = styled(Form)`
	padding: ${theme.spacing(2)};
	display: grid;
	grid-auto-flow: row;
	gap: ${theme.spacing(1)};
`

const Buttons = styled.div`
	display: flex;
	justify-content: space-around;
`

type Props = {
	project: Project
	onSubmit: (project: Project) => void
}

const ProjectForm: React.FC<Props> = ({ project, onSubmit }) => {
	const { t } = useTranslation()

	return (
		<Formik
			initialValues={project}
			onSubmit={onSubmit}
		>
			{({ isSubmitting }) => (
				<AddProjectForm>
					<Field as={TextField} name="name" label={t('projects.name')} />
					<Field as={ProjectStatusSelect} name="status" />
					<Field
						as={DatePicker}
						label={t('projects.startDate')}
						name="startDate"
					/>

					<Buttons>
						<BackButton />
						<Button
							variant="contained"
							type="submit"
							disabled={isSubmitting}
						>
							{t('general.save')}
						</Button>
					</Buttons>
				</AddProjectForm>
			)}
		</Formik>
	)
}

export default ProjectForm

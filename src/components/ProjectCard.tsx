import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Id } from '../model/model'
import { useGetProjectPersonsQuery } from '../services/persons'
import { useDeleteProjectMutation, useGetProjectQuery } from '../services/projects'
import {
  Button, Card, CardActions,
  CardContent, Chip, ChipRow,
  Dialog, DialogActions, DialogContent,
  DialogContentBoxed, DialogContentText, DialogTitle,
  IconButton, Typography
} from '../styleguide'
import { CloseIcon, DeleteIcon, EditIcon } from '../styleguide/icons'
import PersonCard from './PersonCard'

const Actions = styled(CardActions)`
	justify-content: space-between;
`

type Props = {
	projectId: Id
	onDelete?: (projectId: Id) => void
	allocation?: number
	hideEditButton?: boolean
}

const ProjectCard: React.FC<Props> = ({ projectId, onDelete, allocation, hideEditButton }) => {
	const { t } = useTranslation()
	const project = useGetProjectQuery(projectId)
	const persons = useGetProjectPersonsQuery(projectId)

	const [selectedPersonId, setSelectedPersonId] = useState('')

	const [deleteProject, deleteProjectResult] = useDeleteProjectMutation()

	const [deleteAlert, setDeleteAlert] = useState('')
	const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

	useEffect(() => {
		if (deleteProjectResult.status === 'rejected') {
			setDeleteErrorMessage(deleteProjectResult.error.toString())
		}
	}, [deleteProjectResult.status, deleteProjectResult.error])

	const closePersonDialog = () => setSelectedPersonId('')

	return !project ? <Card /> : (
		<>
			<Card>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{project.status}
					</Typography>
					<Typography variant="h5" component="div">
						{project.name}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{format(new Date(project.startDate), 'd MMMM yyyy')}
					</Typography>
					{allocation && <Typography variant="body2">{allocation}%</Typography>}
					<ChipRow>{t('projects.projectManagers')}: {persons?.filter(({ role }) => role === 'project manager').map(({ name, surname, id }) => <Chip key={id} label={`${name} ${surname}`} onClick={() => setSelectedPersonId(id)} />)}</ChipRow>
					<ChipRow>{t('projects.developers')}: {persons?.filter(({ role }) => role === 'developer').map(({ name, surname, id }) => <Chip key={id} label={`${name} ${surname}`} onClick={() => setSelectedPersonId(id)} />)}</ChipRow>
				</CardContent>
				<Actions>
					{!hideEditButton && <Link to={`/project/edit/${project.id}`}>
						<IconButton size="small">
							<EditIcon />
						</IconButton>
					</Link>}
					<IconButton onClick={() => {
						if (onDelete) {
							onDelete(project.id)
						} else {
							setDeleteAlert(project.id)
						}
					}} size="small">
						<DeleteIcon />
					</IconButton>
				</Actions>
			</Card>

			<Dialog open={!!deleteAlert} onClose={() => setDeleteAlert('')}>
				<DialogContent>
					<DialogContentText>
						{t('projects.confirmDelete', {
							projectName: project.name,
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

			<Dialog open={!!selectedPersonId} onClose={closePersonDialog}>
				<DialogTitle>
					<IconButton
						aria-label="close"
						onClick={closePersonDialog}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContentBoxed>
					{selectedPersonId && <PersonCard personId={selectedPersonId} />}
				</DialogContentBoxed>
			</Dialog>
		</>
	)
}

export default ProjectCard

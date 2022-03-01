import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PieChart } from 'react-minimal-pie-chart'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Id } from '../model/model'
import { useDeletePersonMutation, useGetPersonQuery } from '../services/persons'
import { useGetPersonProjectsQuery } from '../services/projects'
import {
  Avatar, Button, Card,
  CardActions, CardContent, Chip,
  ChipRow, Dialog, DialogActions,
  DialogContent, DialogContentBoxed, DialogContentText,
  DialogTitle, IconButton, Typography
} from '../styleguide'
import { CloseIcon, DeleteIcon, EditIcon } from '../styleguide/icons'
import ProjectCard from './ProjectCard'

const Actions = styled(CardActions)`
	justify-content: space-between;
`

const Chart = styled(PieChart)`
	height: 10vh;
`

const Small = styled.small`
	font-size: 0.5rem;
`

type Props = {
	personId: Id
}

const colors = [
	'maroon',
	'red',
	'purple',
	'fuchsia',
	'green',
	'lime',
	'olive',
	'yellow',
	'navy',
	'blue',
	'teal',
	'aqua',
]

const PersonCard: React.FC<Props> = ({ personId }) => {
	const { t } = useTranslation()

	const person = useGetPersonQuery(personId)
	const projects = useGetPersonProjectsQuery(person)

	const [selectedProjectId, setSelectedProjectId] = useState('')

	const [deleteAlert, setDeleteAlert] = useState('')
	const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

	const [deletePerson, deletePersonResult] = useDeletePersonMutation()

	useEffect(() => {
		if (deletePersonResult.status === 'rejected') {
			setDeleteErrorMessage(deletePersonResult.error.toString())
		}
	}, [deletePersonResult.status, deletePersonResult.error])

	const closeDeleteAlert = () => setDeleteAlert('')

	const closeProjectDialog = () => setSelectedProjectId('')

	return (
		<>
			<Card>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{person?.status}
					</Typography>
					<Typography variant="h5" component="div">
						{person?.name} {person?.surname}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{person?.role}
					</Typography>
					<Chart
						data={projects?.map((project, index) => ({
							title: project.name,
							value: person?.projects.find(({ projectId }) => projectId === project.id)?.allocation || 0,
							color: colors[index],
						}))}
					/>
					<ChipRow>
						{projects?.map(project =>
							<Chip
								key={project.id}
								onClick={() => setSelectedProjectId(project.id)}
								label={project.name}
								avatar={<Avatar>
									{person?.projects
										.find(({ projectId }) => projectId === project.id)?.allocation}<Small>%</Small>
								</Avatar>
								} />
						)}
					</ChipRow>
					{!!person?.externalCompany && <Typography variant="body2">{person?.externalCompany}</Typography>}
				</CardContent>
				<Actions>
					<Link to={`/persons/edit/${personId}`}>
						<IconButton size="small">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={() => setDeleteAlert && setDeleteAlert(personId)} size="small">
						<DeleteIcon />
					</IconButton>
				</Actions>
			</Card>

			<Dialog open={!!deleteAlert} onClose={closeDeleteAlert}>
				<DialogContent>
					<DialogContentText>
						{t('persons.confirmDelete', {
							name: person?.name,
							surname: person?.surname,
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDeleteAlert}>
						{t('general.dismiss')}
					</Button>
					<Button
						onClick={() => {
							deletePerson(deleteAlert)
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
						{t('persons.errorDeletingPerson', {
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

			<Dialog open={!!selectedProjectId} onClose={closeProjectDialog}>
				<DialogTitle>
					<IconButton
						aria-label="close"
						onClick={closeProjectDialog}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContentBoxed>
					{selectedProjectId && <ProjectCard projectId={selectedProjectId} />}
				</DialogContentBoxed>
			</Dialog>
		</>
	)
}

export default PersonCard

import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Id } from '../model/model'
import { Project } from '../model/project'
import { useGetProjectQuery } from '../services/projects'
import {
  Card, CardActions, CardContent,
  IconButton, Typography
} from '../styleguide'
import { DeleteIcon, EditIcon } from '../styleguide/icons'

const Actions = styled(CardActions)`
	justify-content: space-between;
`

type Props = {
	projectId: Id
	onDelete: (projectId: Id) => void
	allocation?: number
	hideEditButton?: boolean
}

const ProjectCard: React.FC<Props> = ({ projectId, onDelete, allocation, hideEditButton }) => {
	const project = useGetProjectQuery(projectId)

	return !project ? <Card /> : (
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
			</CardContent>
			<Actions>
				{!hideEditButton && <Link to={`/project/edit/${project.id}`}>
					<IconButton size="small">
						<EditIcon />
					</IconButton>
				</Link>}
				<IconButton onClick={() => onDelete(project.id)} size="small">
					<DeleteIcon />
				</IconButton>
			</Actions>
		</Card>
	)
}

export default ProjectCard

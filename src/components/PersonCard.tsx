import { format } from 'date-fns'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getRandomColor } from '../libs/styles'
import { Id } from '../model/model'
import { Person } from '../model/person'
import { useGetPersonProjectsQuery } from '../services/projects'
import {
  Avatar, Card, CardActions,
  CardContent, IconButton, Typography
} from '../styleguide'
import { DeleteIcon, EditIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'

const Actions = styled(CardActions)`
	justify-content: space-between;
`

const Chart = styled(PieChart)`
	height: 10vh;
`

type Props = {
	person: Person
	setDeleteAlert: (id: Id) => void
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

const PersonCard: React.FC<Props> = ({ person, setDeleteAlert }) => {
	const projects = useGetPersonProjectsQuery(person)

	return (
		<Card>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{person.status}
				</Typography>
				<Typography variant="h5" component="div">
					{person.name} {person.surname}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{person.role}
				</Typography>
				<Chart
					data={projects?.map((project, index) => ({
						title: project.name,
						value: person.projects.find(({ projectId }) => projectId === project.id)?.allocation || 0,
						color: colors[index],
					}))}
				/>
				<ul>
					{projects?.map(project =>
						<li>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{project.name} {person.projects
									.find(({ projectId }) => projectId === project.id)?.allocation}%
							</Typography>
						</li>
					)}
				</ul>
				{!!person.externalCompany && <Typography variant="body2">{person.externalCompany}</Typography>}
			</CardContent>
			<Actions>
				<Link to={`/persons/edit/${person.id}`}>
					<IconButton size="small">
						<EditIcon />
					</IconButton>
				</Link>
				<IconButton onClick={() => setDeleteAlert(person.id)} size="small">
					<DeleteIcon />
				</IconButton>
			</Actions>
		</Card>
	)
}

export default PersonCard

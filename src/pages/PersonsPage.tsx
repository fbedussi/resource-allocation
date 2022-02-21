import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import PersonCard from '../components/PersonCard'
import { useDeletePersonMutation, useGetPersonsQuery } from '../services/persons'
import {
  Alert, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  Fab
} from '../styleguide'
import { AddIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'
import LoadingPage from './LoadingPage'

const Persons = styled.div`
	max-width: 1000px;
	padding: ${theme.spacing(2)};
	gap: ${theme.spacing(1)};
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

const PersonsPage: React.FC = () => {
	const { t } = useTranslation()

	const persons = useGetPersonsQuery()

	const [deletePerson, deletePersonResult] = useDeletePersonMutation()

	const navigate = useNavigate()

	const [deleteAlert, setDeleteAlert] = useState('')
	const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

	useEffect(() => {
		if (deletePersonResult.status === 'rejected') {
			setDeleteErrorMessage(deletePersonResult.error.toString())
		}
	}, [deletePersonResult.status, deletePersonResult.error])

	return (
		<>
			<Header title={t('persons.persons')} />

			{persons.isLoading && <LoadingPage />}

			<Persons>
				{persons.error && (
					<Alert severity="error">{t('persons.errorLoadingPersons')}</Alert>
				)}
				{persons.data?.map(person => (
					<PersonCard
						key={person.id}
						person={person}
						setDeleteAlert={setDeleteAlert}
					/>
				))}
			</Persons>

			<Fab color="primary" onClick={() => navigate('/persons/add')}>
				<AddIcon />
			</Fab>

			<Dialog open={!!deleteAlert} onClose={() => setDeleteAlert('')}>
				<DialogContent>
					<DialogContentText>
						{t('persons.confirmDelete', {
							name: persons.data?.find(({ id }) => id === deleteAlert)
								?.name,
							surnname: persons.data?.find(({ id }) => id === deleteAlert)
								?.surname,
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteAlert('')}>
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
		</>
	)
}

export default PersonsPage

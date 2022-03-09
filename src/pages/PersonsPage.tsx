import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import PersonCard from '../components/PersonCard'
import { useGetPersonsQuery } from '../services/persons'
import { Alert, Fab } from '../styleguide'
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

	const navigate = useNavigate()

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
						personId={person.id}
					/>
				))}
			</Persons>

			<Fab color="primary" onClick={() => navigate('/person/add')}>
				<AddIcon />
			</Fab>
		</>
	)
}

export default PersonsPage

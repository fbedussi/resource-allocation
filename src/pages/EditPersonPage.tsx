import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router'

import Header from '../components/Header'
import PersonForm from '../components/PersonForm'
import { Id } from '../model/model'
import { useEditPersonMutation, useGetPersonQuery } from '../services/persons'
import { Alert } from '../styleguide'
import { Container } from '../styleguide/Container'

const EditPersonPage: React.FC = () => {
	const { personId } = useParams<{ personId: Id }>()

	const person = useGetPersonQuery(personId || '')

	const { t } = useTranslation()

	const dispatch = useDispatch()

	const [editPerson, editPersonResult] = useEditPersonMutation()

	return editPersonResult.status === 'fulfilled' ? (
		<Navigate to="/persons" />
	) : (
		<div>
			<Header title={t('persons.editPerson')} />
			<Container>
				{!person ? (
					<Alert severity="error">{t('persons.personNotFound')}</Alert>
				) : (
					<PersonForm
						person={person}
						onSubmit={person => dispatch(editPerson(person))}
					/>
				)}
			</Container>
		</div>
	)
}

export default EditPersonPage

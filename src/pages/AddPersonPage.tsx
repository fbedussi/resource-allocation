import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router'

import Header from '../components/Header'
import PersonForm from '../components/PersonForm'
import { Person } from '../model/person'
import { useAddPersonMutation } from '../services/persons'
import { Container } from '../styleguide/Container'

const emptyPerson: Person = {
	id: '',
	name: '',
	surname: '',
	role: '',
	projects: [],
	status: 'incoming',
}

const AddPersonPage: React.FC = () => {
	const { t } = useTranslation()

	const dispatch = useDispatch()

	const [addPerson, addPersonResult] = useAddPersonMutation()

	return addPersonResult.status === 'fulfilled' ? (
		<Navigate to="/persons" />
	) : (
		<div>
			<Header title={t('persons.addPerson')} />
			<Container>
				<PersonForm
					person={emptyPerson}
					onSubmit={person => dispatch(addPerson(person))}
				/>
			</Container>
		</div>
	)
}

export default AddPersonPage

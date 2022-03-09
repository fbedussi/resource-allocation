import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router'

import CompanyForm from '../components/CompanyForm'
import Header from '../components/Header'
import { Company } from '../model/company'
import { useAddCompanyMutation } from '../services/companies'
import { Container } from '../styleguide/Container'

const emptyCompany: Company = {
	id: '',
	name: '',
	contactName: '',
	active: false,
}

const AddCompanyPage: React.FC = () => {
	const { t } = useTranslation()

	const dispatch = useDispatch()

	const [addCompany, addCompanyResult] = useAddCompanyMutation()

	return addCompanyResult.status === 'fulfilled' ? (
		<Navigate to="/companies" />
	) : (
		<div>
			<Header title={t('companies.addCompany')} />
			<Container>
				<CompanyForm
					company={emptyCompany}
					onSubmit={company => dispatch(addCompany(company))}
				/>
			</Container>
		</div>
	)
}

export default AddCompanyPage

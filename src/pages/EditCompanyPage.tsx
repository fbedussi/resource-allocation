import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router'

import CompanyForm from '../components/CompanyForm'
import Header from '../components/Header'
import { Id } from '../model/model'
import { useEditCompanyMutation, useGetCompanyQuery } from '../services/companies'
import { Alert } from '../styleguide'
import { Container } from '../styleguide/Container'

const EditCompanyPage: React.FC = () => {
	const { companyId } = useParams<{ companyId: Id }>()

	const company = useGetCompanyQuery(companyId || '')

	const { t } = useTranslation()

	const dispatch = useDispatch()

	const [editCompany, editCompanyResult] = useEditCompanyMutation()

	return editCompanyResult.status === 'fulfilled' ? (
		<Navigate to="/companies" />
	) : (
		<div>
			<Header title={t('companies.editCompany')} />
			<Container>
				{!company ? (
					<Alert severity="error">{t('companies.companyNotFound')}</Alert>
				) : (
					<CompanyForm
						company={company}
						onSubmit={company => dispatch(editCompany(company))}
					/>
				)}
			</Container>
		</div>
	)
}

export default EditCompanyPage

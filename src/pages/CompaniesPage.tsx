import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import CompanyCard from '../components/CompanyCard'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { useGetCompaniesQuery } from '../services/companies'
import { useGetProjectsQuery } from '../services/projects'
import { Alert, Fab } from '../styleguide'
import { AddIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'
import LoadingPage from './LoadingPage'

const Companies = styled.div`
	max-width: 1000px;
	padding: ${theme.spacing(2)};
	gap: ${theme.spacing(1)};
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

const CompaniesPage: React.FC = () => {
	const { t } = useTranslation()

	const companies = useGetCompaniesQuery()

	const navigate = useNavigate()

	return (
		<>
			<Header title={t('companies.companies')} />

			{companies.isLoading && <LoadingPage />}

			<Companies>
				{companies.error && (
					<Alert severity="error">{t('companies.errorLoadingCompanies')}</Alert>
				)}
				{companies.data?.map(company => (
					<CompanyCard
						key={company.id}
						companyId={company.id}
					/>
				))}
			</Companies>

			<Fab color="primary" onClick={() => navigate('/company/add')}>
				<AddIcon />
			</Fab>
		</>
	)
}

export default CompaniesPage

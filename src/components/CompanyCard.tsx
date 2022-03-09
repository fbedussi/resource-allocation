import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Id } from '../model/model'
import { useDeleteCompanyMutation, useGetCompanyQuery } from '../services/companies'
import {
  Button, Card, CardActions,
  CardContent, ChipRow, Dialog,
  DialogActions, DialogContent, DialogContentText,
  IconButton, Typography
} from '../styleguide'
import {
  CheckCircleOutlineIcon, DeleteIcon, EditIcon,
  HighlightOffIcon
} from '../styleguide/icons'

const Actions = styled(CardActions)`
	justify-content: space-between;
`

type Props = {
	companyId: Id
	onDelete?: (companyId: Id) => void
	hideEditButton?: boolean
}

const CompanyCard: React.FC<Props> = ({ companyId, onDelete, hideEditButton }) => {
	const { t } = useTranslation()
	const company = useGetCompanyQuery(companyId)

	const [deleteCompany, deleteCompanyResult] = useDeleteCompanyMutation()

	const [deleteAlert, setDeleteAlert] = useState('')
	const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

	useEffect(() => {
		if (deleteCompanyResult.status === 'rejected') {
			setDeleteErrorMessage(deleteCompanyResult.error.toString())
		}
	}, [deleteCompanyResult.status, deleteCompanyResult.error])

	return !company ? <Card /> : (
		<>
			<Card>
				<CardContent>
					<Typography variant="h5" component="div">
						{company.name}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{company.contactName}
					</Typography>
					<ChipRow>{company.active ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}</ChipRow>
				</CardContent>
				<Actions>
					{!hideEditButton && <Link to={`/company/edit/${company.id}`}>
						<IconButton size="small">
							<EditIcon />
						</IconButton>
					</Link>}
					<IconButton onClick={() => {
						if (onDelete) {
							onDelete(company.id)
						} else {
							setDeleteAlert(company.id)
						}
					}} size="small">
						<DeleteIcon />
					</IconButton>
				</Actions>
			</Card>

			<Dialog open={!!deleteAlert} onClose={() => setDeleteAlert('')}>
				<DialogContent>
					<DialogContentText>
						{t('companies.confirmDelete', {
							companyName: company.name,
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteAlert('')}>
						{t('general.dismiss')}
					</Button>
					<Button
						onClick={() => {
							deleteCompany(deleteAlert)
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
						{t('companies.errorDeletingCompany', {
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

export default CompanyCard

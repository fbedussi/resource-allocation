import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from '../styleguide'

const BackButton: React.FC = () => {
	const navigation = useNavigate()

	const { t } = useTranslation()

	return (
		<Button
			onClick={() => {
				navigation(-1)
			}}
		>
			{t('general.back')}
		</Button>
	)
}

export default BackButton

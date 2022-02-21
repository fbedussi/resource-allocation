import React from 'react'
import { useTranslation } from 'react-i18next'

import { MenuItem, Select } from '../styleguide'

const ProjectStatusSelect: React.FC = props => {
  const { t } = useTranslation()

  return (
    <Select {...props} label={t('projects.status')}>
      <MenuItem value="TBD">{t('projects.tbd')}</MenuItem>
      <MenuItem value="discovery">{t('projects.discovery')}</MenuItem>
      <MenuItem value="in progress">{t('projects.inProgress')}</MenuItem>
    </Select>
  )
}

export default ProjectStatusSelect

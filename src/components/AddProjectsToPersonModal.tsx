import { Form } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Id } from '../model/model'
import { Person } from '../model/person'
import { useGetProjectsQuery } from '../services/projects'
import {
  Alert, Button, Dialog,
  DialogActions, DialogContent, DialogTitle,
  InputLabel, List, MenuItem,
  Select
} from '../styleguide'
import theme from '../styleguide/theme'
import AddProjectRow from './AddProjectRow'

type Props = {
  person: Person
  open: boolean
  onClose: () => void
  addProjectToPerson?: ({ projectId, allocation }: { projectId: Id, allocation: number }) => void
}

const AddProjectsToPersonModal: React.FC<Props> = ({ person, open, onClose, addProjectToPerson }) => {
  const { t } = useTranslation()

  const projects = useGetProjectsQuery()
  const personsProjectsIds = person.projects.map(({ projectId }) => projectId)
  const availableProjects = projects.data?.filter(project => !personsProjectsIds.includes(project.id)) || []

  return (
    <Dialog open={open} >
      <DialogTitle>{t('persons.addPersonToProject', { personName: person.name })}</DialogTitle>
      <DialogContent>
        {!availableProjects.length && <Alert severity="warning">{t('persons.noAvailableProjects')}</Alert>}
        <List sx={{ pt: 0 }}>
          {availableProjects.map(project =>
            <AddProjectRow key={project.id} project={project} addProject={addProjectToPerson} />
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {t('general.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectsToPersonModal

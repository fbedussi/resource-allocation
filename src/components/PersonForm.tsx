import {
  Field, FieldArray, Form,
  Formik
} from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import BackButton from '../components/BackButton'
import { Person } from '../model/person'
import {
  Button, IconButton, InputLabel,
  MenuItem, Select, TextField
} from '../styleguide'
import { AddIcon } from '../styleguide/icons'
import theme from '../styleguide/theme'
import AddProjectsToPersonModal from './AddProjectsToPersonModal'
import ProjectCard from './ProjectCard'

const RoleSelect: React.FC = props => {
  const { t } = useTranslation()

  return (
    <Select {...props} label={t('persons.role')}>
      <MenuItem value="developer">{t('persons.developer')}</MenuItem>
      <MenuItem value="prject manager">{t('persons.projectManager')}</MenuItem>
    </Select>
  )
}

const StatusSelect: React.FC = props => {
  const { t } = useTranslation()

  return (
    <Select {...props} label={t('persons.status')}>
      <MenuItem value="incoming">{t('persons.incoming')}</MenuItem>
      <MenuItem value="onduty">{t('persons.onduty')}</MenuItem>
      <MenuItem value="outgoing">{t('persons.outgoing')}</MenuItem>
      <MenuItem value="resigned">{t('persons.resigned')}</MenuItem>
    </Select>
  )
}

const AddPersonForm = styled(Form)`
	padding: ${theme.spacing(2)};
	display: grid;
	grid-auto-flow: row;
	gap: ${theme.spacing(1)};
`

const ProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled(InputLabel)`
  text-transform: capitalize;  
`

const Buttons = styled.div`
	display: flex;
	justify-content: space-around;
`

type Props = {
  person: Person
  onSubmit: (person: Person) => void
}

const PersonForm: React.FC<Props> = ({ person, onSubmit }) => {
  const { t } = useTranslation()

  const [showAddProjectModal, setShowAddProjectModal] = useState(false)

  const pushToProjectsRef = useRef<((obj: any) => void) | undefined>()

  return (
    <Formik
      initialValues={person}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <>
          <AddPersonForm>
            <Field as={TextField} name="name" label={t('persons.name')} />

            <Field as={TextField} name="surname" label={t('persons.surname')} />

            <Field as={RoleSelect} name="role" />

            <Field as={StatusSelect} name="status" />

            <Field as={TextField} name="externalCompany" label={t('persons.externalCompany')} />

            <ProjectsHeader>
              <Label>{t('persons.projects')}</Label>
              <IconButton size="small" onClick={() => setShowAddProjectModal(true)}>
                <AddIcon />
              </IconButton>
            </ProjectsHeader>
            <FieldArray name="projects">
              {({ remove, push }) => values.projects.map(({ projectId, allocation }, index) => {
                pushToProjectsRef.current = push
                return (
                  <ul key={projectId}>
                    <li>
                      <ProjectCard projectId={projectId} allocation={allocation} onDelete={() => remove(index)} hideEditButton={true} />
                    </li>
                  </ul>
                )
              })}
            </FieldArray>

            <Buttons>
              <BackButton />
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                {t('general.save')}
              </Button>
            </Buttons>
          </AddPersonForm>

          <AddProjectsToPersonModal
            open={showAddProjectModal}
            person={values}
            onClose={() => setShowAddProjectModal(false)}
            addProjectToPerson={pushToProjectsRef.current}
          />
        </>
      )}
    </Formik>

  )
}

export default PersonForm

import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import BackButton from '../components/BackButton'
import { Id } from '../model/model'
import { Person } from '../model/person'
import { useGetProjectsQuery } from '../services/projects'
import {
  Button, MenuItem, Select,
  TextField
} from '../styleguide'
import theme from '../styleguide/theme'

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

  const { data } = useGetProjectsQuery()

  return (
    <Formik
      initialValues={person}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <AddPersonForm>
          <Field as={TextField} name="name" label={t('persons.name')} />
          <Field as={TextField} name="surname" label={t('persons.surname')} />
          <Field as={RoleSelect} name="role" />
          <Field as={StatusSelect} name="status" />
          <Field as={TextField} name="externalCompany" label={t('persons.externalCompany')} />
          {person.projects.map(({ projectId, allocation }) => (
            <ul>
              <li>

              </li>
            </ul>
          ))}

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
      )}
    </Formik>
  )
}

export default PersonForm

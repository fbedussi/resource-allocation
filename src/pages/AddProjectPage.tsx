import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import styled from 'styled-components'

import Header from '../components/Header'
import { Project } from '../model/project'
import { useAddProjectMutation } from '../services/projects'
import { selectUserId } from '../store/user/selectors'
import {
  Button, DatePicker, MenuItem,
  Select, TextField
} from '../styleguide'
import { Container } from '../styleguide/Container'
import theme from '../styleguide/theme'

const StatusSelect: React.FC = (props) => {
  const { t } = useTranslation()

  return (
    <Select
      {...props}
      label={t('projects.status')}
    >
      <MenuItem value="TBD">{t('projects.tbd')}</MenuItem>
      <MenuItem value="discovery">{t('projects.discovery')}</MenuItem>
      <MenuItem value="in progress">{t('projects.inProgress')}</MenuItem>
    </Select>
  )
}

const AddProjectForm = styled(Form)`
  padding: ${theme.spacing(2)};
  display: grid;
  grid-auto-flow: row;
  gap: ${theme.spacing(1)};
`

const emptyProject: Omit<Project, 'id'> = {
  name: 'aa',
  status: 'TBD',
  startDate: '',
}

const AddProjectPage: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)

  const [addProject, addProjectResult] = useAddProjectMutation()

  return addProjectResult.status === 'fulfilled' ? <Navigate to="/projects" /> : (
    <div>
      <Header title={t('projects.addProject')} />
      <Container>
        <Formik
          initialValues={emptyProject}
          onSubmit={(project) => dispatch(addProject({ ...project, userId }))}
        >
          {({ isSubmitting }) => (
            <AddProjectForm>
              <Field as={TextField} name="name" label={t('projects.name')} />
              <Field as={StatusSelect} name="status" />
              <Field as={DatePicker} label={t('projects.startDate')} name="startDate" />

              <Button type="submit" disabled={isSubmitting}>
                {t('projects.createProject')}
              </Button>
            </AddProjectForm>
          )}
        </Formik>
      </Container>
    </div>
  )
}

export default AddProjectPage

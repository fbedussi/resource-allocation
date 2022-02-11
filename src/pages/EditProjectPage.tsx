import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router'
import styled from 'styled-components'

import Header from '../components/Header'
import { Id } from '../model/model'
import { useEditProjectMutation, useGetProjectQuery } from '../services/projects'
import { selectUserId } from '../store/user/selectors'
import {
  Alert, Button, DatePicker,
  MenuItem, Select, TextField
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

const EditProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: Id }>()

  const userId = useSelector(selectUserId)

  const project = useGetProjectQuery(projectId || '', userId)

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [editProject, editProjectResult] = useEditProjectMutation()

  return editProjectResult.status === 'fulfilled' ? <Navigate to="/projects" /> : (
    <div>
      <Header title={t('projects.editProject')} />
      <Container>
        {!project ? <Alert severity="error">{t('projects.projectNotFound')}</Alert> : (
          <Formik
            initialValues={project}
            onSubmit={(project) => dispatch(editProject(project))}
          >
            {({ isSubmitting }) => (
              <AddProjectForm>
                <Field as={TextField} name="name" label={t('projects.name')} />
                <Field as={StatusSelect} name="status" />
                <Field as={DatePicker} label={t('projects.startDate')} name="startDate" />

                <Button type="submit" disabled={isSubmitting}>
                  {t('general.save')}
                </Button>
              </AddProjectForm>
            )}
          </Formik>
        )}
      </Container>
    </div>
  )
}

export default EditProjectPage

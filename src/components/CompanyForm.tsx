import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Company } from '../model/company'
import { Button, Checkbox, TextField } from '../styleguide'
import theme from '../styleguide/theme'
import BackButton from './BackButton'

const AddCompanyForm = styled(Form)`
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
  company: Company
  onSubmit: (company: Company) => void
}

const CompanyForm: React.FC<Props> = ({ company, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={company}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <AddCompanyForm>
            <Field as={TextField} name="name" label={t('companies.name')} />

            <Field as={TextField} name="contactName" label={t('companies.contactName')} />

            <Field as={Checkbox} name="active" label={t('companies.active')} />

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
          </AddCompanyForm>
        </>
      )}
    </Formik>
  )
}

export default CompanyForm

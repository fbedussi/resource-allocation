import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import { Button, ButtonGroup } from '../styleguide'

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  place-items: center;
  height: 100%;
`

const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Header title="ARA" hideHomeIcon />
      <ButtonGroup
        orientation="vertical"
        variant="contained"
      >
        <Button><Link to="/projects">{t('projects.projects')}</Link></Button>
        <Button><Link to="/persons">{t('persons.persons')}</Link></Button>
        <Button><Link to="/companies">{t('companies.companies')}</Link></Button>
      </ButtonGroup>
    </Wrapper>
  )
}

export default HomePage

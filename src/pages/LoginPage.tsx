import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import userActions from '../store/user/actions'
import { Button, TextField } from '../styleguide'
import theme from '../styleguide/theme'

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing(2)};
  height: 100%;
  margin: 0 auto;
  max-width: 400px;
`

const LoginPage: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  return (
    <Wrapper onSubmit={e => {
      e.preventDefault()
      const inputs = [].filter.call(e.currentTarget, (e: HTMLElement) => e.tagName.toLowerCase() === 'input') as HTMLInputElement[]
      dispatch(userActions.login({ email: inputs[0]?.value, password: inputs[1]?.value }))
    }}>
      <TextField label={t('login.username')} />
      <TextField label={t('login.password')} type="password" />
      <Button type="submit">{t('login.login')}</Button>
    </Wrapper>
  )
}

export default LoginPage

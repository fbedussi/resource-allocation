import styled from 'styled-components'

import { DialogTitle as DialogTitleMui } from '@mui/material'

import theme from './theme'

export const DialogTitle = styled(DialogTitleMui)`
	text-align: right;
	padding-top: ${({ theme }) => theme.spacing(1)};
	padding-bottom: ${({ theme }) => theme.spacing(1)};
`

import styled from 'styled-components'

import { Fab as FabMui } from '@mui/material'

import theme from './theme'

export const Fab = styled(FabMui)`
	&& {
		position: fixed;
		right: ${theme.spacing(2)};
		bottom: ${theme.spacing(2)};
	}
`

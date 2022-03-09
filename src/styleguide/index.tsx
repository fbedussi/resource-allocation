import styled from 'styled-components'

export * from '@mui/material'
export { LocalizationProvider } from './LocalizationProvider'
export { LoadingButton } from '@mui/lab'
export { Container } from './Container'
export { Fab } from './Fab'
export { DatePicker } from './DatePicker'
export { StylesProvider } from '@mui/styles'
export { DialogTitle } from './DialogTitle'
export { Checkbox } from './Checkbox'

export const DialogContentBoxed = styled.div`
  width: min(90vw, 400px);
`

export const ChipRow = styled.div`
	padding: ${({ theme }) => theme.spacing(1)} 0;
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing(1)};
`



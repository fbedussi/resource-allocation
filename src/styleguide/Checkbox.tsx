import { Checkbox as CheckboxMui, CheckboxProps, FormControlLabel } from '@mui/material'

type Props = CheckboxProps & { label: string }

export const Checkbox: React.FC<Props> = ({ label, ...props }) => <FormControlLabel control={<CheckboxMui {...props} />} label={label} />

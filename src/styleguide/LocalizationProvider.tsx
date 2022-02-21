import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProviderMui from '@mui/lab/LocalizationProvider'

export const LocalizationProvider: React.FC = ({ children }) => (
	<LocalizationProviderMui dateAdapter={AdapterDateFns}>
		{children}
	</LocalizationProviderMui>
)

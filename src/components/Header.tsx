import React from 'react'
import { Link } from 'react-router-dom'

import {
  AppBar, IconButton, Toolbar,
  Typography
} from '../styleguide'
import { HomeIcon, MenuIcon } from '../styleguide/icons'

type Props = {
	title: string
	hideHomeIcon?: boolean
}

const Header: React.FC<Props> = ({ title, hideHomeIcon }) => {
	return (
		<AppBar position="static">
			<Toolbar>
				{!hideHomeIcon && <Link to="/">
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<HomeIcon />
					</IconButton>
				</Link>}

				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, textTransform: 'capitalize' }}
				>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header

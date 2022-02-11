import React from 'react'

import {
  AppBar, IconButton, Toolbar,
  Typography
} from '../styleguide'
import { MenuIcon } from '../styleguide/icons'

type Props = {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header

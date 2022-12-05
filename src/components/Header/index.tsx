import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { AppBar } from '../../helpers/Header';

interface IProps {
  handleDrawerOpen: () => void;
  open: boolean;
}

const Header = (props: IProps) => {
  const { open, handleDrawerOpen } = props;

  return (
    <AppBar
      position="fixed"
      open={open}
    >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Projetos
          </Typography>

        </Toolbar>
      </AppBar>
  );
}

export default Header;

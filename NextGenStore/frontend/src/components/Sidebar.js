import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';

// Sidebar component for navigation
function Sidebar({ toggleDrawer, drawerState }) {
  const navigate = useNavigate();

  // Generates the list inside the drawer
  const list = (anchor) => (
    <>
      <Box
        sx={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
          position: 'relative',
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {/* Spacer */}
          <Box sx={{ height: 30 }} />

          {/* List of navigation items */}
          {[
            { n: 'Home', I: <HomeIcon />, L: '/home' },
            { n: 'Orders', I: <LocalShippingIcon />, L: '/orders' },
            { n: 'Cart', I: <ShoppingCartIcon />, L: '/cart' },
          ].map(({ n, I, L }) => (
            <span key={n}>
              {/* Spacer */}
              <Box sx={{ height: 20 }} />

              {/* Navigation item */}
              <ListItem
                button
                key={n}
                onClick={() => {
                  console.log(`Navigating to ${n}`);
                  navigate(L);
                }}
              >
                <ListItemIcon style={{ color: '#071c29' }}>{I}</ListItemIcon>
                <ListItemText primary={n} />
              </ListItem>
            </span>
          ))}

          {/* Spacer */}
          <Box sx={{ height: 20 }} />

          {/* Divider */}
          <Divider />
        </List>
      </Box>

      {/* Footer - Copyright information */}
      <ListItem sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <Copyright style={{ width: '100%', margin: '0 auto' }} />
      </ListItem>
    </>
  );

  return (
    <Drawer
      anchor="left"
      open={drawerState.left}
      onClose={toggleDrawer('left', false)}
    >
      {list('left')}
    </Drawer>
  );
}

export default Sidebar;
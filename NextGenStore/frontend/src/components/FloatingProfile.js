import * as React from 'react';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { store } from '../state/store.state';
import { Stack } from '@mui/material';

// FloatingProfile: A component to display user's profile information in a floating list
export default function FloatingProfile() {
  // Fetching authentication information from the global state
  const { auth } = store.getState();

  return (
    <List
      className="floatingprofile__main"
      sx={{
        width: '260px',
        maxWidth: 260,
        bgcolor: 'background.paper',
        minHeight: '5vh',
        paddingTop: '20px',
      }}
    >
      <Stack>
        {/* Displaying user avatar */}
        <Avatar
          alt={`${auth.user.firstName}`}
          src=" "  // Source is intentionally left blank
          sx={{ width: '60px', height: '60px', margin: '0 auto' }}
        />

        {/* User's Full Name; shown only if auth token exists */}
        <Typography
          sx={{ display: 'inline', mt: 2 }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {auth.token ? `${auth.user.firstName} ${auth.user.lastName}` : null}
        </Typography>

        {/* Displaying user's location */}
        <Typography
          sx={{ display: 'inline', fontSize: '0.7rem', mb: 2 }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          India
        </Typography>
      </Stack>
    </List>
  );
}
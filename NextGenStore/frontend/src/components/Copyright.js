import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

// This component is used to display the copyright notice at the bottom of the page.
function Copyright(props) {
  // Current year is dynamically obtained using new Date().getFullYear()
  const currentYear = new Date().getFullYear();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      <Link
        color="#071c29"
        href="/"
      >
        NextGenStore
      </Link>{" "}
      {currentYear}
      {"."}
    </Typography>
  );
}

export default Copyright;
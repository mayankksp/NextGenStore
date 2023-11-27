import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { Switch } from "@mui/material";

// Set the initial mode to light.
var mode = "light";

// Create a theme with the mode and specific color palette.
export const theme = createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#071c29",
    },
    secondary: {
      main: green[500],
    },
  },
});

// Styled component for the switch with custom colors.
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#333",
    "&:hover": {
      backgroundColor: alpha("#333", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#333",
  },
}));

// Component for toggling the theme.
function ThemeSwitch() {
  const [checked, setChecked] = React.useState(false);

  // Effect to update the mode based on the switch state.
  React.useEffect(() => {
    mode = checked ? "dark" : "light";
  }, [checked]);

  // Handler for switch changes.
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Render the switch with controlled state.
  return (
    <div>
      <GreenSwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
}

export default ThemeSwitch;
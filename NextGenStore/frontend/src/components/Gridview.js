import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "./Card";

// GridView component: Displays products in a grid layout
export default function GridView({ products }) {
  // Return a Box component with Grid inside. The Box acts as a container with padding.
  return (
    <Box sx={{ flexGrow: 1, padding: "1rem 20rem" }}>
      {/* Grid container with responsive spacing and columns */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }} // Spacing: 2 on extra-small screens, 4 on medium and larger screens
        columns={{ xs: 4, sm: 4, md: 12 }} // Column count: 4 on extra-small and small screens, 12 on medium and larger screens
      >
        {/* Map through the products array to render each product */}
        {products?.map((product, index) => (
          // Card component for each product, with a unique key
          <Card product={product} key={index} />
        ))}
      </Grid>
    </Box>
  );
}
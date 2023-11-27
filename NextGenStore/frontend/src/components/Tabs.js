// Importing necessary modules and components from React, Material-UI, Redux, and local files
import * as React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import GridView from "./Gridview";
import Footer from "./Footer";
import { useAction } from "../state/actions/index.action";

// BasicTabs functional component definition
export default function BasicTabs() {
  // Accessing the 'getProducts' action from the custom hook 'useAction'
  const { getProducts } = useAction();

  // useEffect hook to fetch products on component mount
  React.useEffect(() => {
    getProducts(); // Fetches the products from the backend
    // eslint-disable-next-line
  }, []); // Dependency array is empty, so this runs only once after the initial render

  // useSelector hook to access 'products' state from the Redux store
  const products = useSelector((state) => state?.products?.products);

  // Component render
  return (
    <>
      {/* Box component from Material-UI as a container */}
      <Box sx={{ width: "100%", minHeight: "90vh" }} className="tabs">
        {/* Conditional rendering of GridView only if 'products' is an array */}
        {Array.isArray(products) && <GridView products={products} />}
        {/* Footer component */}
        <Footer/>
      </Box>
    </>
  );
}

// PropTypes (if needed) can be defined below to ensure the props passed to 'BasicTabs' are of correct type
BasicTabs.propTypes = {
  // Define prop types here
};
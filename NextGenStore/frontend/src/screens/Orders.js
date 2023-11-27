import React, { useState, useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

// Importing local assets and components
import emptyOrder from '../assets/order_status.svg';
import Copyright from '../components/Copyright';
import OrderItem from '../components/OrderItems';
import EmptyContainer from '../components/EmptyContainer';

// Importing actions and store from state management
import { useAction } from '../state/actions/index.action';
import { store } from '../state/store.state';
import Footer from '../components/Footer';

function Orders() {
  // Using the useAction hook to access actions
  const { getOrders } = useAction();

  // Accessing authentication state
  const { auth } = store.getState();

  // Selector for accessing ordered items from the Redux store
  const orderedItems = useSelector((state) => state?.orders?.orderedItems);

  // State for managing products
  const [products, setProducts] = useState([]);

  // Effect for initial setup and fetching orders
  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders(); // Fetching orders

    // eslint-disable-next-line
  }, [auth]);

  // Effect for updating products state when orderedItems changes
  useEffect(() => {
    let isMounted = true; // Flag to check if component is mounted

    const updateProducts = () => {
      if (isMounted && orderedItems.length > 0) {
        const prods = orderedItems
          .slice()
          .reverse()
          .flatMap(({ product, timeStamp, orderId }) =>
            product.map(prod => ({ ...prod, timeStamp, orderId }))
          );

        setProducts(prods);
      }
    };

    updateProducts();

    // Clean-up function
    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line
  }, [orderedItems]);

  return (
    <>
      <Container sx={{ paddingTop: '20vh', minHeight: '80vh', width: '42vw' }}>
        <Stack sx={{ width: '90%', margin: '0 auto' }}>
          {products.length > 0 ? (
            products.map((prod, index) => (
              <OrderItem product={prod} key={index} />
            ))
          ) : (
            <EmptyContainer
              img={emptyOrder}
              typographies={{
                message: 'No order summary.',
                buttonText: 'Start your order.',
              }}
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

export default Orders;
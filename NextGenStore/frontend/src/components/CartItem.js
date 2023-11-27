import React from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { AddCircle, RemoveCircle, CloseRounded as CloseIcon } from '@mui/icons-material';
import { useAction } from '../state/actions/index.action';
import { useContextSelector } from '../context/context';
import { useNavigate } from 'react-router-dom';

function CartItem({ product }) {
  // Destructuring product properties
  const { image, name, price, desc, _id } = product;

  // State for quantity of the product
  const [quantity, setQuantity] = React.useState(1);
  const navigate = useNavigate();

  // Custom hooks for actions and context
  const { removeCartItem } = useAction();
  const { localCart, cartLength, setCartLength, setProductsToCheckout } = useContextSelector();

  // Helper function to update product quantity in local cart
  const helper = () => {
    const prod = localCart[_id];
    const newProd = { ...prod, qty: quantity };
    localCart[_id] = newProd;
  };

  // Effect to update the local cart whenever quantity changes
  React.useEffect(() => {
    helper();
    // eslint-disable-next-line
  }, [quantity]);

  // Handler to remove item from cart
  const removeFromCartHandler = () => {
    setCartLength(() => cartLength - 1);
    removeCartItem(_id);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '150px',
        boxShadow: '0 0 10px #3333',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: '30px',
      }}
    >
      <Stack
        sx={{
          height: '100%',
          background: '#071c29 ',
          flex: 0.3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={image} alt={name} width="100px" height="100px" />
      </Stack>
      <Stack
        sx={{
          height: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          padding: '10px 2rem',
          position: 'relative',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={removeFromCartHandler}
          sx={{
            position: 'absolute',
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography sx={{ color: '#071c29', fontSize: '1.1rem' }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'gray' }}>
          {desc}
        </Typography>
        <Stack direction="row" spacing={3}>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', minWidth: '80px' }}
          >
            ₹ {+price * quantity}
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={() => {
                setQuantity(() => (quantity > 1 ? quantity - 1 : 1));
              }}
            >
              <RemoveCircle />
            </IconButton>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '30px',
                justifyContent: 'center',
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              onClick={() => {
                setQuantity(() => (quantity < 10 ? quantity + 1 : 10));
              }}
            >
              <AddCircle />
            </IconButton>
          </Stack>

          <Button
            className="cartitem__button"
            variant="contained"
            sx={{
              textTransform: 'none',
              background: '#071c29',
              flex: 1,
              position: 'relative',
            }}
            onClick={() => {
              const prods = [];
              Object.values(localCart).forEach((key) => {
                prods.push(key);
              });
              setProductsToCheckout(() => [...prods]);
              navigate('/payments');
            }}
          >
            Place order
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CartItem;
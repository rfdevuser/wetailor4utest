// src/redux/actions/cartActions.js

// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Action creators
export const addToCart = (item) => {
  return (dispatch) => {
    // Dispatch action
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });

    // Save to local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
};

export const removeFromCart = (itemId) => {
  return (dispatch) => {
    // Dispatch action
    dispatch({
      type: REMOVE_FROM_CART,
      payload: itemId,
    });

    // Remove from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
};

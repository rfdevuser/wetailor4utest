import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

// Function to get cart state from localStorage
const loadCartState = () => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      const serializedCart = localStorage.getItem('cart');
      return JSON.parse(serializedCart) || [];
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
      return [];
    }
  }
  return [];
};

const initialState = {
  cart: loadCartState(), // Initialize cart from local storage
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartAdd = [...state.cart, action.payload];
      // Update localStorage whenever cart is updated
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        try {
          localStorage.setItem('cart', JSON.stringify(updatedCartAdd));
        } catch (error) {
          console.error('Error saving cart to localStorage', error);
        }
      }
      return {
        ...state,
        cart: updatedCartAdd,
      };

    case REMOVE_FROM_CART:
      const updatedCartRemove = state.cart.filter(item => item.id !== action.payload);
      // Update localStorage whenever cart is updated
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        try {
          localStorage.setItem('cart', JSON.stringify(updatedCartRemove));
        } catch (error) {
          console.error('Error saving cart to localStorage', error);
        }
      }
      return {
        ...state,
        cart: updatedCartRemove,
      };

    default:
      return state;
  }
};

export default cartReducer;

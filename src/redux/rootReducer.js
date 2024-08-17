import { combineReducers } from 'redux';
// import fabricReducer from './reducers/FabricReducer';
import formReducer from './reducers/form.reducer';
import productSlice from './reducers/productSlice';

// Combine all reducers
const rootReducer = combineReducers({
  // fabric: fabricReducer ,
  form: formReducer,
  productID: productSlice, 
});

export default rootReducer;

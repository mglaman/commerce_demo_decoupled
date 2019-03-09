import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux'

const cartReducer = handleActions({
  SET_CART_TOKEN: (state, { payload }) => {
    localStorage.setItem('cartToken', payload)
    return ({
      ...state,
      cartToken: payload
    })
  },
  'CART_FETCH_STARTED': (state, { payload }) => {
    return {
      ...state,
      loading: true,
    };
  },
  'CART_FETCH_SUCCEEDED': (state, { payload:carts }) => {
    return {
      ...state,
      carts
    }
  },
  'CART_FETCH_FAILED': (state, { payload }) => {
    console.log(payload);
    return state;
  },
  'CART_FETCH_ENDED': (state, { payload }) => {
    return {
      ...state,
      loading: false,
    };
  },
}, {
  loading: false,
  cartToken: null,
  carts: [],
})


export default combineReducers({
  cart: cartReducer,
});
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
      carts,
      itemCount: carts.reduce((previousValue, currentValue) =>
        previousValue + currentValue.order_items
          .reduce((previousValue, currentValue) => (previousValue + parseInt(currentValue.quantity)), 0), 0)
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
  itemCount: 0
})

const cartFlyoutReducer = handleActions({
  'CART_ADD_SUCCEEDED': (state) => ({
    ...state,
    open: true,
  }),
  CART_FLYOUT_OPEN: (state) => ({
    ...state,
    open: true,
  }),
  CART_FLYOUT_CLOSE: (state) => ({
    ...state,
    open: false,
  }),
}, {
  open: true,
})

export default combineReducers({
  cart: cartReducer,
  cartFlyout: cartFlyoutReducer
});
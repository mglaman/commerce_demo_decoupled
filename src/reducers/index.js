import { handleActions } from 'redux-actions';
import { connectRouter } from 'connected-react-router'
// import { reducer as api} from 'redux-json-api';
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
    const included = carts.included || [];
    return {
      ...state,
      carts: carts.data,
      included,
      itemCount: included
      .filter(item => item.type.indexOf('commerce_order_item') === 0)
      .reduce((previousValue, currentValue) => {
        return previousValue + parseInt(currentValue.attributes.quantity)
      }, 0)
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
  included: [],
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
  '@@router/LOCATION_CHANGE': (state) => ({
    ...state,
    open: false,
  }),
}, {
  open: true,
})

const navigationReducer = handleActions({
  '@@router/LOCATION_CHANGE': (state) => {
    window.scrollTo(0, 0);
    return ({
      ...state,
    })
  },
}, {})

const checkoutReducer = handleActions({
  'CHECKOUT_CHANGE_STEP': (state, { payload }) => ({
    ...state,
    currentStep: payload
  })
}, {
  currentStep: 'customerInformation'
})

export default history => combineReducers({
  router: connectRouter(history),
  cart: cartReducer,
  cartFlyout: cartFlyoutReducer,
  navigation: navigationReducer,
  checkout: checkoutReducer,
  // api
});

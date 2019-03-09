import { createAction } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

export const setCartToken = createAction(('SET_CART_TOKEN'))

export const cartFlyoutOpen = createAction('CART_FLYOUT_OPEN');
export const cartFlyoutClose = createAction('CART_FLYOUT_CLOSE');

export const cartFetch = createActionThunk('CART_FETCH', async (store) => {
  const { cart: {cartToken} } = store.getState();
  const res = await fetch(`${process.env.REACT_APP_API_URL}/cart?_format=json`, {
    headers: {
      'Commerce-Cart-Token': cartToken,
    }
  })
  return await res.json();
})


export const cartAdd = createActionThunk('CART_ADD', async (variation, store) => {
  const { cart: {cartToken} } = store.getState();
  console.log(variation);
  const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/add?_format=json`, {
    method: 'POST',
    headers: {
      'Commerce-Cart-Token': cartToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      purchased_entity_type: 'commerce_product_variation',
      purchased_entity_id: variation.variationId,
      quantity: 1
    }])
  })
  await res.json();
  store.dispatch(cartFetch());
})
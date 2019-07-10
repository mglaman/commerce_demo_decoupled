import { createAction } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'
import { jsonapiClient } from '../utils/api'

export const setCartToken = createAction(('SET_CART_TOKEN'))

export const cartFlyoutOpen = createAction('CART_FLYOUT_OPEN');
export const cartFlyoutClose = createAction('CART_FLYOUT_CLOSE');

export const cartFetch = createActionThunk('CART_FETCH', async (store) => {
  const { cart: {cartToken} } = store.getState();
  return await jsonapiClient(process.env.REACT_APP_API_URL, 'carts', {
    options: {
      headers: {
        'Commerce-Cart-Token': cartToken,
      }
    }
  });
})

export const cartAdd = createActionThunk('CART_ADD', async (variation, store) => {
  const { cart: {cartToken} } = store.getState();
  const res = await fetch(`${process.env.REACT_APP_API_URL}/jsonapi/cart/add`, {
    method: 'POST',
    headers: {
      'Commerce-Cart-Token': cartToken,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: [{
        type: variation.type,
        id: variation.id,
        meta: {
          orderQuantity: 1
        }
      }]
    })
  })
  await res.json();
  store.dispatch(cartFetch());
})
export const cartRemove = createActionThunk('CART_REMOVE', async (orderItem, store) => {
  const { cart: {cartToken} } = store.getState();
  const { id, relationships: {
    order_id: {
      data: {
        id:order_id
      }
    }
  } } = orderItem;
  await fetch(`${process.env.REACT_APP_API_URL}/cart/${order_id}/items/${id}?_format=json`, {
    method: 'DELETE',
    headers: {
      'Commerce-Cart-Token': cartToken,
    }
  })
  store.dispatch(cartFetch());
})

export const cartUpdateItem = createActionThunk('CART_UPDATE_ITEM', async (orderItem, quantity, store) => {
  const { cart: {cartToken} } = store.getState();
  const { id, relationships: {
    order_id: {
      data: {
        id:order_id
      }
    }
  } } = orderItem;
  await fetch(`${process.env.REACT_APP_API_URL}/cart/${order_id}/items/${id}?_format=json`, {
    method: 'PATCH',
    headers: {
      'Commerce-Cart-Token': cartToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity
    })
  })
  store.dispatch(cartFetch());
})

export const checkoutChangeStep = createAction('CHECKOUT_CHANGE_STEP');

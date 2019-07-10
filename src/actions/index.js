import { createAction } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

export const setCartToken = createAction(('SET_CART_TOKEN'))

export const cartFlyoutOpen = createAction('CART_FLYOUT_OPEN');
export const cartFlyoutClose = createAction('CART_FLYOUT_CLOSE');

export const cartFetch = createActionThunk('CART_FETCH', async (store) => {
  const { cart: {cartToken} } = store.getState();
  const res = await fetch(`${process.env.REACT_APP_API_URL}/jsonapi/cart?fields%5Bcommerce_order--physical%5D=total_price,order_total,coupons,order_items&fields%5Bcommerce_order_item--physical_product_variation%5D=title,quantity,unit_price,total_price,purchased_entity&fields%5Bcommerce_product_variation--simple%5D=product_id&include=order_items,order_items.purchased_entity`, {
    headers: {
      'Commerce-Cart-Token': cartToken,
    }
  })
  return await res.json();
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
  const { id, order_id } = orderItem;
  await fetch(`${process.env.REACT_APP_API_URL}/cart/${order_id}/items/${id}?_format=json`, {
    method: 'DELETE',
    headers: {
      'Commerce-Cart-Token': cartToken,
    }
  })
  store.dispatch(cartFetch());
})

export const checkoutChangeStep = createAction('CHECKOUT_CHANGE_STEP');

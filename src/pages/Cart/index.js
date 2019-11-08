import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/currency'
import { cartRemove } from '../../actions'
import PromotionCode from './promotionCode'
import PayPalCheckout from './PayPalCheckout';

const CartPage = ({ cart, dispatch }) => {
  return (
    <Fragment>
      {cart.carts.map(cartItem => {
        const cartItems = cartItem.relationships.order_items.data.map(rel => cart.included[rel.type][rel.id])
        return (
          <div key={cartItem.id} className={`container`}>
          <div className={`row`}>
            <div className={`col-sm-12`}>
              <table className={`table`}>
                <tbody>
                {cartItems.map(orderItem => {
                      const purchasedEntityRelationship = orderItem.relationships.purchased_entity.data;
                      const purchaseEntity = cart.included[purchasedEntityRelationship.type][purchasedEntityRelationship.id]
                  return (
                    <tr key={orderItem.id}>
                      <td className="cart-block--offcanvas-cart-table__title w-50">
                        <Link className={``} to={`/product/${purchaseEntity.relationships.product_id.data.id}`}>{orderItem.attributes.title}</Link>
                      </td>
                      <td className="cart-block--offcanvas-cart-table__quantity">
                        <input className="form-control" type={`number`} size={5} min={0} defaultValue={parseInt(orderItem.attributes.quantity)} />
                      </td>
                      <td className="cart-block--offcanvas-cart-table__price w-15">
                      {orderItem.attributes.total_price.formatted}
                      </td>
                      <td className="cart-block--offcanvas-cart-table__remove text-right">
                        <button className="btn btn-primary" onClick={() => { dispatch(cartRemove(orderItem)) }}>Remove</button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
                <tfoot>
                <tr>
                  <td colSpan={3} />
                  <td className={``}>
                    <dl className={`row text-right`}>
                      <dt className="col-sm-6">Subtotal</dt>
                      <dd className="col-sm-6">{formatCurrency(cartItem.attributes.order_total.subtotal.currency_code, cartItem.attributes.order_total.subtotal.number)}</dd>
                      {cartItem.attributes.order_total.adjustments.map(adjustment => (
                        <Fragment key={adjustment.type}>
                          <dt className="col-sm-6">{adjustment.label}</dt>
                          <dd className="col-sm-6">{formatCurrency(adjustment.amount.currency_code, adjustment.amount.number)}</dd>
                        </Fragment>
                      ))}
                      <dt className="col-sm-6">Total</dt>
                      <dd className="col-sm-6">{formatCurrency(cartItem.attributes.order_total.total.currency_code, cartItem.attributes.order_total.total.number)}</dd>
                    </dl>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
            <div className={`col-md-6`}>
              <div className={`well`}>
                <PromotionCode/>
              </div>
            </div>
            <div className={`col-md-6 text-right`}>
              {/*<button type="submit" className="btn btn-link"> <FaSpinner/> Update quantities</button>*/}
              <Link to={`/checkout/${cartItem.id}`} className={`btn btn-primary`}>Checkout (onsite)</Link>
              <a href={`${process.env.REACT_APP_API_URL}/checkout/${cartItem.id}?cartToken=${cart.cartToken}`} className={`ml-1 btn btn-primary`}>Checkout (offsite)</a>
            </div>
            <div className={`offset-md-8 col-md-4 text-right`}>
            <PayPalCheckout cart={cartItem} />
            </div>
          </div>
        </div>
        )
      })}
    </Fragment>
  )
};

const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(CartPage);

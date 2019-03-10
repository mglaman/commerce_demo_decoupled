import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/currency'
import { cartRemove } from '../../actions'
import { FaSpinner } from 'react-icons/fa'

const CartPage = ({ cart, dispatch }) => {
  console.log(cart)
  return (
    <Fragment>
      {cart.carts.map(cart => (
        <div key={cart.order_id} className={`container`}>
          <div className={`row`}>
            <div className={`col-sm-12`}>
              <table className={`table`}>
                <tbody>
                {cart.order_items.map(orderItem => {
                  return (
                    <tr key={orderItem.order_item_id}>
                      <td className="cart-block--offcanvas-cart-table__title">
                        <Link className={``} to={`/product/${orderItem.purchased_entity.product_id}`}>{orderItem.title}</Link>
                      </td>
                      <td className="cart-block--offcanvas-cart-table__quantity">
                        <input className="form-control" type={`number`} size={10} min={0} defaultValue={parseInt(orderItem.quantity)} />
                      </td>
                      <td className="cart-block--offcanvas-cart-table__price">
                        {formatCurrency(orderItem.total_price.currency_code, orderItem.total_price.number)}
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
                      <dt className="col-sm-6">Total</dt>
                      <dd className="col-sm-6">{formatCurrency(cart.total_price.currency_code, cart.total_price.number)}</dd>
                    </dl>
                  </td>
                </tr>
                <tr>
                  <td className={`text-right`} colSpan={4}>
                    <button type="submit" className="btn btn-link"> <FaSpinner/> Update quantities</button>
                    <button type="submit" className="btn btn-primary"> Checkout</button>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
};

const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps)(CartPage);

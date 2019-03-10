import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/currency'

const Sidebar = (props) => {
  const {cart: {carts}} = props
  if (carts.length === 0) {
    return <div key={`loading`}>Loading...</div>
  }
  const cart = carts[0]

  return (
    <Fragment>
      <h3>Order summary</h3>
      <table className={`table`}>
        <tbody>
        {cart.order_items.map(orderItem => {
          return (
            <tr key={orderItem.order_item_id}>
              <td className="cart-block--offcanvas-cart-table__title w-50">
                <Link className={``} to={`/product/${orderItem.purchased_entity.product_id}`}>{orderItem.title}</Link>
              </td>
              <td className="cart-block--offcanvas-cart-table__price w-15">
                {formatCurrency(orderItem.total_price.currency_code, orderItem.total_price.number)}
              </td>
            </tr>
          )
        })}
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={2}>
            <dl className={`row text-right`}>
              <dt className="col-sm-8">Total</dt>
              <dd className="col-sm-4">{formatCurrency(cart.total_price.currency_code, cart.total_price.number)}</dd>
            </dl>
          </td>
        </tr>
        </tfoot>
      </table>
    </Fragment>
  )
}
const mapStateToProps = ({cart}) => ({cart})
export default connect(mapStateToProps)(Sidebar);
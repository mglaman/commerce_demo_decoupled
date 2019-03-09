import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { cartFlyoutClose, cartRemove } from '../actions'
import { Link } from 'react-router-dom'
import { FaRegWindowClose, FaSpinner } from 'react-icons/fa'
import { formatCurrency } from '../utils/currency'

const closeFlyout = (dispatch) => dispatch(cartFlyoutClose());

const CartFlyout = (props) => {
  const {
    dispatch,
    cart: {
      carts,
      itemCount
    },
    cartFlyout: { open }
  } = props;
  const cart = carts[0];
  return (
    <Fragment>
      <aside id="cart-offcanvas" className={`cart-offcanvas is-${open ? 'open' : 'closed'} cart-offcanvas--right`}>
        <div className="cart--cart-offcanvas well well-lg well-primary text-light">
          <div className="cart--cart-offcanvas__close">
            <button type="button" className="button btn close-btn"><span className="visually-hidden"> Close cart</span></button>
          </div>
          {itemCount === 0 ? <div key={`empty`}>Your cart is empty</div> : [
            <div className={`cart-block--offcanvas-contents`} key={`contents`}>
              <div className={`cart-block--offcanvas-contents__inner`}>
                <h2>Shopping bag</h2>
                <div className={`cart-block--offcanvas-contents__items`}>
                  <table className={`cart-block--offcanvas-cart-table table`}>
                    <tbody>
                    {cart.order_items.map(orderItem => {
                      return (
                        <tr key={orderItem.order_item_id}>
                          <td className="cart-block--offcanvas-cart-table__title">
                            <Link className={`text-light`} to={`/product/${orderItem.purchased_entity.product_id}`}>{orderItem.title}</Link>
                          </td>
                          <td className="cart-block--offcanvas-cart-table__quantity">
                            <input className="form-control" type="number" min="0" data-key="0" defaultValue={parseInt(orderItem.quantity)} />
                          </td>
                          <td className="cart-block--offcanvas-cart-table__price">
                            {formatCurrency(orderItem.total_price.currency_code, orderItem.total_price.number)}
                          </td>
                          <td className="cart-block--offcanvas-cart-table__remove">
                            <button className="btn btn-link text-light" onClick={() => { dispatch(cartRemove(orderItem)) }}><FaRegWindowClose/></button>
                          </td>
                        </tr>
                      )
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                      <td className={`text-right`} colSpan={4}>
                        <button type="submit" className="cart-block--offcanvas-contents__update btn btn-link text-light"> <FaSpinner/> Update quantities</button>
                      </td>
                    </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="cart-block--offcanvas-contents__links text-center">
                  <Link to="/cart" className={`btn text-light btn-link`}>View cart</Link>
                </div>
                <div className="cart--cart-offcanvas__close d-md-none text-center">
                  <button type="button" onClick={() => closeFlyout(dispatch)} className="btn text-light btn-link">Continue shopping</button>
                </div>
              </div>
            </div>
          ]}
        </div>
      </aside>
      <div id="cart-offcanvas-bg" className={`cart-offcanvas-bg is-${open ? 'open' : 'closed'}`} onClick={() => closeFlyout(dispatch)}/>
    </Fragment>
  )
}
const mapStateToProps = ({ cart, cartFlyout }) => ({ cart, cartFlyout });
export default connect(mapStateToProps)(CartFlyout);
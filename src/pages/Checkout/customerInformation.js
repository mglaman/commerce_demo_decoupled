import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkoutChangeStep } from '../../actions'
import Address from './address'

class CustomerInformation extends PureComponent {
  render () {
    if (this.props.checkout.currentStep !== 'customerInformation') {
      return null;
    }
    const {cart: {carts}, dispatch } = this.props
    if (carts.length === 0) {
      return <div key={`loading`}>Loading...</div>
    }
    const cart = carts[0]

    return (
      <div>
        <h3>Customer information</h3>
        <div className="form-group">
          <label htmlFor="customerOrderEmail" className={`sr-only`}>Email address</label>
          <input type="email" className="form-control" id="customerOrderEmail" placeholder="Email" />
        </div>
        <h3>Shipping information</h3>
        <div>
          <Address elementName={`shipping`}/>
        </div>
        <div className={`d-flex justify-content-between align-items-center mt-4`}>
          <Link to={`/cart`}>&lt; Return to cart</Link>
          <button className={`btn btn-primary pull-right`} onClick={() => dispatch(checkoutChangeStep('shippingMethod'))}>Continue to shipping method</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({cart, checkout}) => ({cart, checkout})
export default connect(mapStateToProps)(CustomerInformation);
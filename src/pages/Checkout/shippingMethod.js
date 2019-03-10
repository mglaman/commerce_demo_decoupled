import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkoutChangeStep } from '../../actions'

class ShippingMethod extends PureComponent {
  render () {
    if (this.props.checkout.currentStep !== 'shippingMethod') {
      return null;
    }

    const {cart: {carts}, dispatch } = this.props
    const cart = carts[0]
    return (
      <Fragment>
        <h3>Shipping method</h3>
        <div className={`d-flex justify-content-between align-items-center mt-2`}>
          <button className={`btn btn-link`} onClick={() => dispatch(checkoutChangeStep('customerInformation'))}>Back</button>
          <button className={`btn btn-primary`} onClick={() => dispatch(checkoutChangeStep('paymentMethod'))}>Continue to payment method</button>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = ({cart, checkout}) => ({cart, checkout})
export default connect(mapStateToProps)(ShippingMethod);
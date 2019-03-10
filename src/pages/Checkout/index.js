import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Breadcrumb from './breadcrumb'
import Sidebar from './sidebar'
import CustomerInformation from './customerInformation'
import ShippingMethod from './shippingMethod'
import PaymentMethod from './paymentMethod'

class Checkout extends PureComponent {
  render() {
    return (
      <div className={`container-fluid`}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-md-8`}>
              <Breadcrumb activeStep={this.props.checkout.currentStep}/>
              <div className={`alert alert-warning`}>Checkout is not functional</div>
              <CustomerInformation/>
              <ShippingMethod/>
              <PaymentMethod/>
            </div>
            <div className={`col-md-4`}>
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({cart, checkout}) => ({cart, checkout})
export default connect(mapStateToProps)(Checkout);
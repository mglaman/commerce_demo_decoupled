import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cartFetch } from '../../actions'

class PromotionCode extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      message: null,
      couponCode: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  async handleRemove() {
    const {cart: {cartToken, carts}, dispatch} = this.props
    const cart = carts[0]

    await fetch(`${process.env.REACT_APP_API_URL}/cart/${cart.order_id}/coupons?_format=json`, {
      method: 'DELETE',
      headers: {
        'Commerce-Cart-Token': cartToken,
        'Content-Type': 'application/json',
      },
    })
    dispatch(cartFetch())
  }

  handleChange (event) {
    this.setState({
      couponCode: event.target.value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const {cart: {cartToken, carts}, dispatch} = this.props
    const cart = carts[0]

    const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${cart.order_id}/coupons?_format=json`, {
      method: 'PATCH',
      headers: {
        'Commerce-Cart-Token': cartToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coupon_code: this.state.couponCode
      })
    })
    const json = await res.json()
    if (res.ok) {
      dispatch(cartFetch())
    } else {
      this.setState({
        message: json.message
      })
    }
  }

  render () {
    const {cart: {carts}} = this.props
    const cart = carts[0]
    if (cart.relationships.coupons.data.length > 0) {
      return (
        <div className={`row`} key={`applied`}>
          <div className={`col-md-9`}>
            <div key={`message`} className={`alert alert-primary`}>Promotion applied!</div>
          </div>
          <div className={`col-md-3`}>
            <button type={`submit`} className={`btn btn-primary`} onClick={this.handleRemove}>Remove</button>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.message !== null ? [
          <div key={`message`} className={`alert alert-warning`}>{this.state.message}</div>
        ] : null}
        <div className={`form-row`}>
          <div className={`col`}>
            <input type={`text`} className={`form-control`} placeholder={`Have a promotional code?`}
                   value={this.state.couponCode} onChange={this.handleChange}/>
          </div>
          <button type={`submit`} className={`btn btn-primary`}>Apply</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({cart}) => ({cart})
export default connect(mapStateToProps)(PromotionCode)

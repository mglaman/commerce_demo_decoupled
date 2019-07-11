import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { jsonapiClient } from '../../utils/api'

const paypal = window.paypal;
let PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

const PayPalCheckout = ({ cart }, { dispatch }) => {
  return <PayPalButton
    createOrder={(data, actions) => actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: cart.attributes.total_price.currency_code,
          value: cart.attributes.total_price.number
        }
      }],
      application_context: {
        brand_name: 'Centarro Demo',
      }
    })}
    onApprove={(data, actions) => {
      return actions.order.capture().then(details => {
        const orderId = details.id;
        const payer = details.payer.name;
        const status = details.status;
        console.log(details);

        const orderPatched = {
          type: cart.type,
          id: cart.id,
          attributes: {
            state: 'completed',
          }
        }
        jsonapiClient(process.env.REACT_APP_API_URL, 'order_placed', {
          parameters: {
            order: orderPatched,
          }
        }).then(output => {
          console.log(output)
        })
      });
    }}
  />;
}
export default connect()(PayPalCheckout);

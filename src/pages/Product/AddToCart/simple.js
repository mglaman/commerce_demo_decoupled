import React from 'react'
import PropTypes from 'prop-types';
import { cartAdd } from '../../../actions'
import { connect } from 'react-redux'

const Simple = (props) => {
  const { dispatch, defaultVariation } = props;
  return (
    <div className={`field--name-variations`} key={defaultVariation.entityBundle}>
      <div className={`field--item`}>
        <button className="button button--primary js-form-submit form-submit btn-success btn" type="button" onClick={() => {
          dispatch(cartAdd(defaultVariation))
        }}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
Simple.propTypes = {
  defaultVariation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default connect()(Simple);
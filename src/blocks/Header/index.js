import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux'
import { cartFlyoutOpen } from '../../actions'

const CartBlock = ({ cart, dispatch }) => {
    return (<div onClick={() => cart.itemCount > 0 ? dispatch(cartFlyoutOpen()) : null}><FaShoppingCart/> { cart.itemCount } { cart.itemCount === 1 ? 'item' : 'items'}</div>)
}
const mapStateToProps = ({ cart }) => ({ cart });
const ConnectedCartBlock = connect(mapStateToProps)(CartBlock);

export default () => <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <button type="button" className="toggle-btn btn btn-link" data-toggle="collapse"
                data-target="#off-canvas">
            <div className="toggle-btn--bars">
                <span className="icon-bar"/>
                <span className="icon-bar"/>
            </div>
            <span className="toggle-btn--name hidden-xs">Menu</span>
        </button>
        <div className="cart"><ConnectedCartBlock/></div>
    </div>
</nav>

import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux'

const CartBlock = ({ cart }) => {
    return (<Link to={`/cart`}><FaShoppingCart/> 0 items</Link>)
}
const mapStateToProps = ({ cart }) => ({ cart });
const ConnectedCartBlock = connect(mapStateToProps)(CartBlock);

export default (props) => <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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

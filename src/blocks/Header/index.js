import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const CartBlock = ({ itemsCount }) => (<Link to={`/cart`}><FaShoppingCart/> 0 items</Link>)

export default (props) => (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button type="button" className="toggle-btn btn btn-link" data-toggle="collapse"
                    data-target="#off-canvas">
                    <div className="toggle-btn--bars">
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </div>
                    <span className="toggle-btn--name hidden-xs">Menu</span>
                </button>
                <div className="cart"><CartBlock /></div>
            </div>
        </nav>
    </Fragment>
)

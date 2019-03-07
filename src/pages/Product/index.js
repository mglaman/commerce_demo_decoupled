import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

class Product extends PureComponent {
    state = {
        data: null,
    }
    async componentDidMount() {
        const { match } = this.props;
        const url = `${process.env.REACT_APP_API_URL}/jsonapi/commerce_product/default/${match.params.productId}`;
        const res = await fetch(url);
        const newState = await res.json();
        await this._setState(newState);
    }
    async _setState(state) {
        return new Promise(res => this.setState(state, res));
    }
    render() {
        console.log(this.state);
        return (
            <div className={`container-fluid`}>
                <div className={`container commerce-product--full`}>
                    <div className={`row`}>
                        <div className={`col-md-6`}></div>
                        <div className={`col-md-6`}>
                            <div className={`commerce-product__contents`}>
                                <div className={`field--name-title`}>
                                    <ReactPlaceholder type={`text`} rows={1} ready={this.state.data !== null}>
                                        <span>{this.state.data ? this.state.data.attributes.title : null}</span>
                                    </ReactPlaceholder>
                                </div>
                                <div className={`field--name-body`}>
                                    <ReactPlaceholder type={`text`} rows={4} ready={this.state.data !== null}>
                                    <div dangerouslySetInnerHTML={{ __html: this.state.data ? this.state.data.attributes.body.processed : null }}/>
                                    </ReactPlaceholder>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product;

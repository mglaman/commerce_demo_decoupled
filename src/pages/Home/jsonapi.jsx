import React, { PureComponent } from 'react'
import ProductFeatured from '../../blocks/ProductFeatured/jsonapi';
import { jsonapiClient } from '../../utils/api';
import normalize from 'json-api-normalizer';

class JsonApiFeaturedProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      included: []
    };
  }
  async componentDidMount() {
    try {
      const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'featured_products');

      this.setState({
        isLoaded: true,
        data: result.data,
        included: result.included
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }

    return this.state.data.map(product => (
      <div className={`featured-seller col-md-4`} key={product.id}>
        <ProductFeatured key={document.id} product={product} included={this.state.included} />
      </div>
    ))
  }
}
export default JsonApiFeaturedProducts;

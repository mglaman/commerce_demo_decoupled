import React, { PureComponent } from 'react'
import ProductFeatured from '../../blocks/ProductFeatured/jsonapi';

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
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/jsonapi/commerce_product/simple?include=variations,variations.field_images&fields%5Bcommerce_product--simple%5D=title,variations&fields%5Bcommerce_product_variation--simple%5D=price,field_images&fields%5Bfile--file%5D=uri&filter%5Bfield_special_categories.entity.name%5D%5Bvalue%5D=Featured&page%5Blimit%5D=6&sort=-changed`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data,
            included: result.included
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }

    return this.state.data.map(product => (
      <div className={`featured-seller col-md-4`} key={product.id}>
        <ProductFeatured key={document.id} product={product} included={this.state.included}/>
      </div>
    ))
  }
}
export default JsonApiFeaturedProducts;

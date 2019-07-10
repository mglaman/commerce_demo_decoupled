import React, { PureComponent } from 'react'
import VariationsAddToCart from './AddToCart/variations'
import SimpleAddToCart from './AddToCart/simple'
import { jsonapiClient } from '../../utils/api'

// Review and use `https://github.com/dvidsilva/redux-json-api-demo/blob/master/main.js`

class Product extends PureComponent {
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
    const {productId} = this.props.match.params

    try {
      const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'product_single', {
        parameters: {
          bundle: 'simple',
          id: productId,
        },
      })
      this.setState({
        isLoaded: true,
        data: result.data,
        included: result.included
      });
    } catch (e) {
      this.setState({
        isLoaded: true,
        error: e
      });
    }
  }
  render() {
    if (!this.state.isLoaded) {
      return null
    }
    if (this.state.error !== null) {
      console.log(this.state.error);
      return 'Oops, an error happened.';
    }

    const variations = this.state.data.relationships.variations.data;
    const defaultVariationId = this.state.data.relationships.variations.data[0].id;
    const defaultVariation = this.state.included.filter(include => {
      return include.type === "commerce_product_variation--simple" && include.id === defaultVariationId
    }).pop();
    const variationImageData = defaultVariation.relationships.field_images.data[0];
    const variationImage = this.state.included.filter(include => {
      return include.type === "file--file" && include.id === variationImageData.id
    }).pop();

    const productBrandId = this.state.data.relationships.field_brand.data.id;
    const productBrand = this.state.included.filter(include => {
      return include.type === "taxonomy_term--brands" && include.id === productBrandId
    }).pop();
    return (
      <div className={`container-fluid`}>
        <div className={`container commerce-product--full`}>
          <div className={`row`}>
              <div className={`col-md-6`}>
                <img src={`${process.env.REACT_APP_API_URL}${variationImage.attributes.uri.url}`} width={variationImageData.meta.width} height={variationImageData.meta.height} alt={variationImageData.meta.alt} className={`img-fluid`} />
              </div>
              <div className={`col-md-6`}>
                <div className={`commerce-product__contents`}>
                  <div className={`field--name-title`}>{this.state.data.attributes.title}</div>
                  <div className={`field--name-price`}>{defaultVariation.attributes.resolved_price.formatted}</div>
                  <div className="field--name-field-brand">{productBrand.attributes.name}</div>
                  <div className={`field--name-body`}>
                    <div dangerouslySetInnerHTML={{__html: this.state.data.attributes.body.processed}}/>
                  </div>
                  {variations.length < 2 ? <SimpleAddToCart defaultVariation={defaultVariation}/> : <VariationsAddToCart variations={variations}/>}
                  <div className={`field--name-field-product-categories`}>
                    {/* @todo add back */}
                    {/* {productCategories.map(category => (
                      <div key={category.entity.name}>{category.entity.name}</div>
                    ))} */}
                  </div>
                  <div className={`field--name-field-special-categories`}>
                    {/* @todo add back */}
                    {/* {specialCategories.map(category => (
                      <div key={category.entity.name}>{category.entity.name}</div>
                    ))} */}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product

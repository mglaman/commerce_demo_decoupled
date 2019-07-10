import React, { PureComponent } from 'react'
import VariationsAddToCart from './AddToCart/variations'
import SimpleAddToCart from './AddToCart/simple'
import { jsonapiClient, jsonapiNormalize } from '../../utils/api'

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
    this.fetchProduct();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.productId !== this.props.match.params.productId) {
      this.fetchProduct();
    }
  }

  async fetchProduct() {
    const {productId} = this.props.match.params

    try {
      const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'product_single', {
        parameters: {
          bundle: 'simple',
          id: productId,
        },
      })
      const resultNormalized = jsonapiNormalize(result);
      this.setState({
        isLoaded: true,
        data: resultNormalized.data,
        included: resultNormalized.included
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

    const defaultVariationRelationship = this.state.data.relationships.variations.data[0];
    const defaultVariation = this.state.included[defaultVariationRelationship.type][defaultVariationRelationship.id]

    const variationImageRelationship = defaultVariation.relationships.field_images.data[0];
    const variationImage = this.state.included[variationImageRelationship.type][variationImageRelationship.id]

    const productBrandRelationship = this.state.data.relationships.field_brand.data;
    const productBrand = this.state.included[productBrandRelationship.type][productBrandRelationship.id]

    const productCategoriesRelationship = this.state.data.relationships.field_product_categories.data;
    const productCategories = productCategoriesRelationship.map(rel => this.state.included[rel.type][rel.id]);
    const specialCategoriesRelationship = this.state.data.relationships.field_special_categories.data;
    const specialCategories = specialCategoriesRelationship.map(rel => this.state.included[rel.type][rel.id]);

    return (
      <div className={`container-fluid`}>
        <div className={`container commerce-product--full`}>
          <div className={`row`}>
              <div className={`col-md-6`}>
                <img src={`${process.env.REACT_APP_API_URL}${variationImage.attributes.uri.url}`} width={variationImageRelationship.meta.width} height={variationImageRelationship.meta.height} alt={variationImageRelationship.meta.alt} className={`img-fluid`} />
              </div>
              <div className={`col-md-6`}>
                <div className={`commerce-product__contents`}>
                  <div className={`field--name-title`}>{this.state.data.attributes.title}</div>
                  <div className={`field--name-price`}>{defaultVariation.attributes.resolved_price.formatted}</div>
                  <div className="field--name-field-brand">{productBrand.attributes.name}</div>
                  <div className={`field--name-body`}>
                    <div dangerouslySetInnerHTML={{__html: this.state.data.attributes.body.processed}}/>
                  </div>
                  {variations.length < 2 ? <SimpleAddToCart defaultVariation={defaultVariation}/> : <VariationsAddToCart variations={variations} included={this.state.included}/>}
                  <div className={`field--name-field-product-categories`}>
                    {productCategories.map(category => (
                      <div key={category.id}>{category.attributes.name}</div>
                    ))}
                  </div>
                  <div className={`field--name-field-special-categories`}>
                    {specialCategories.map(category => (
                      <div key={category.id}>{category.attributes.name}</div>
                    ))}
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

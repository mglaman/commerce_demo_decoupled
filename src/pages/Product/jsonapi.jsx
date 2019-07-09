import React, { PureComponent,Fragment} from 'react'
import { Query } from 'react-apollo'
import { formatCurrency } from '../../utils/currency'
import graphqlQuery from './graphqlQuery';
import VariationsAddToCart from './AddToCart/variations'
import SimpleAddToCart from './AddToCart/simple'

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
  componentDidMount() {
    const {productId} = this.props.match.params
    fetch(`${process.env.REACT_APP_API_URL}/jsonapi/commerce_product/simple/${productId}?include=variations,variations.field_images,field_special_categories,field_product_categories,field_brand&fields%5Bcommerce_product--simple%5D=title,body,variations,field_special_categories,field_product_categories,field_brand&fields%5Bcommerce_product_variation--simple%5D=sku,price,resolved_price,field_images&fields%5Bfile--file%5D=uri&fields%5Btaxonomy_term--product_categories%5D=name&fields%5Btaxonomy_term--special_categories%5D=name&fields%5Btaxonomy_term--brands%5D=name`)
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
      return null
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

import React, {Fragment} from 'react'
import { Query } from 'react-apollo'
import { formatCurrency } from '../../utils/currency'
import graphqlQuery from './graphqlQuery';
import VariationsAddToCart from './AddToCart/variations'
import SimpleAddToCart from './AddToCart/simple'

const Product = (props) => {
  const {productId} = props.match.params
  return (
    <div className={`container-fluid`}>
      <div className={`container commerce-product--full`}>
        <div className={`row`}>
    <Query query={graphqlQuery(productId)}>
      {({loading, error, data}) => {
        if (loading) return <div className={`col-sm-12`} key={`loading`}>Loading...</div>
        if (error) return <div key={`error`}>Error! ${error.message}</div>
        if (data) {
          const {
            title,
            body: {processed: bodyProcessed},
            variations,
            fieldBrand: {
              entity: {
                name: productBrand
              }
            },
            fieldProductCategories: productCategories,
            fieldSpecialCategories: specialCategories
          } = data.commerceProductById
          const {entity: defaultVariation} = variations[0]
          const image = defaultVariation.fieldImages[0];
          return (
            <Fragment>
              <div className={`col-md-6`}>
                <img src={image.derivative.url} width={image.derivative.width} height={image.derivative.height} alt={image.alt} className={`img-fluid`} />
              </div>
              <div className={`col-md-6`}>
                <div className={`commerce-product__contents`}>
                  <div className={`field--name-title`}>{title}</div>
                  <div className={`field--name-price`}>{formatCurrency(defaultVariation.price.currencyCode, defaultVariation.price.number)}</div>
                  <div className="field--name-field-brand">{productBrand}</div>
                  <div className={`field--name-body`}>
                    <div dangerouslySetInnerHTML={{__html: bodyProcessed}}/>
                  </div>
                  {variations.length < 2 ? <SimpleAddToCart defaultVariation={defaultVariation}/> : <VariationsAddToCart variations={variations}/>}
                  <div className={`field--name-field-product-categories`}>
                    {productCategories.map(category => (
                      <div key={category.entity.name}>{category.entity.name}</div>
                    ))}
                  </div>
                  <div className={`field--name-field-special-categories`}>
                    {specialCategories.map(category => (
                      <div key={category.entity.name}>{category.entity.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Fragment>
          )
        }
      }
      }
    </Query>
        </div>
      </div>
    </div>
  )
}

export default Product

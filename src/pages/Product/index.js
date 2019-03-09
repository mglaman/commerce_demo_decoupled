import React  from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { formatCurrency } from '../../utils/currency'
import { connect } from 'react-redux'
import { cartAdd } from '../../actions'

const Product = (props) => {
  const {productId} = props.match.params
  const GET_PRODUCT = gql`{
  commerceProductById(id: "${productId}") {
    entityId
    entityBundle
    title
    ... on CommerceProductSimple {
      body {
        processed
      }
      variations {
        entity {
          variationId
          sku
          price {
            number
            currencyCode
          }
          ... on CommerceProductVariationSimple {
            fieldImages {
              derivative(style: PRODUCT) {
                url
                width
                height
              }
            }
          }
        }
      }
      fieldBrand {
        entity {
          name
        }
      }
      fieldProductCategories {
        entity {
          name
        }
      }
      fieldSpecialCategories {
        entity {
          name
        }
      }
    }
    ... on CommerceProductClothing {
      body {
        processed
      }
      variations {
        entity {
          variationId
          sku
          price {
            number
            currencyCode
          }
          ... on CommerceProductVariationClothing {
            fieldImages {
              derivative(style: PRODUCT) {
                url
                width
                height
              }
            }
          }
        }
      }
      fieldBrand {
        entity {
          name
        }
      }
      fieldProductCategories {
        entity {
          name
        }
      }
      fieldSpecialCategories {
        entity {
          name
        }
      }
    }
  }
}`

  return (
    <Query query={GET_PRODUCT}>
      {({loading, error, data}) => {
        if (loading) return <div key={`loading`}>Loading...</div>
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
            <div className={`container-fluid`}>
              <div className={`container commerce-product--full`}>
                <div className={`row`}>
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
                      <div className={`field--name-variations`}>
                        <div className={`field--item`}>
                          <button className="button button--primary js-form-submit form-submit btn-success btn" type="button" onClick={() => {
                            props.dispatch(cartAdd(defaultVariation))
                          }}>
                            Add to cart
                          </button>
                        </div>
                      </div>
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
                </div>
              </div>
            </div>
          )
        }
      }
      }
    </Query>
  )
}

export default connect()(Product)

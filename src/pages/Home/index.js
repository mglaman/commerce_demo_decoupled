import React, { Fragment } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProductFeatured from '../../blocks/ProductFeatured';

const GET_FEATURED_PRODUCTS = gql`
query{
  commerceProductQuery(
    limit: 6
    sort:{
      field: "changed"
      direction: DESC
    }
    filter:{
    conditions: [
      {
        field: "field_special_categories.entity.uuid"
        value:"5ac7df92-6021-4de7-886d-4618bc7513ec"
      },
    ]
  }) {
    entities {
      ... on CommerceProduct {
        entityLabel,
        entityId,
        entityUuid,
        entityBundle,
        ... on CommerceProductSimple {
          variations {
            entity {
              sku
              price {
                number
                currencyCode
              }
              ... on CommerceProductVariationSimple {
                fieldImages {
                  derivative(style: CATALOG) {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
        ... on CommerceProductClothing {
          variations {
            entity {
              sku
              price {
                number
                currencyCode
              }
              ... on CommerceProductVariationClothing {
                fieldImages {
                  derivative(style: CATALOG) {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default (props) => {
  return (
    <Fragment>
      <div className={`container-fluid`}>
        <div className={`container`}>
          <div className={`featured-products`}>
            <div className={`row`}>
              <div className="col-md-12">
                <h2 className="h1 text-center line">Featured products</h2>
              </div>
            </div>
            <div className={`row`}>
              <Query query={GET_FEATURED_PRODUCTS}>
                {({ loading, error, data }) => {
                  if (loading) return <div key={`loading`}>Loading...</div> ;
                  if (error) return <div key={`error`}>Error! ${error.message}</div> ;
                  return (data.commerceProductQuery.entities.map(document => {
                    return (
                      <div className={`featured-seller col-md-4`} key={document.entityUuid}>
                        <ProductFeatured key={document.entityUuid} product={document} />
                      </div>
                    )
                  }))
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial container-fluid well well-lg well-primary">
        <div className="container">
          <div className="text-center row">
            <div className="col-xs-10 col-xs-push-1">
              <p className="testimonial__text h2">Slow-carb paleo bicycle rights bushwick. Tote bag mustache man bun swag, tbh chartreuse synth stumptown portland cray.</p>
              <div className="testimonial__rating">
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star-empty"></i>
              </div>
              <p>Nikola White, customer</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

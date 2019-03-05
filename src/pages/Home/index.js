import React from 'react';
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
        entityUuid,
        queryVariations {
          entities {
            ... on CommerceProductVariation {
             price {
                number
                currencyCode
              }
            }
            ... on CommerceProductVariationSimple {
              fieldImages {
                derivative(style: CATALOG)  {
                  url
                  width
                  height
                }
              }
            }
            ... on CommerceProductVariationClothing {
              fieldImages {
                derivative(style: CATALOG)  {
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
`

export default (props) => {
  return (
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
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                return (data.commerceProductQuery.entities.map(document => {
                  return (<ProductFeatured product={document} />)
                }))
              }}
            </Query>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProductFeatured from '../../blocks/ProductFeatured/graphql';

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
export default () => (
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
);

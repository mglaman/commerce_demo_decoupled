import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import ProductFeatured from '../../blocks/ProductFeatured'

export default (props) => {
  const GET_PRODUCTS = gql`
{
  commerceProductQuery(filter: {conditions: {field: "field_product_categories.entity.name", value: "${props.categoryName}"}}) {
    entities {
      ... on CommerceProduct {
        entityLabel
        entityId
        entityUuid
        entityBundle
      }
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

`;

  return <Query query={GET_PRODUCTS}>
    {({loading, error, data}) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      const { commerceProductQuery: {
        entities,
      } } = data;
      return <div className={`container`}>
        <div className={`row`}>
          <aside className={`col-sm-3`}>
            <div className={`block-facets`}>
              <h3 className={`block-title`}>Brand</h3>
              <div className={`block-facet__content collapse show`}>
                <div className={`facets-widget-checkbox`}>
                </div>
              </div>
            </div>
            <div className={`block-facets`}>
              <h3 className={`block-title`}>Categories</h3>
              <div className={`block-facet__content collapse show`}>
                <div className={`facets-widget-checkbox`}>
                </div>
              </div>
            </div>
            <div className={`block-facets`}>
              <h3 className={`block-title`}>Special Categories</h3>
              <div className={`block-facet__content collapse show`}>
                <div className={`facets-widget-checkbox`}>
                </div>
              </div>
            </div>
          </aside>
          <section className={`col-sm-9`}>
            <div className={`container-fluid`}>
              <div className={`row`}>
                {entities.map(entity => {
                  return (
                    <div className={`col-lg-4 col-md-6`} key={entity.entityId}>
                      <ProductFeatured product={entity}/>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </div>;
    }}
  </Query>
}

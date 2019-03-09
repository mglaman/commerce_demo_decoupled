import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import ProductCatalog from '../../blocks/ProductCatalog'

export default (props) => {
  const GET_PRODUCTS = gql`
query{
  searchAPISearch(
    index_id: "products",
    range: {start: 0, end: 10},
    conditions: [
      {operator: "=", name: "category_name", value: "${props.categoryName}"}
    ]
    facets: [
      {operator: "=", field: "brand_name", limit: 0, min_count: 1, missing: false},
      {operator: "=", field: "category_name", limit: 0, min_count: 1, missing: false}
      {operator: "=", field: "special_name", limit: 0, min_count: 1, missing: false}
    ]
  ) {
    facets {
      name
      values {
        count
        filter
      }
    }
    documents {
      ... on ProductsDoc {
        title,
        product_id
        brand_name
        category_name
        special_name
      }
    }
  }
}
`;

  function facetNameMap(name) {
    if (name === 'brand_name') {
      return 'Brand'
    } else if(name === 'category_name') {
      return 'Categories'
    } else if(name === 'special_name') {
      return 'Special categories'
    }
    return name;
  }

  return <Query query={GET_PRODUCTS}>
    {({loading, error, data}) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      const { searchAPISearch: {
        documents,
        facets
      } } = data;
      console.log(facets);
      return <div className={`container`}>
        <div className={`row`}>
          <aside className={`col-sm-3`}>
            {facets.map(facet => {
              if (facet.values.length === 0) return null;

                return <div key={facet.name} className={`block-facets`}>
                  <h3 className={`block-title`}>{facetNameMap(facet.name)}</h3>
                  <div className={`block-facet__content collapse show`}>
                    <div className={`facets-widget-checkbox`}>
                      <ul className={`item-list__checkbox`}>
                        {facet.values.map((value, i)=> <li key={value.filter}>
                          <input type="checkbox" className="facets-checkbox" value={value.filter} id={`${facet.name}_${i}`} checked={props.categoryName === value.filter}/>
                          <label htmlFor={`${facet.name}_${i}`}>{value.filter}</label>
                        </li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              }
            )}
          </aside>
          <section className={`col-sm-9`}>
            <div className={`container-fluid`}>
              <div className={`row`}>
                {documents.map(document => {
                  return (
                    <div className={`col-lg-4 col-md-6`} key={document.product_id}>
                      <ProductCatalog product={{
                        entityUuid: document.product_id,
                        entityId: document.product_id,
                        entityLabel: document.title,
                        queryVariations: {
                          entities: [
                            {
                              price: {
                                number: '1.00',
                                currencyCode: 'USD'
                              }
                            }
                          ]
                        }
                      }}/>
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

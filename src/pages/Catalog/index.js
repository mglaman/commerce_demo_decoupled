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

  return (
    <Query query={GET_PRODUCTS}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <div className={`container`}>
            <div className={`row`}>
              <aside className={`col-sm-3`}>
                Sidebar
              </aside>
              <section className={`col-sm-9`}>
                <div className={`container-fluid`}>
                  <div className={`row`}>
                    {data.searchAPISearch.documents.map(document => {
                      return (
                        <div className={`col-lg-4 col-md-6`}>
                          <ProductCatalog product={{
                            entityUuid: document.productId,
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
          </div>
        );
      }}
    </Query>
  )
}

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
`

  return (
    <Query query={GET_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            {data.searchAPISearch.documents.map(document => {
              return (
                <div key={document.product_id} style={{
                  width: '33%',
                  maxWidth: '33%',
                  flex: '1 0 33%',
                  height: '250px',
                }}>
                  <div style={{
                    margin: '1rem',
                  }}>
                    <strong>{document.title}</strong>
                  </div>
                </div>
              )
            })}</div>
        );
      }}
    </Query>
  )
}

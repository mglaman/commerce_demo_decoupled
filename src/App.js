import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const GET_PRODUCTS = gql`
query{
  searchAPISearch(
    index_id: "products",
    range: {start: 0, end: 10},
    fulltext: {keys: "Print", fields: ["title"]}
    conditions: [
      {operator: "=", name: "special_name", value: ""}
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

class App extends Component {
  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;

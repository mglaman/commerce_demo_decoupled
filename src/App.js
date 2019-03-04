import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { graphqlClient } from './utils/api';
import Header from './blocks/Header';
import CatalogMenu from './blocks/CatalogMenu'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';

const catalogRoutes = [
  { path: 'apothecary', categoryName: 'Apothecary' },
  { path: 'audio-film', categoryName: 'Audio & Film' },
  { path: 'men', categoryName: 'Men' },
  { path: 'print-shop', categoryName: 'Print Shop' },
  { path: 'urban-living', categoryName: 'Urban Living' },
  { path: 'women', categoryName: 'Women' },
];

class App extends Component {
  render() {
    return (
      <ApolloProvider client={graphqlClient}>
        <Router>
          <div className="App">
            <Header />
            <CatalogMenu />
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route path={`/cart`} component={Cart} />
              {catalogRoutes.map(routeInfo => (
                <Route path={`/catalog/${routeInfo.path}`} render={(props) => <Catalog {...props} categoryName={routeInfo.categoryName} />} />
              ))}
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

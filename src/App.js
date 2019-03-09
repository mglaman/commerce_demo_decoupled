import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';
import { graphqlClient } from './utils/api';

import Header from './blocks/Header';
import CatalogMenu from './blocks/CatalogMenu'
import Footer from './blocks/Footer'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import { cartFetch, setCartToken } from './actions'
import CartFlyout from './blocks/CartFlyout'


const store = configureStore();
store.dispatch(setCartToken(localStorage.getItem('cartToken') || Math.random().toString(36).substr(2)))
store.dispatch(cartFetch());

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
      <Provider store={store}>
      <ApolloProvider client={graphqlClient}>
        <Router>
          <div className="App">
            <Header />
            <CatalogMenu />
            <Switch>
              <Route exact path={`/`} component={Home} />
              <Route path={`/cart`} component={Cart} />
              {catalogRoutes.map(routeInfo => (
                <Route key={routeInfo.path} path={`/catalog/${routeInfo.path}`} render={(props) => <Catalog {...props} categoryName={routeInfo.categoryName} />} />
              ))}
              <Route path={`/product/:productId`} component={Product} />
            </Switch>
            <Footer />
            <CartFlyout/>
          </div>
        </Router>
      </ApolloProvider>
      </Provider>
    );
  }
}

export default App;

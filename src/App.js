import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { graphqlClient } from './utils/api';
import Header from './blocks/Header';
import CatalogMenu from './blocks/CatalogMenu'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';

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
              <Route path={`/catalog/apothecary`} render={(props) => <Catalog {...props} categoryName={`Apothecary`} />} />
              <Route path={`/catalog/audio-film`} render={(props) => <Catalog {...props} categoryName={`Audio & Film`} />} />
              <Route path={`/catalog/men`} render={(props) => <Catalog {...props} categoryName={`Men`} />} />
              <Route path={`/catalog/print-shop`} render={(props) => <Catalog {...props} categoryName={`Print Shop`} />} />
              <Route path={`/catalog/urban-living`} render={(props) => <Catalog {...props} categoryName={`Urban Living`} />} />
              <Route path={`/catalog/women`} render={(props) => <Catalog {...props} categoryName={`Women`} />} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

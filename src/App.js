import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Main from './components/Main';
import TopNav from './components/TopNav';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Auth from './components/Auth';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <TopNav />
      <Switch>
        <Route path="/" exact component={Main} />
        {props.token ? (
          <>
            <Route path="/add-product" exact component={AddProduct} />
            <Route path="/cart" exact component={Cart} />
          </>
        ) : (
          <>
            <Route path="/register" exact component={Auth} />
            <Route path="/login" exact component={Auth} />
          </>
        )}
      </Switch>
    </div>
  );
}

App.propTypes = {
  token: propTypes.string,
  onLogout: propTypes.func,
};

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(App);

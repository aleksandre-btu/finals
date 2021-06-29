import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import TopNav from './components/TopNav';
import AddProduct from './components/AddProduct';
import Auth from './components/Auth';
import './App.css';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/add-product" exact component={AddProduct} />
        <Route path="/register" exact component={Auth} />
        <Route path="/login" exact component={Auth} />
      </Switch>
    </div>
  );
}

export default App;

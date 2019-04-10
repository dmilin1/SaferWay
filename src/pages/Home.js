import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './HomePage.js'
import LoginPage from './LoginPage.js'
import CheckoutPage from './CheckoutPage.js'
import ProductPage from './ProductPage.js'
import Navbar from './CustomNavbar.js'
import SearchPage from './SearchPage.js'

export default class Home extends Component {

  render() {
    return (
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Navbar />
          <Route exact path ="/" component = {HomePage}></Route>
          <Route path ="/login" component = {LoginPage}></Route>
          <Route path ="/product" component = {ProductPage}></Route>
          <Route path ="/checkout" component = {CheckoutPage}></Route>
          <Route path ="/search" component = {SearchPage}></Route>
        </div>
      </Router>
    );
  }
}

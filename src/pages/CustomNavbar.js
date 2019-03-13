import React, { Component } from 'react';
import './CustomNavbar.css';

export default class CustomNavbar extends Component {

  render() {
    return (
        <div className="topnav" >
            <a href="/login" to="/login"><i className="fa fa-user" aria-hidden="true"></i></a>
            <a href="/checkout" to="/checkout"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
            <a href="/product" to="/product"><i className="fa fa-cubes" aria-hidden="true"></i></a>
            <a href="/search" to="/search"><i className="fa fa-search" aria-hidden="true"></i></a>
            <a href="/" to="/">Home</a>
        </div>
    );
  }
}

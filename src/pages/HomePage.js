import React, { Component } from 'react';
import './HomePage.css';
import Navbar from './CustomNavbar.js'

export default class HomePage extends Component {
  render() {
    return (
    <div>
        <div className="container">

            <div className="box">
                <div className="icon"><i className="fa fa-user" aria-hidden="true"></i></div>
                <div className="content">
                  <a href="/login" to="/login">
                    <h3>Log In</h3>
                    <p>Log In</p>
                  </a>
                </div>
            </div>

            <div className="box">
                <div className="icon"><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                <div className="content">
                  <a href="/checkout" to="/checkout">
                    <h3>Checkout</h3>
                    <p>Checkout</p>
                  </a>
                </div>
            </div>

            <div className="box">
                <div className="icon"><i className="fa fa-search" aria-hidden="true"></i></div>
                <div className="content">
                  <a href="/#" to="/#">
                    <h3>search</h3>
                    <p>Search</p>
                  </a>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

import React, { Component } from 'react';
import './CheckoutPage.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
export default class CheckoutPage extends Component {

  render() {
    return (
      <div className = "AppS">
        <div className = "AppS__Aside">
          <label className="FormField__Label" htmlFor="name">Checkout Page
          </label>
        </div>
      </div>
    );
  }
}

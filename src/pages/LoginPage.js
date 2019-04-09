import React, { Component } from 'react';
import './LoginPage.css';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
//import axios from 'axios';

export default class LoginPage extends Component {
  render() {
    return (
      <Router>
        <div className="AppS">
          <div className="AppS__Aside">
            <h3 style={{color:"black", padding:"16px 0 38px 0"}}>Benefits of an account:</h3>
              <ul class="list-group" style={{color:"black"}}>
                <li class="list-group-item">
                  <h5>Permanent Shopping Cart <i class="fas fa-cart-plus" style={{margin:"0 0 0 8px"}}></i> </h5>
                  <p>Continue shopping from where you left off last time.</p>
                </li>
                <li class="list-group-item">
                  <h5>Shopping History <i class="fas fa-history" style={{margin:"0 0 0 8px"}}></i> </h5>
                  <p>View what items you've bought in the past.</p>
                </li>
                <li class="list-group-item">
                  <h5>Faster Checkout <i class="fas fa-shipping-fast" style={{margin:"0 0 0 8px"}}></i> </h5>
                  <p>Checkout your shopping cart faster and more easily.</p>
                </li>
                <li class="list-group-item">
                  <h5>Personal Info <i class="fas fa-user-check" style={{margin:"0 0 0 8px"}}></i></h5>
                  <p>Never enter your personal shipping info twice.</p>
                </li>
              </ul>
          </div>
          <div className="AppS__Form">
            <div className="PageSwitcher">
              <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item ">Sign Up</NavLink>
              <NavLink exact to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item  ">Sign In</NavLink>
            </div>
            <Route path="/sign-up" component={SignUpForm}>
            </Route>
            <Route exact path="/sign-in" component={SignInForm}>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

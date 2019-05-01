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
              <ul className="list-group" style={{color:"black"}}>
                <li className="list-group-item">
                  <h5 style={{color:"black", fontSize:"18px"}}>
                    Permanent Shopping Cart <i className="fas fa-cart-plus" style={{margin:"0 0 0 8px"}}></i>
                  </h5>
                  <p>Continue shopping from where you left off last time.</p>
                </li>
                <li className="list-group-item">
                  <h5 style={{color:"black", fontSize:"18px"}}>
                    Shopping History <i className="fas fa-history" style={{margin:"0 0 0 8px"}}></i>
                  </h5>
                  <p>View what items you've bought in the past.</p>
                </li>
                <li className="list-group-item">
                  <h5 style={{color:"black", fontSize:"18px"}}>
                    Faster Checkout <i className="fas fa-shipping-fast" style={{margin:"0 0 0 8px"}}></i>
                  </h5>
                  <p>Checkout your shopping cart faster and more easily.</p>
                </li>
                <li className="list-group-item">
                  <h5 style={{color:"black", fontSize:"18px"}}>
                    Personal Info <i className="fas fa-user-check" style={{margin:"0 0 0 8px"}}></i>
                  </h5>
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

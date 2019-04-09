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
            <img className="imgA"src="https://i.ibb.co/fGQqs3G/users.png"></img>
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

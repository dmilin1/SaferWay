import React, { Component } from 'react';
import './LoginPage.css';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import axios from 'axios';

export default class LoginPage extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     email: '',
  //     pass: ''
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  // handleChange(e) {
  //   let target = e.target;
  //   let value = target.type === 'checkbox' ? target.checked : target.value;
  //   let name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }
  // handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log(this.state.email,this.state.pass);
  //   await axios.post('//localhost:3000/login', {
  //     email: this.state.email,
  //     password: this.state.pass
  //   })
  //   .then(res=>{
  //     console.log(res.data);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  //   // this.onSignin(this.state.email, this.state.pass);
  //   // console.log('The form was submitted with the following data:');
  //   // console.log(this.state);
  // }
  render() {
    return (
      <Router>
        <div className="AppS">
          <div className="AppS__Aside">
          
            <Route exact path="/sign-in" component={SignInForm}>
            </Route>
          </div>
          <div className="AppS__Form">
          <div className="PageSwitcher">
              <NavLink exact to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item  ">Sign In</NavLink>
              <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item ">Sign Up</NavLink>
            </div>
            {/* <div className="FormTitle">
              <NavLink exact to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link ">Sign In</NavLink> or 
              <NavLink to="/sign-up"  activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div> */}
            <Route path="/sign-up" component={SignUpForm}>
            </Route>
          </div>
          </div>
      </Router>
    );
  }
}

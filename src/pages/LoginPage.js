import React, { Component } from 'react';
import './LoginPage.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignUpForm from './components/SignUpForm'
import axios from 'axios';

export default class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      pass: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = async(e) => {
    e.preventDefault();
    console.log(this.state.email,this.state.pass);
    await axios.post('//localhost:3000/login', {
      email: this.state.email,
      password: this.state.pass
    })
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
    // this.onSignin(this.state.email, this.state.pass);
    // console.log('The form was submitted with the following data:');
    // console.log(this.state);
  }
  render() {
    return (
      <Router>
        <div className="AppS">
          <div className="AppS__Aside">
            <div className="FormCenter">
              <form className="FormField" onSubmit={this.handleSubmit}>
                <label className="FormField__Label" htmlFor="name">Login</label>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="name">Email</label>
                  <input type="text" id="email" className="FormField__Input" placeholder="Enter Your Email" name="email" value={this.state.email}  onChange={this.handleChange}></input>
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="pass">Password</label>
                  <input type="text" id="pass" className="FormField__Input" placeholder="Enter Your Password" name="pass" value={this.state.pass}  onChange={this.handleChange}></input>
                </div>
                <div className="FormField">
                  <button className="FormField__Button" >Sign In</button>
                </div>
              </form>
            </div>
          </div>
          <div className="AppS__Form">
            <div className="PageSwitcher">
              <Link to="/login" className="PageSwitcher__Item  PageSwitcher__Item--Active">Sign In</Link>
              <Link to="/sign-up" className="PageSwitcher__Item">Sign Up</Link>
            </div>
            <Route path="/sign-up" component={SignUpForm}>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

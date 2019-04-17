import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';
import './SignInForm.css';

class SignInForm extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSignin = this.onSignin.bind(this);
    }
    onSignin = async(email, password) => {
        await axios.post('//localhost:3001/login', {
            email,
            password
        })
        .then(res=>{
            var loginState = { 'loggedin': true };
            localStorage.setItem('loginState', JSON.stringify(loginState));
            window.location.href = '/';
        })
        .catch(err=>{
            console.log(err);
        })
    }
      handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
          [name]: value,
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        this.onSignin(this.state.email, this.state.pass);
      }
    render(){
        return(
            <div className="Box">
                <form className="FormField" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">Email</label>
                    <input type="text" id="email" className="FormField__Input" placeholder="Enter Your Email" name="email" value={this.state.email}  onChange={this.handleChange}></input>
                  </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="pass">Password</label>
                    <input type="password" id="pass" className="FormField__Input" placeholder="Enter Your Password" name="pass" value={this.state.pass}  onChange={this.handleChange}></input>
                  </div>
                  <div className="FormField">
                    <button className="FormField__Button" >Sign In</button>
                  </div>
                </form>
            </div>
        );
    }
}

export default SignInForm;
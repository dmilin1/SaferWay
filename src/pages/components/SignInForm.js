import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';

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
        console.log('signin');
        console.log(email);
        console.log(password);
        await axios.post('//localhost:3000/signin', {
            email,
            password
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
      handleChange(e) {
          console.log('change');
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
          [name]: value,
        //   [address]: value,
        //   [phone]: value,
        //   [email]: value,
        //   [password]: value,
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        const res = this.onSignin(this.state.email, this.state.password);
        console.log(res);
        // console.log('The form was submitted with the following data:');
        // console.log(this.state);
      }
    render(){   
        return(
            <div className="FormCenter">
                <form className="FormField" onSubmit={this.handleSubmit}>
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
        );
    }
}

export default SignInForm;
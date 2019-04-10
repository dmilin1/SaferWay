import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

class SignUpForm extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            address: '',
            city: '',
            stateAddress: '',
            zip: '',
            phone: '',
            password: '',
            agree: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }
    onSignup = async(email, password,name,address,city,stateAddress,zip,phone) => {
        console.log('signup');
        console.log(name);
        console.log(address);
        console.log(city);
        console.log(stateAddress);
        console.log(zip);
        console.log(phone);
        console.log(email);
        console.log(password);
        await axios.post('//localhost:3000/signup', {
            name,
            address,
            city,
            stateAddress,
            zip,
            phone,
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
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        const res = this.onSignup(this.state.email, this.state.password, this.state.name, this.state.address, this.state.city, this.state.stateAddress, this.state.zip, this.state.phone);
        console.log(res);
        // console.log('The form was submitted with the following data:');
        // console.log(this.state);
      }
    render(){
        return(
                <div className="FormCenter">
                    <div className="BoxSignUp">
                    <form className="FormField" onSubmit={this.handleSubmit}>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="name">Full Name</label>
                            <input type="text" id="name" className="FormField__Input" placeholder="Enter Your Full Name" name="name" value={this.state.name} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="address">Full Address</label>
                            <input type="text" id="address" className="FormField__Input" placeholder="Enter Your Full Address" name="address" value={this.state.address} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="city">City</label>
                            <input type="text" id="city" className="FormField__Input" placeholder="Enter Your City" name="city" value={this.state.city} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="stateAddress">State</label>
                            <input type="text" id="stateAddress" className="FormField__Input" placeholder="Enter Your State" name="stateAddress" value={this.state.stateAddress} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="zip">ZIP Code</label>
                            <input type="text" id="zip" className="FormField__Input" placeholder="Enter Your ZIP Code" name="zip" value={this.state.zip} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="phone">Phone</label>
                            <input type="text" id="phone" className="FormField__Input" placeholder="Enter Your Phone Number" name="phone" value={this.state.phone} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="FormField__Input" placeholder="Enter Your Email" name="email" value={this.state.email} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter Your Password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                        </div>
                        <label className="FormField__CheckboxLabel">
                            <input className="FormField__Checkbox" type="checkbox" name="agree" value={this.state.agree} onChange={this.handleChange}/> I agree all statements in<a href="" className="FormField__TermsLink">terms of service</a>
                            <div className="FormField">
                                <button className="FormField__Button" >Sign Up</button>
                            </div>
                        </label>
                    </form>
                    </div>
                </div>
        );
    }
}

export default SignUpForm;

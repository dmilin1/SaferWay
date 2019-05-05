import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';
import Pdf from './TermsConditions.pdf';

export default class SignUpForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            address: '',
            phone: '',
            password: '',
            agree: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSignup = this.onSignup.bind(this);

    }
    onSignup = async(email, password,name,address,phone) => {
        console.log('signup');
        await axios.post('//localhost:3001/signup', {
            name,
            address,
            phone,
            email,
            password
        })
        .then(res=>{
            console.log(res.data);
            this.setState(()=>{
                return{
                    email: '',
                    name: '',
                    address: '',
                    phone: '',
                    password: '',
                    agree: false
                }
            }, ()=>{

            })
            window.location.href = '/product'
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
        this.onSignup(this.props.email, this.state.password, this.state.name, this.props.address, this.props.phone);

        // console.log('The form was submitted with the following data:');
        // console.log(this.state);
      }
    render(){
        return(
                <div className="FormCenter">
                    <div className="BoxSignUp">
                    <form className="FormField" onSubmit={(e)=>{this.handleSubmit(e)}}>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="name">Full Name</label>
                            <input type="text" id="name" className="FormField__Input" placeholder="Enter Your Full Name" name="name"  value={this.state.name} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="address">Full Address</label>
                            <input type="text" id="address" className="FormField__Input" placeholder="Enter Your Full Address" name="address" value={this.state.address} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="phone">Phone</label>
                            <input type="text" id="phone" className="FormField__Input" placeholder="Enter Your Phone Number" name="phone"  value={this.state.phone} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="FormField__Input" placeholder="Enter Your Email" name="email"  value={this.state.email} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter Your Password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                        </div>
                        <label className="FormField__CheckboxLabel">
                            <input className="FormField__Checkbox" type="checkbox" name="agree" value={this.state.agree} onChange={this.handleChange}/> I agree all to statements in the
                            <a href = {Pdf} target = "_blank" className = "FormField__TermsLink">Terms and Conditions</a>
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

import React, { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            pass: '',
            agree: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.onSignup = this.onSignup.bind(this);
    }
    onSignup = async(email, password) => {
        console.log('signup');
        console.log(email);
        console.log(password);
        await axios.post('//localhost:3000/signup', {
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
          [name]: value
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        const res = this.onSignup(this.state.email, this.state.pass);
        console.log(res);
        // console.log('The form was submitted with the following data:');
        // console.log(this.state);
      }
    render(){   
        return(
            <div>
                <div className="FormCenter">
                    <form className="FormField" onSubmit={this.handleSubmit}>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="name">Full Name</label>
                            <input type="text" id="name" className="FormField__Input" placeholder="Enter Your Full Name" name="name" value={this.state.name} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">Email</label>
                            <input type="text" id="email" className="FormField__Input" placeholder="Enter Your Email" name="email" value={this.state.email} onChange={this.handleChange}></input>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="pass">Password</label>
                            <input type="text" id="pass" className="FormField__Input" placeholder="Enter Your Password" name="pass" value={this.state.pass} onChange={this.handleChange}></input>
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
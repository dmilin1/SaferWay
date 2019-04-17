import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

class UserProfile extends Component{
    constructor() {
        super();
    }
   onClick = () =>{
       var loginState = { 'loggedin': false };
       localStorage.setItem('loginState', JSON.stringify(loginState));
       window.location.href='/';
   }
    render(){
        return(
            <div id="user-profile">
                <h1>USER PROFILE</h1>
                <button onClick={this.onClick}>logout</button>
            </div>
        );
    }
}

export default UserProfile;

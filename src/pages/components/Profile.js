import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

class UserProfile extends Component{
    constructor() {
        super();
        var loginState = JSON.parse(localStorage.getItem('loginState'));

          if(!loginState.loggedin){
            window.location.href='/login#/sign-in';
          }
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

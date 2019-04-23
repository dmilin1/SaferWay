import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';

class LogoutButton extends Component{
    constructor() {
        super();
    }
   logout = () =>{
       var loginState = { 'loggedin': false };
       localStorage.setItem('loginState', JSON.stringify(loginState));
       window.location.href='/product';
   }
    render(){
        return(
            <div>
                <button className="btn btn-danger" style={{margin:"0 0 0 1em"}} onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default LogoutButton;

import React, { Component } from 'react';
import './CustomNavbar.css';

export default class CustomNavbar extends Component {
  onClick = () => {
    window.location.href='/login#/sign-in';
    var loginState = JSON.parse(localStorage.getItem('loginState'));

      if(loginState.loggedin){
        window.location.href='/profile';
      }else{
        window.location.href='/login#/sign-in';
      }
  }
    render () {
        return (
          <div className="navbar navbar-expand-lg sticky-top navbar-light bg-light" style={{ minHeight:66, boxShadow: '0px 1px 10px #c1c1c1'}}>
            <img className="navbar-brand" href="#" src="https://i.ibb.co/Fz04SyP/1.png" height="50px" width="200px" />

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mx-auto">

                <li className="nav-item">
                  <a href="/" to="/" className="nav-link" style={{ align:"right"}}>
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fa fa-home fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -9px", color:"#7c7c7d"}}>Home</p></li>
                    </ul>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/product" to="/product" className="nav-link">
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fas fa-pizza-slice fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -20px", color:"#7c7c7d"}}>Products</p></li>
                    </ul>
                  </a>
                </li>

                <li className="nav-item">
                  {
                    <button className="nav-link" onClick={this.onClick}>
                      <ul style={{ listStyleType: "none" }}>
                        <li><i className="fa fa-user fa-lg"></i></li>
                        <li><p style={{ margin: "0 0 -16px -7px", color: "#7c7c7d" }}>User</p></li>
                      </ul>
                    </button>
                  }
                </li>

                <li className="nav-item">
                  <a href="/checkout" to="/checkout" className="nav-link" >
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></li>
                      <li><p style={{margin:"0 0 -16px 0", color:"#7c7c7d"}}>Cart</p></li>
                    </ul>
                  </a>
                </li>

              </ul>

              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" id="searchValue"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => {
                  console.log(document.getElementById("searchValue").value);
                  window.location.href = "/product?search=" + document.getElementById("searchValue").value;
                }}>
                  Search
                </button>
              </form>
            </div>
          </div>
        );
    }
}
import React, { Component } from 'react';
import './CustomNavbar.css';
//import SearchModal from './components/SearchModal';

export default class CustomNavbar extends Component {

  constructor() {
        super();

        this.state = {
            isShowing: false
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

    render () {
        return (
          <div class="navbar navbar-expand-lg navbar-light bg-light" style={{ minHeight: 66 }}>
            <img class="navbar-brand" href="#" src="https://i.ibb.co/Fz04SyP/1.png" height="50px" width="200px" />

            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mx-auto">

                <li class="nav-item">
                  <a href="/" to="/" class="nav-link" style={{ align:"right"}}>
                    <ul style={{listStyleType:"none"}}>
                      <li><i class="fa fa-home fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -9px"}}>Home</p></li>
                    </ul>
                  </a>
                </li>

                <li class="nav-item">
                  <a href="/product" to="/product" class="nav-link">
                    <ul style={{listStyleType:"none"}}>
                      <li><i class="fas fa-pizza-slice fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -20px"}}>Products</p></li>
                    </ul>
                  </a>
                </li>

                <li class="nav-item">
                  <a href="/login#/sign-in" to="/login" class="nav-link" >
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fa fa-user fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -7px"}}>User</p></li>
                    </ul>
                  </a>
                </li>

                <li class="nav-item">
                  <a href="/checkout" to="/checkout" class="nav-link" >
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></li>
                      <li><p style={{margin:"0 0 -16px 0"}}>Cart</p></li>
                    </ul>
                  </a>
                </li>

              </ul>

              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        );

    }
}

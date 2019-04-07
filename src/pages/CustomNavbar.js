import React, { Component } from 'react';
import './CustomNavbar.css';
import SearchModal from './components/SearchModal';

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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <img class="navbar-brand" href="#" src="https://i.ibb.co/Fz04SyP/1.png" height="50px" width="200px" />

            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mx-auto">

                <li class="nav-item">
                  <a href="/" to="/" class="nav-link" style={{margin:'0 1em', align:"right"}} ><i class="fa fa-home fa-lg"></i></a>
                </li>

                <li class="nav-item">
                  <a href="/product" to="/product" class="nav-link" style={{margin:'0 1em'}}><i class="fas fa-pizza-slice fa-lg"></i></a>
                </li>

                <li class="nav-item">
                  <a href="/login#/sign-in" to="/login" class="nav-link" style={{margin:'0 1em'}}><i className="fa fa-user fa-lg" aria-hidden="true"></i></a>
                </li>

                <li class="nav-item">
                  <a href="/checkout" to="/checkout" class="nav-link" style={{margin:'0 1em'}}><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
        );

    }
}

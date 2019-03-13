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
          <div className="topnav" >
              <a href="/login" to="/login"><i className="fa fa-user" aria-hidden="true"></i></a>
              <a href="/checkout" to="/checkout"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
              <a href="/product" to="/product"><i className="fa fa-cubes" aria-hidden="true"></i></a>
              <a href="/" to="/">Home</a>
              <div>
                  { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                  <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>

                  <SearchModal
                      className="modal"
                      show={this.state.isShowing}
                      close={this.closeModalHandler}>
                      <form>
                        <input type="text" placeholder="Search..." />
                        <input type="submit" value="Submit" />
                      </form>
                  </SearchModal>
              </div>
          </div>
        );

    }
}

import React, { Component } from 'react';
import './HomePage.css';
//import Navbar from './CustomNavbar.js'

export default class HomePage extends Component {

  openLink(link) {
    console.log(link)
    window.location.href = link;
  }

  render() {
    return (
    <div>
        <div className="container">

            <div className="box" onClick={() => this.openLink("product?category=fruit")}>
                <div className="icon"><i className="fa fa-apple-alt"></i></div>
                <div className="content">
                    <h3>Fruits</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=vegetable")}>
                <div className="icon"><i className="fa fa-carrot"></i></div>
                <div className="content">
                    <h3>Vegetables</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=dairy")}>
                <div className="icon"><i class="fa fa-cheese"></i></div>
                <div className="content">
                    <h3>Dairy</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=frozen")}>
                <div className="icon"><i className="fa fa-ice-cream"></i></div>
                <div className="content">
                    <h3>Frozen Foods</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=deli")}>
                <div className="icon"><i className="fa fa-drumstick-bite"></i></div>
                <div className="content">
                    <h3>Deli</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=alcohol")}>
                <div className="icon"><i className="fa fa-diagnoses"></i></div>
                <div className="content">
                    <h3>Personal Health</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=drinks")}>
                <div className="icon"><i class="fa fa-glass-whiskey"></i></div>
                <div className="content">
                    <h3>Drinks</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=snacks")}>
                <div className="icon"><i className="fa fa-cookie-bite"></i></div>
                <div className="content">
                    <h3>Snacks</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("product?category=cleaning")}>
                <div className="icon"><i className="fa fa-toilet-paper"></i></div>
                <div className="content">
                    <h3>Household Items</h3>
                </div>
            </div>

        </div>
    </div>
    );
  }
}

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

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-apple-alt"></i></div>
                <div className="content">
                    <h3>Fruits</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-carrot"></i></div>
                <div className="content">
                    <h3>Vegetables</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-egg"></i></div>
                <div className="content">
                    <h3>Dairy</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-ice-cream"></i></div>
                <div className="content">
                    <h3>Frozen Foods</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-drumstick-bite"></i></div>
                <div className="content">
                    <h3>Deli</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-diagnoses"></i></div>
                <div className="content">
                    <h3>Personal Health</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-bread-slice"></i></div>
                <div className="content">
                    <h3>Baked Goods</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-cookie-bite"></i></div>
                <div className="content">
                    <h3>Snacks</h3>
                </div>
            </div>

            <div className="box" onClick={() => this.openLink("#")}>
                <div className="icon"><i class="fa fa-toilet-paper"></i></div>
                <div className="content">
                    <h3>Household Items</h3>
                </div>
            </div>

        </div>
    </div>
    );
  }
}

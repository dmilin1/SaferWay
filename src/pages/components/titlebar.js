import React, { Component } from 'react';
import './titlebar.css'
import Dropdown from './dropdown'
import logo from "./../../images/1.png"
console.log(logo)


export default class TitleBar extends Component {
  constructor(){
      super();

      this.state = {
      }

    }


  render() {
    return (
      <div className="titlebar">
        <img src={logo} alt="SaferWay"/>
        <Dropdown/> {/* uses the dropdown component in the menubar */}
      </div>
    );
  }
}

import React, { Component } from 'react';
import TitleBar from './components/titlebar.js'

export default class HomePage extends Component {
  constructor(){
      super();

      this.state = {
      }
    }

  render() {
    return (
      <div>
        <TitleBar/>
      </div>
    );
  }
}

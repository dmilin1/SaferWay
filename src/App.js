import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home.js'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Home/>
      </div>
    );
  }
}

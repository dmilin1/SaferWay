import React, { Component } from 'react';

export default class ProductPopup extends Component {

  render() {
    console.log(this.props.product)
    return (
      <div
      style={{
        position: 'absolute',
        backgroundColor: 'green',
        width: "100%",
        height: "100%",
        zIndex: 100,
        display: this.props.product ? 'flex' : 'none',
      }}>



      </div>
    );
  }
}


const styles = {
  main: {
    position: 'absolute',
    backgroundColor: 'green',
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
}

import React, { Component } from 'react';

export default class ProductPopup extends Component {

  render() {
    return (
      <div
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 100,
        display: this.props.product ? 'flex' : 'none',
      }}>

        <img className="productImg" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg'} style={styles.productImg}/>

        <div style={styles.exitButton} onClick={this.props.closeWindow}>
        X
        </div>


      </div>
    );
  }
}


const styles = {
  exitButton: {
    fontSize: 20,
    fontWeight: 900,
    padding: 10,
  },
  productImg: {
    alignSelf: 'center',
  }
}

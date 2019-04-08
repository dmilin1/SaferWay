import React, { Component } from 'react';

export default class ProductPopup extends Component {

  render() {
    return (
      <div
      style={{
        zIndex: 100,
        display: this.props.product ? 'flex' : 'none',
        flex: 1,
      }}>
        <div style={styles.exitButton} onClick={this.props.closeWindow}>
        X
        </div>
        <ProductContainer/>
      </div>
    );
  }
}

class ProductContainer extends Component {
  render () {
    return (
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <img className="productImg" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg'} style={styles.productImg}/>
        </div>
        <div style={styles.rightColumn}>
          <div style={{ backgroundColor: 'green', height: 100, width: 100 }}/>
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
    position: 'absolute',
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  leftColumn: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  rightColumn: {
    display: 'flex',
    flexGrow: 2,
    justifyContent: 'center',
  },
  productImg: {
    alignSelf: 'center',
  }
}

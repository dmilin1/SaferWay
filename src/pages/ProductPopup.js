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
          <div style={styles.titleText}>
            Milk -{" "}
            <span style={styles.priceText}>
              $1.99
            </span>
          </div>
          <div style={styles.descriptionText}>
            Milk is a liquid that comes out of mamals and for some weird reason, humans drink the liquid that comes out of cows. This particular milk is cow liquid. Please enjoy.
          </div>
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
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  leftColumn: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  rightColumn: {
    display: 'flex',
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: '10%',
  },
  productImg: {
    alignSelf: 'center',
    width: '80%',
    paddingHorizontal: '10%',
    borderRadius: 10,
  },
  titleText: {
    fontSize: '5vw',
    textAlign: 'center',
    fontFamily: 'Heebo',
  },
  descriptionText: {
    fontFamily: 'Roboto',
    fontSize: '1.8vw',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#CCC',
    borderStyle: 'solid',
    padding: 5,
  },
  horizontalBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#CCC',
    alignSelf: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontFamily: 'Lato',
    fontSize: '4.5vw',
    fontWeight: 300,
  },
}

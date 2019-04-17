import React, { Component } from 'react';
import './ProductPopup.css';

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
        <ProductContainer images={this.props.images} product={this.props.product}/>
      </div>
    );
  }
}

class ProductContainer extends Component {
  render () {
    console.log(this.props.images)
    return (
      this.props.product ? (
        <div style={styles.container}>
          <div style={styles.leftColumn}>
            <img className="productImg" src={this.props.images[this.props.product.picPath.split('/⁨productPics⁩/')[1]]} style={styles.productImg}/>
          </div>
          <div style={styles.rightColumn}>
            <div style={styles.titleText}>
              {this.props.product.name} -{" "}
              <span style={styles.priceText}>
                ${this.props.product.price}
              </span>
            </div>
            <div style={styles.descriptionText}>
              Milk is a liquid that comes out of mamals and for some weird reason, humans drink the liquid that comes out of cows. This particular milk is cow liquid. Please enjoy.
            </div>
            <div className="addToCart" style={styles.addToCart}>
              Add To Cart
            </div>
          </div>
        </div> )
      : (null)
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
    alignItems: 'center',
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
  addToCart: {
  },
}

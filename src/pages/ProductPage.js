import React, { Component } from 'react';
import './ProductPage.css';
import ProductPopup from './ProductPopup.js'

export default class ProductPage extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedProduct : null };
  }

  loadProducts = () => {
    var productList = []
    for (var i = 0; i < 20; i++) {
      productList.push(
        <Product
          imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
          alt="milk"
          title="Milk"
          price="$1.99"
          productClicked={this.productClicked}
        />
      )
    }
    return productList
  }

  productClicked = (theProduct) => {
    this.setState({ selectedProduct : theProduct })
  }

  closeWindow = () => {
    this.setState({ selectedProduct : null })
  }

  render() {
    return (
      <div>
        <ProductPopup product={this.state.selectedProduct} closeWindow={this.closeWindow}/>
        <div style={{ display : !this.state.selectedProduct ? 'flex' : 'none' }} className="componentList">
          {this.loadProducts()}
        </div>
      </div>
    );
  }
}


class Product extends Component {

  handleClick = (event) => {
    this.props.productClicked("this should be the product ID");
  }

  render() {
    return(
      <div style={styles.productContainer}>
        <div className="overlayContainer" onClick={this.handleClick}>
          <div className="imageOverlay" style={styles.imageOverlay}/>
          <div className="productTitle" style={styles.productTitle}>
          {this.props.title}
          </div>
          <div className="productPrice" style={styles.productPrice}>
          {this.props.price}
          </div>
        </div>
        <img className="productImg" src={this.props.imgsrc} alt={this.props.alt} style={styles.productImg}/>
      </div>
    )
  }
}

const styles = {
  productContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20vw',
    margin: '2vw',
    position: 'relative',
    overflow: 'hidden',
  },
  imgContainer: {
  },
  productImg: {
    width: '100%',
    borderRadius: '2vw',
  },
  imageOverlay: {
    borderRadius: '2vw',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  productTitle: {
    position: 'absolute',
    zIndex: 1,
    fontSize: '5vw',
    pointerEvents: 'none',
    fontFamily: 'Roboto',
    fontWeight: '300',
  },
  productPrice: {
    position: 'absolute',
    zIndex: 1,
    fontSize: '2vw',
    paddingTop: '18vw',
    pointerEvents: 'none',
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
}

import React, { Component } from 'react';
import './ProductPage.css';

export default class ProductPage extends Component {

  loadProducts = () => {
    var productList = []
    for (var i = 0; i < 20; i++) {
      productList.push(
        <Product
          imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
          alt="milk"
          title="Milk"
          price="$1.99"
        />
      )
    }
    return productList
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <div className="componentList">
          {this.loadProducts()}
=======
        <div>
          <div  htmlFor="name">
            <h1 style={{margin:"20px 135px"}}>Products</h1>
            <div className="componentList">
              {this.loadProducts()}
            </div>
          </div>
>>>>>>> 388cffd3c1265771c20fc783aa76a06b46821c7c
        </div>
      </div>
    );
  }
}


class Product extends Component {
  render() {
    return(
      <div style={styles.productContainer}>
        <div className="overlayContainer">
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

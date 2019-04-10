import React, { Component } from 'react';
import './ProductPage.css';
import ProductPopup from './ProductPopup.js'
const axios = require('axios');

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./../productPics', false, /\.(png|jpe?g|svg)$/));


export default class ProductPage extends Component {

  state = {
    selectedProduct : null,
    products: null,
  };

<<<<<<< HEAD
   componentDidMount() {

     var productList = []

     axios.get('/api/getAllProducts')
     .then(function (res) {
       // handle success
       console.log(res);
       var products = res.data;

       for (var i = 0; i < products.length; i++) {
         console.log(products[i].picPath.split('/⁨productPics⁩/')[1])
         productList.push(
           <Product
             imgsrc={images[products[i].picPath.split('/⁨productPics⁩/')[1]]}
             alt="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
             title="Milk"
             price="$1.99"
             // productClicked={this.productClicked}
           />
         )
       }

     })
     .catch(function (error) {
       // handle error
       console.log(error);
     })
     .then(() => {
       console.log(productList)
       this.setState({
         products: productList
       })
     });
   }
=======
  loadProducts = () => {
    var productList = []
    for (var i = 0; i < 20; i++) {
      productList.push(
        <Product
          key={i.toString()}
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
>>>>>>> 2c49525384894e9e266ffab9608e96e8b6904f27

  productClicked = (theProduct) => {
    this.setState({ selectedProduct : theProduct })
  }

  closeWindow = () => {
    this.setState({ selectedProduct : null })
  }

  render() {
    return (
      <React.Fragment>
        <ProductPopup product={this.state.selectedProduct} closeWindow={this.closeWindow}/>
        <div style={{ display : !this.state.selectedProduct ? 'flex' : 'none' }} className="componentList">
          {this.state.products}
        </div>
      </React.Fragment>
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

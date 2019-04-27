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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}


export default class ProductPage extends Component {

  state = {
    selectedProduct : null,
    products: null,
  };

   componentDidMount() {

     var productList = []

     axios.post('/api/getProductsSearch', {
       search: getUrlParam('search', null),
       category: getUrlParam('category', null),
       aisle: getUrlParam('aisle', null)
     })
     .then((res) => {
       // handle success
       console.log(res);
       var products = res.data;

       for (var i = 0; i < products.length; i++) {
         console.log(products[i].picPath.split('/⁨productPics⁩/')[1])
         productList.push(
           <Product
             imgsrc={images[products[i].picPath.split('/⁨productPics⁩/')[1]]}
             alt="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
             title={products[i].name}
             price={'$'+products[i].price}
             product={products[i]}
             productClicked={this.productClicked}
           />
         )
       }

       for (var i = 0; i < productList.length % 4; i++) {
         productList.push(
           <div
           style={{
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             width: '20vw',
             margin: '2vw',
             position: 'relative',
             overflow: 'hidden',
             borderWidth: 2,
           }}
           />
         )
       }

     })
     .catch((error) => {
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

  productClicked = (theProduct) => {
    this.setState({ selectedProduct : theProduct })
  }

  closeWindow = () => {
    this.setState({ selectedProduct : null })
  }

  render() {
    return (
      <React.Fragment>
        <ProductPopup images={images} product={this.state.selectedProduct} closeWindow={this.closeWindow}/>
        <div style={{ display : !this.state.selectedProduct ? 'flex' : 'none' }} className="componentList">
          {this.state.products}
        </div>
      </React.Fragment>
    );
  }
}

class Product extends Component {

  handleClick = (event) => {
    this.props.productClicked(this.props.product);
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
    borderWidth: 2,
    borderColor: '#909090',
    borderStyle: 'solid',
    borderRadius: 10,
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
    textAlign: 'center',
    lineHeight: '5vw',
  },
  productPrice: {
    position: 'absolute',
    zIndex: 1,
    fontSize: '2vw',
    pointerEvents: 'none',
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
}

import React, { Component } from 'react';
import './ProductPopup.css';
const axios = require('axios');

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
        <i className="fas fa-chevron-left fa-2x" style={{margin:".5em"}}></i>
        </div>
        <ProductContainer images={this.props.images} product={this.props.product}/>
      </div>
    );
  }
}

class ProductContainer extends Component {

  state = {
    count: 1,
  };

  addToCart = () => {
    try {
      var loginState = JSON.parse(localStorage.getItem('loginState')).loggedin;
      var account = JSON.parse(localStorage.getItem('account'));
      console.log(account._id);
    } catch {
      var loginState = false;
    }

    if (loginState == true) {
      axios.post('/api/getCart', {
        id: account
      })
      .then((res) => {
        var cart = res.data.products;
        if (cart == undefined) {cart = {}}
        if (cart[this.props.product.name]) {
          cart[this.props.product.name].count += this.state.count;
        } else {
          cart[this.props.product.name] = { count: this.state.count }
        }
        console.log(cart)

        axios.post('/api/setCart', {
          id: account,
          products: cart,
        })
        .then((res) => {
          window.location.href = window.location.href;
        })
        .catch((error) => {
          console.log(error);
        });

      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      var cart = JSON.parse(localStorage.getItem('cart'))
      if (cart == null) {cart = {}}
      if (cart[this.props.product.name]) {
        cart[this.props.product.name].count += this.state.count;
      } else {
        cart[this.props.product.name] = { count: this.state.count }
      }
      console.log(cart)
      localStorage.setItem('cart', JSON.stringify(cart));
    }

  }

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
              Category: <span style={styles.descriptionDataText}>{this.props.product.category}</span>
              <br/>
              Aisle: <span style={styles.descriptionDataText}>{this.props.product.aisle}</span>
              <br/>
              Size: <span style={styles.descriptionDataText}>{this.props.product.size}</span>
              <br/>
            </div>
            <div style={{ flexDirection: 'row', marginTop: 15, }}>
              <input type="button" value="-" id="minus" style={{width: 30, marginRight: 20}} onClick={() => {this.setState({count: Math.max(this.state.count-1,1)})}}/>
              {this.state.count}
              <input type="button" value="+" id="plus" style={{width: 30, marginLeft: 20}} onClick={() => {this.setState({count: this.state.count+1})}}/>
            </div>
            <div className="addToCart" style={styles.addToCart} onClick={this.addToCart}>
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
    fontWeight: 500,
  },
  descriptionDataText: {
    fontFamily: 'Roboto',
    fontSize: '1.8vw',
    float: 'right',
    paddingLeft: 40,
    minWidth: 100,
    textAlign: 'center',
    fontWeight: 300,
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

//example push

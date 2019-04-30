import React, { Component } from 'react';
import Popup from './components/Popup';
import {Button} from 'react-bootstrap';
import './CheckoutPage.css';
import './ProductPage.css';
const axios = require('axios');

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./../productPics', false, /\.(png|jpe?g|svg)$/));

export default class CheckoutPage extends Component {

  constructor() {
    super();
    this.state = {
      shoppingBag: [],
      cartData: [],
      name: "Gregory Mayo",
      phone: 9259111234,
      address: "235 Camelback Road",
      city: "San Jose",
      stateAddress: "California",
      zip: 925116,
      shippingOption: 0,
      loginState: false,
      account: null,
    }
      this.showGuestPopup = this.showGuestPopup.bind(this);
      this.closeGuestPopup = this.closeGuestPopup.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangeAddress = this.handleChangeAddress.bind(this);
      this.handleChangeLastName = this.handleChangeLastName.bind(this);
      this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    }

    placeOrder = () => {

      axios.post('/api/setCart', {
        id: this.state.account,
        cart: {},
      })
      .then((res) => {

        axios.post('/api/addToHistory', {
          id: this.state.account,
          cart: this.state.cartData,
        })
        .then((res) => {
          this.setState({orderPlaced: true})
        })
        .catch((error) => {
          console.log(error);
        })

      })
      .catch((error) => {
        console.log(error);
      })
    }

    increaseProduct = (productQuantity) => {
      this.setState({ productQuantity: this.state.productQuantity + 1 });
    }
    decreaseProduct = (productQuantity) => {
      if(this.state.productQuantity < 2){
        return
      } else {
        this.setState({ productQuantity: this.state.productQuantity - 1 });
      }
    }

    removeProduct() {
      //this.setState({ quantity: this.state.quantity.filter(quantity => quantity == 0)});
    }
    showGuestPopup(){
      this.setState({
        showGuestCheckoutForm: true
      });
    }

    closeGuestPopup(){
      this.setState({
        showGuestCheckoutForm: false
      });
    }

    closeSuccessPopup(){
      this.setState({
        orderPlaced: false
      });
      this.props.history.push("/");
    }

    handleChangeFirstName(event) {
      this.setState({
        firstName: event.target.value
      });
    }

    handleChangeLastName(event) {
      this.setState({
        lastName: event.target.value
      });
    }

    handleChangeAddress(event) {
      this.setState({
        address: event.target.value
      });
    }

    handleChangeEmail(event) {
      this.setState({
        email: event.target.value
      });
    }

    handleChangePhone(event) {
      this.setState({
        phone: event.target.value
      });
    }

    handleSubmit(event) {
      if(this.state.firstName==='' || this.state.lastName==='' || this.state.address==='' || this.state.email==='' || this.state.phone===''){
        alert("Can't leave any field blank");
      }
      else{
        this.setState({
          orderPlaced: true
        })
      }
      event.preventDefault();
    }

    setShipping = (type) => {
      this.setState({
        shippingOption: type,
      })
    }

   formatMoney = (num) => {
     var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
     return num.toString().match(re)[0];
   }

   removeProduct = (e) => {
     var removeObj = e.currentTarget.dataset.value;

     if (this.state.loginState) {

       axios.post('/api/getCart', {
         id: this.state.account
       })
       .then((res) => {
         var products = res.data.products;
         delete products[removeObj];

         axios.post('/api/setCart', {
           id: this.state.account,
           products: products
         })
         .then((res) => {
           window.location.href = '/checkout';
         })
         .catch((error) => {
           console.log(error);
         })

       })
       .catch((error) => {
         console.log(error);
       })

     } else {
       var products = JSON.parse(localStorage.getItem('cart'));
       delete products[removeObj];
       localStorage.setItem('cart', JSON.stringify(products));
       window.location.href = '/checkout';
     }
   }

    prepRender = (products) => {
      var productList = []
      console.log(products)
      for (var i = 0; i < products.length; i++) {

        productList.push(
          <div>
            <div className="cart-item-img col-xs-height col-xs-4 col-md-4 col-lg-3 col-top">
                <img className="productCheckout imageResponsive"src={images[products[i].picPath.split('/⁨productPics⁩/')[1]]} alt={products[i].alt}></img>
            </div>
            <div className="cart-item-info col-xs-height col-xs-8 col-md-8 col-lg-9 col-top">
              <div className="cart-item-info-container container-xs-height">
                <div className="cart-item-info-text col-xs-height col-xs-12 col-top">
                  <h4>{products[i].name}</h4>
                  <div className="cart-item-price">
                    <h4>${this.formatMoney(products[i].count*products[i].price)}</h4>
                  </div>
                  <div className="cart-item-product-details">
                    <h5>Quantity: {products[i]['count']}</h5>
                    <ul className="list-inline __ef422">
                    <li>
                        <button><i className="fa fa-plus" aria-hidden="true"></i></button>
                        <button><i className="fa fa-minus" aria-hidden="true"></i></button>
                        <button data-value={products[i].name} onClick={(e) => this.removeProduct(e)}> <i className="fa fa-times" aria-hidden="true"></i></button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
        )
      }
      this.setState({
        shoppingBag: productList,
        cartData: products,
      })
    }

    componentDidMount() {


      try {
        var loginState = JSON.parse(localStorage.getItem('loginState')).loggedin;
        var account = JSON.parse(localStorage.getItem('account'));
        this.setState({
          loginState: loginState,
          account: account,
        })

        axios.post('/api/getAccount', {
          id: account._id
        })
        .then((res) => {
          this.setState({
            name: res.data.name,
            address: res.data.address,
          })
        })
        .catch((error) => {
          console.log(error);
        })

        console.log(account._id);
      } catch {
        var loginState = false;
      }

      if (loginState == true) {
        axios.post('/api/getCart', {
          id: account
        })
        .then((res) => {
          var products = res.data.products;
          console.log(products);

          axios.post('/api/getDetailedCart', {
            cart: products
          })
          .then((res) => {
            var products = res.data;
            console.log(products);
            this.prepRender(products)
          })
          .catch((error) => {
            console.log(error);
          })

        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        var products = JSON.parse(localStorage.getItem('cart'));
        axios.post('/api/getDetailedCart', {
          cart: products
        })
        .then((res) => {
          var products = res.data;
          console.log(products);

          this.prepRender(products)
        })
        .catch((error) => {
          console.log(error);
        })
      }

    }

   render() {

     function formatMoney(num) {
          var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
          return num.toString().match(re)[0];
      }

     var merchandiseTotal = 0;
     for (var i = 0; i < this.state.cartData.length; i++) {
       merchandiseTotal += this.state.cartData[i].count * this.state.cartData[i].price
     }
     merchandiseTotal = formatMoney(merchandiseTotal);

     if (this.state.shippingOption == 0) {
       var shippingTotal = '0.00';
     } else if (this.state.shippingOption == 1) {
       var shippingTotal = '7.00';
     } else if (this.state.shippingOption == 2) {
       var shippingTotal = '15.00';
     } else if (this.state.shippingOption == 3) {
       var shippingTotal = '20.00';
     }

     var taxTotal = formatMoney(merchandiseTotal * 0.09);

     var totalTotal = formatMoney(parseFloat(merchandiseTotal)*0.9 + parseFloat(shippingTotal) + parseFloat(taxTotal));


     var myForm = (
       <form className="myForm" style={{color:'black'}} onSubmit={this.handleSubmit}>
          First name:
          <input type="text" name="firstName" onChange={this.handleChangeFirstName}/>
          <br/>
          Last name:
          <input type="text" name="lastName" onChange={this.handleChangeLastName}/>
          <br/>
          Address:
          <input type="text" name="address" onChange={this.handleChangeAddress}/>
          <br/>
          Email:
          <input type="text" name="email" onChange={this.handleChangeEmail}/>
          <br/>
          Phone:
          <input type="text" name="phone" onChange={this.handleChangePhone}/>
          <br/>
          <Button type="submit" name="Submit" style={{background:"#2b5238"}}>Place Order</Button>
       </form>
     )

     return (
       <div>
         <div className="App">
            <div className="App__Aside">
              <h1 className="page-header">Checkout</h1>
              <hr></hr>

              {this.state.loginState ? (
                <>
                  <p>Hey {this.state.name}!</p>
                  <p>Review your saved info below. Does everything look right?</p>
                  <hr></hr>
                  <h3>1. Shipping Info</h3>
                  <hr></hr>
                  <div className="BoxAddress">
                    <h6>{this.state.phone}</h6>
                    <h6>{this.state.address}</h6>
                    <h6>{this.state.city}, {this.state.stateAddress}, {this.state.zip}</h6>
                  </div>
                </>
              ) : (
                <>
                  <p>Hello Guest!</p>
                  <hr></hr>
                  <h3>1. Shipping Info</h3>
                  <hr></hr>
                  <p>Enter your shipping info by pressing the guest checkout button.</p>
                </>
              )}

              <div className="shipping-method-options">
                <h3>2. Shipping Options</h3>
                <p>Order by 1PM EST to receive by dates below.</p>
                <hr></hr>
                <div onClick={() => this.setShipping(0)} style={{ backgroundColor: this.state.shippingOption == 0 ? '#DDD' : 'white' }} className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Pick Up at Store</span>
                        <span className="delivery-speed">Ready in 1 Hour</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$0.00</span>
                      </div>
                    </div>
                </div>
                <div onClick={() => this.setShipping(1)} style={{ backgroundColor: this.state.shippingOption == 1 ? '#DDD' : 'white' }} className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Standard:</span>
                        <span className="delivery-estimate">3 - 7 Business Days</span>
                        <span className="delivery-speed">Arrives by 18 April</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$7.00</span>
                      </div>
                    </div>
                </div>
                <div onClick={() => this.setShipping(2)} style={{ backgroundColor: this.state.shippingOption == 2 ? '#DDD' : 'white' }} className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Two Days:</span>
                        <span className="delivery-estimate">2 Business Days</span>
                        <span className="delivery-speed">Arrives by 11 April</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$15.00</span>
                      </div>
                    </div>
                </div>
                <div onClick={() => this.setShipping(3)} style={{ backgroundColor: this.state.shippingOption == 3 ? '#DDD' : 'white' }} className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Overnight:</span>
                        <span className="delivery-estimate">1 Business Day</span>
                        <span className="delivery-speed">Arrives by 10 April</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$20.00</span>
                      </div>
                    </div>
                </div>
              </div>
              <h3>3. Payment Info</h3>
              <hr></hr>
              <div className="section-payment-methods container-xs-height full-width">
                <div className="row-xs-height">
                  <div className="col-xs-6 col-xs-height col-top">
                    <div className="btn-secondary btn-block selectable-option">
                      <div className="selectable-option-text textCenter">
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-6 col-xs-height col-top">
                    <div className="btn-secondary btn-block selectable-option">
                      <div className="selectable-option-text textCenter">
                      <i className="fa fa-university" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="BoxInfoPayment">
                <h6>Ending: 0818</h6>
                <h6>Exp: 03/22</h6>
                <h6>925-911-1234</h6>
                <h6>235 Camelback Road</h6>
                <h6>San Jose, California, 95116</h6>
              </div>
              <button className="btn-primary btn-block">Place Order</button>
              <hr></hr>
            </div>
        <div className="App__Form">
          <h2>SHOPPING BAG</h2>
          {this.state.shoppingBag}

          {/*
            <hr></hr>
            <div className="cart-item-img col-xs-height col-xs-4 col-md-4 col-lg-3 col-top">
                <img className="productCheckout imageResponsive"src="https://i.ibb.co/YbGHtVj/apple.jpg"></img>
            </div>
            <div className="cart-item-info col-xs-height col-xs-8 col-md-8 col-lg-9 col-top">
              <div className="cart-item-info-container container-xs-height">
                <div className="cart-item-info-text col-xs-height col-xs-12 col-top">
                  <h4>{this.state.productName}</h4>
                  <div className="cart-item-price">
                    <h4>${this.state.productPrice}.00</h4>
                  </div>
                  <div className="cart-item-product-details">
                    <h5>Product ID: {this.state.productID}</h5>
                    <h5>Quantity: {this.state.productQuantity}</h5>
                    <ul className="list-inline __ef422">
                    <li>
                        <button onClick={this.increaseProduct}><i className="fa fa-plus" aria-hidden="true"></i></button>
                        <button onClick={this.decreaseProduct}><i className="fa fa-minus" aria-hidden="true"></i></button>
                        <button onClick={this.removeProduct}><i className="fa fa-times" aria-hidden="true"></i></button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="cart-item-img col-xs-height col-xs-4 col-md-4 col-lg-3 col-top">
                <img className="productCheckout imageResponsive"src="https://i.ibb.co/QC1sTyh/Green-Apple.jpg"></img>
            </div>
            <div className="cart-item-info col-xs-height col-xs-8 col-md-8 col-lg-9 col-top">
              <div className="cart-item-info-container container-xs-height">
                <div className="cart-item-info-text col-xs-height col-xs-12 col-top">
                  <h4>{this.state.productName}</h4>
                  <div className="cart-item-price">
                    <h4>${this.state.productPrice}.00</h4>
                  </div>
                  <div className="cart-item-product-details">
                    <h5>Product ID: {this.state.productID}</h5>
                    <h5>Quantity: {this.state.productQuantity}</h5>
                    <ul className="list-inline __ef422">
                    <li>
                        <button onClick={this.increaseProduct}><i className="fa fa-plus" aria-hidden="true"></i></button>
                        <button onClick={this.decreaseProduct}><i className="fa fa-minus" aria-hidden="true"></i></button>
                        <button onClick={this.removeProduct}><i className="fa fa-times" aria-hidden="true"></i></button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            */}
            <h2>Order Summary!</h2>
            <hr></hr>
            <div className="BoxOrderSummary">
              <div className="order-subtotal-container container-xs-height">
                <div className="order-summary-row row-xs-height ">
                  <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                    <h4>Merchandise:</h4>
                  </div>
                  <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                    <span className = "order-summary-value">${merchandiseTotal}</span>
                  </div>
                </div>
              </div>
              <div className="order-subtotal-container container-xs-height">
                <div className="order-summary-row row-xs-height ">
                  <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                    <h4>Online Savings:</h4>
                  </div>
                  <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                    <span style={{color: 'red'}} className = "order-summary-value">-${formatMoney(merchandiseTotal*0.1)}</span>
                  </div>
                </div>
              </div>
              <div className="order-subtotal-container container-xs-height">
                <div className="order-summary-row row-xs-height ">
                  <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                    <h4>Shipping:</h4>
                  </div>
                  <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                    <span className = "order-summary-value">${shippingTotal}</span>
                  </div>
                </div>
              </div>
              <div className="order-subtotal-container container-xs-height">
                  <div className="order-summary-row row-xs-height ">
                    <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                      <h4>Tax:</h4>
                    </div>
                    <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                      <span className = "order-summary-value">${taxTotal}</span>
                      <hr></hr>
                    </div>
                  </div>
              </div>
              <div className="order-subtotal-container container-xs-height">
                  <div className="order-summary-row row-xs-height ">
                    <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                      <h4>Total:</h4>
                    </div>
                    <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                      <span className = "order-summary-value">${totalTotal}</span>
                    </div>
                  </div>
              </div>
              <hr></hr>
              { this.props.loginState ?
              <Button style={{background:"#2b5238", margin:"1em"}} onClick={this.showGuestPopup.bind(this)}>Guest Checkout</Button>
              :
              <Button style={{background:"#2b5238", margin:"1em"}} onClick={this.placeOrder}>Checkout</Button>
              }
            </div>
          </div>
        </div>
         {
           this.state.showGuestCheckoutForm ?
           <Popup
             title="Guest Checkout"
             text={myForm}
             closePopup={this.closeGuestPopup}
           />
           :
           null
         }

         {
           this.state.orderPlaced ?
           <Popup
             title="Order Successully Placed"
             text="Your order has been succesfully placed."
             closePopup={this.closeSuccessPopup.bind(this)}
           />
           :
           null
         }
       </div>
     );
   }
}

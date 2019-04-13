import React, { Component } from 'react';
import Popup from './components/Popup';
import {Button} from 'react-bootstrap';
import './CheckoutPage.css';

export default class CheckoutPage extends Component {

  constructor() {
      super();
      /*
      this.state = {
        showGuestCheckoutForm: false,
        orderPlaced: false,
        firstName:'',
        lastName:'',
        address:'',
        email:'',
        phone:''
      };
      */
      this.showGuestPopup = this.showGuestPopup.bind(this);
      this.closeGuestPopup = this.closeGuestPopup.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangeAddress = this.handleChangeAddress.bind(this);
      this.handleChangeLastName = this.handleChangeLastName.bind(this);
      this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
      
      this.state = {
        productName: "Apple",
        productPrice: 1,
        productID: 11164321,
        productQuantity: 1,
        name: "Gregory Mayo",
        phone: 9259111234,
        address: "235 Camelback Road",
        city: "San Jose",
        stateAddress: "California",
        zip: 925116
      }
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
    
   render() {

     var myForm = (
       <form className="myForm" onSubmit={this.handleSubmit}>
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
              <p>Hey {this.state.name}!</p>
              <p>Review your saved info below. Does everything look right?</p>
              <hr></hr>
              <h3>1. Shipping Info</h3>
              <p>Saved Address:</p>
              <hr></hr>
              <div className="BoxAddress">
                <h6>{this.state.phone}</h6>
                <h6>{this.state.address}</h6>
                <h6>{this.state.city}, {this.state.stateAddress}, {this.state.zip}</h6>
              </div>
              <div className="shipping-method-options">
                <h3>2. Shipping Options</h3>
                <p>Order by 1PM EST to receive by dates below.</p>
                <hr></hr>
                  <div className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Pick Up at Store</span>
                        <span className="delivery-speed">Ready In An Hour</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$0.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="shipping-method-option selectable-test radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Standard</span>
                        <span className="delivery-estimate">3 - 7 Business Days</span>
                        <span className="delivery-speed">Arrives by 18 April</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$7.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Two Days</span>
                        <span className="delivery-estimate">2 Business Days</span>
                        <span className="delivery-speed">Arrives by 11 April</span>
                        <span className="shipping-method-price text-bold text-right col-xs-2">$15.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="shipping-method-option selectable-option radius">
                    <div className="selectable-option-text">
                      <div className="delivery-details">
                        <span className="delivery-method-name">Overnight</span>
                        <span className="delivery-estimate">1 Business Days</span>
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
                      <i class="fa fa-university" aria-hidden="true"></i>
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
                        <button onClick={this.increaseProduct}><i class="fa fa-plus" aria-hidden="true"></i></button>
                        <button onClick={this.decreaseProduct}><i class="fa fa-minus" aria-hidden="true"></i></button>
                        <button onClick={this.removeProduct}><i class="fa fa-times" aria-hidden="true"></i></button>
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
                        <button onClick={this.increaseProduct}><i class="fa fa-plus" aria-hidden="true"></i></button>
                        <button onClick={this.decreaseProduct}><i class="fa fa-minus" aria-hidden="true"></i></button>
                        <button onClick={this.removeProduct}><i class="fa fa-times" aria-hidden="true"></i></button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <h2>Order Summary</h2>
            <hr></hr>
            <div className="BoxOrderSummary">
              <div className="order-subtotal-container container-xs-height">
                <div className="order-summary-row row-xs-height ">
                  <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                    <h4>Merchandise:</h4>
                  </div>
                  <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                    <span>$2.00</span>
                  </div>
                </div>
              </div>
              <div className="order-subtotal-container container-xs-height">
                <div className="order-summary-row row-xs-height ">
                  <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                    <h4>Shipping:</h4>
                  </div>
                  <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                    <span>$7.00</span>
                  </div>
                </div>
              </div>
              <div className="order-subtotal-container container-xs-height">
                  <div className="order-summary-row row-xs-height ">
                    <div className="order-summary-row-title text-left col-xs-height col-xs-8 col-middle">
                      <h4>Tax:</h4>
                    </div>
                    <div className="order-summary-row-value text-right col-xs-height col-xs-4 col-middle">
                      <span>$0.20</span>
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
                      <span>$9.20</span>
                    </div>
                  </div>
              </div>
              <hr></hr>
              <Button style={{background:"#2b5238", margin:"1em"}} onClick={this.showGuestPopup.bind(this)}>Guest Checkout</Button>
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

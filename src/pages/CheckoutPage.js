import React, { Component } from 'react';
import Popup from './components/Popup';
import {Button} from 'react-bootstrap';

export default class CheckoutPage extends Component {

  constructor() {
      super();
      this.state = {
        showGuestCheckoutForm: false,
        orderPlaced: false,
        firstName:'',
        lastName:'',
        address:'',
        email:'',
        phone:''
      };

      this.showGuestPopup = this.showGuestPopup.bind(this);
      this.closeGuestPopup = this.closeGuestPopup.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangeAddress = this.handleChangeAddress.bind(this);
      this.handleChangeLastName = this.handleChangeLastName.bind(this);
      this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
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
      if(this.state.firstName=='' || this.state.lastName=='' || this.state.address=='' || this.state.email=='' || this.state.phone==''){
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
          <Button type="submit" name="Submit">Place Order</Button>
       </form>
     )

     return (
       <div>
         <Button color="success" onClick={this.showGuestPopup.bind(this)}>Guest Checkout</Button>
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

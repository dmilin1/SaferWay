import React, { Component } from 'react';
import Popup from './components/Popup';
import {Button} from 'react-bootstrap';

export default class CheckoutPage extends Component {

  constructor() {
      super();
      this.state = {
        show: false,
      };

      this.showPopup = this.showPopup.bind(this);
      this.closePopup = this.closePopup.bind(this);
    }

    showPopup(){
      this.setState({
        show: true
      });
    }

    closePopup(){
      this.setState({
        show: false
      });
    }

   render() {

     var myForm = (
       <form className="myForm">
          First name:
          <input type="text" name="firstName" />
          <br/>
          Last name:
          <input type="text" name="lastName" />
          <br/>
          Address:
          <input type="text" name="address" />
          <br/>
          Email:
          <input type="text" name="email" />
          <br/>
          Phone:
          <input type="text" name="phone" />
          <br/>
          <Button type="submit" name="Submit">Place Order</Button>
       </form>
     )

     return (
       <div>
         <Button color="success" onClick={this.showPopup.bind(this)}>Guest Checkout</Button>
         {
           this.state.show ?
           <Popup
             title="Guest Checkout"
             text={myForm}
             closePopup={this.closePopup.bind(this)}
           />
           :
           null
         }
       </div>
     );
   }
}

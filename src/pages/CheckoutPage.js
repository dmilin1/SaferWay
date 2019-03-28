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
     return (
       <div>
         <h1>Guest Checkout</h1>
         <Button color="success" onClick={this.showPopup.bind(this)}>Checkout</Button>
         {
           this.state.show ?
           <Popup
             text='Checkout'
             closePopup={this.closePopup.bind(this)}
           />
           :
           null
         }
       </div>
     );
   }
}

import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./../../productPics', false, /\.(png|jpe?g|svg)$/));


class UserProfile extends Component {
  constructor() {
    super();
    var loginState = JSON.parse(localStorage.getItem('loginState'));
    var account = JSON.parse(localStorage.getItem('account'));

    this.state = {
      account: account,
      historyData: [],
    }

    if (!loginState.loggedin) {
      window.location.href='/login#/sign-in';
    }
  }

  componentDidMount() {
    axios.post('/api/getHistory', {
      id: this.state.account,
    })
    .then((res) => {
      this.setState({
        historyData: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onClick = () =>{
     var loginState = { 'loggedin': false };
     localStorage.setItem('loginState', JSON.stringify(loginState));
     window.location.href='/';
  }
  render(){
    console.log(this.state.historyData)

    function renderPurchase(purchase) {
      var theRender = [];
      for (var i = 0; i < purchase.length; i++) {
        console.log(purchase[i])
        theRender.push(
          <div className="picture">
            <img src={images[purchase[i].picPath.split('/⁨productPics⁩/')[1]]} style={{height:"100px"}}/>
            <div className="picture-two">
            {purchase[i].name}
            <br/>
            {purchase[i].count}x ${purchase[i].price}
            </div>
          </div>
        )
      }
      return theRender;
    }

    var formatMoney = (num) => {
      var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
      return num.toString().match(re)[0];
    }

    var renderPurchaseHistory = () => {
      var purchaseHistory = []
      for (var i = 0; i < this.state.historyData.length; i++) {
        var total = 0;
        for (var j = 0; j < this.state.historyData[i].length; j++) {
          total += this.state.historyData[i][j].count * this.state.historyData[i][j].price;
        }
        purchaseHistory.push(
          <div>
            <div className="history-data">
            ${formatMoney(total)}
            </div>
            <div className="history-picture">
            {renderPurchase(this.state.historyData[i])}
            </div>
            <hr></hr>
          </div>
        )
      }
      return purchaseHistory;
    }

    return(
      <div id="user-profile">
        <div className="purchase-history">
        Purchase History
        </div>
        <hr/>
        {renderPurchaseHistory()}
      </div>
    );
  }
}

export default UserProfile;

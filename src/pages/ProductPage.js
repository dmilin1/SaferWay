import React, { Component } from 'react';
import './ProductPage.css';

export default class ProductPage extends Component {

  loadProducts = () => {
    var productList = []
    for (var i = 0; i < 20; i++) {
      productList.push(
        <ProductComponent
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
        <div className="componentList">
          {this.loadProducts()}
        </div>
      </div>
    );
  }
}

function ProductComponent(props){
  return(
    <div className="individualComponent">
      <a href="#">
        <img className="productImage" src={props.imgsrc} alt={props.alt}/>
        <div>{props.title}</div>
        <div>{props.price}</div>
      </a>
    </div>
  );
}

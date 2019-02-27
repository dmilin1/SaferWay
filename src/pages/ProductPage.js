import React, { Component } from 'react';
import './ProductPage.css';

export default class ProductPage extends Component {

  render() {
    return (
      <div>
        <div className="componentList">
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
          <ProductComponent
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
            alt="milk"
            title="Milk"
            price="$1.99"
          />
        </div>
      </div>
    );
  }
}

function ProductComponent(props){
  return(
    <div className="individualComponent">
      <a href="#">
        <img src={props.imgsrc} alt={props.alt}/>
        <p>{props.title}</p>
        <p>{props.price}</p>
      </a>
    </div>
  );
}

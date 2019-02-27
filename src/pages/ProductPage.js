import React, { Component } from 'react';
import './ProductPage.css';

export default class ProductPage extends Component {

  render() {
    return (
      <div>
        <ul className="componentList">
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
          <li>
            <ProductComponent
              imgsrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg"
              alt="milk"
              title="Milk"
              price="$1.99"
            />
          </li>
        </ul>
      </div>
    );
  }
}

function ProductComponent(props){
  return(
    <div className="individualComponent">
      <img src={props.imgsrc} alt={props.alt}/>
      <p>{props.title}</p>
      <p>{props.price}</p>
    </div>
  );
}

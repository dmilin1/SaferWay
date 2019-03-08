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

        </div>
      </div>
    );
  }
}

function ProductComponent(props){
  return(
    <div style={{padding:"1em", margin:".5em", borderStyle:"solid", borderRadius:"25px", borderColor:"#cccccc"}}>
    <span className="border">
      <div className="card">
        <img className="card-img-top" src={props.imgsrc} alt={props.alt} style={{borderRadius:"20px"}}></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <a href="#" class="btn btn-primary" style={{background:"#2b5138", borderRadius:"10px"}}>{props.price}</a>
        </div>
      </div>
      </span>
    </div>
  );
}

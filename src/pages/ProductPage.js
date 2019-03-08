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
    <div style={{padding:".5em", margin:".5em", borderStyle:"solid", borderRadius:"25px", borderColor:"#cccccc"}}>
      <span className="border">
        <a href="#" style={{textDecoration:"none", color:"black"}}>
          <div className="card">
            <img className="card-img-top" src={props.imgsrc} alt={props.alt} style={{borderRadius:"20px"}}></img>
            <div className="card-body">
              <h5 className="card-title" style={{fontSize:"16pt"}}>{props.title}</h5>
              <a href="#" class="btn btn-primary" style={{background:"#2b5138", borderRadius:"20px"}} onClick = {()=>{
                alert("Added to Cart: 1 x " + props.title + " (" + props.price + ")");
              }}>
                {props.price}
              </a>
            </div>
          </div>
        </a>
      </span>
    </div>
  );
}

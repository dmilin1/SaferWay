import React, { Component } from 'react';
import LogoutButton from './components/LogoutButton';
import './CustomNavbar.css';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function search() {
  window.location.href = ("/product?search=" + document.getElementById("searchValue").value
                        + "&category=" + getUrlParam("category", "")
                        + "&aisle=" + getUrlParam("aisle", ""))
}

function setAisle(theAisle) {
  window.location.href = ("/product?search=" + getUrlParam("search", "")
                        + "&category=" + getUrlParam("category", "")
                        + "&aisle=" + theAisle)
}

function setCategory(theCategory) {
  window.location.href = ("/product?search=" + getUrlParam("search", "")
                        + "&category=" + theCategory
                        + "&aisle=" + getUrlParam("aisle", ""))
}

export default class CustomNavbar extends Component {
  onClick = () => {
    window.location.href='/login#/sign-in';
    var loginState = JSON.parse(localStorage.getItem('loginState'));

      if(loginState && loginState.loggedin){
        window.location.href='/profile';
      }else{
        window.location.href='/login#/sign-in';
      }
  }
    render () {

        var loginState = JSON.parse(localStorage.getItem('loginState'));

        return (
          <>
          <div className="navbar navbar-expand-lg sticky-top navbar-light bg-light" style={{ minHeight:66, boxShadow: window.location.href.includes('/product') ? '' : '0px 1px 10px #c1c1c1'}}>
            <img className="navbar-brand" href="#" src="https://i.ibb.co/Fz04SyP/1.png" height="50px" width="200px" />

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mx-auto">

                <li className="nav-item">
                  <a href="/" to="/" className="nav-link" style={{ align:"right"}}>
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fa fa-home fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -9px", color:"#7c7c7d"}}>Home</p></li>
                    </ul>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/product" to="/product" className="nav-link">
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fas fa-pizza-slice fa-lg"></i></li>
                      <li><p style={{margin:"0 0 -16px -20px", color:"#7c7c7d"}}>Products</p></li>
                    </ul>
                  </a>
                </li>

                <li className="nav-item">
                  {
                    <div className="nav-link" onClick={this.onClick}>
                      <ul style={{ listStyleType: "none", cursor: 'pointer' }}>
                        <li><i className="fa fa-user fa-lg"></i></li>
                        <li><p style={{ margin: "0 0 -16px -7px", color: "#7c7c7d" }}>User</p></li>
                      </ul>
                    </div>
                  }
                </li>

                <li className="nav-item">
                  <a href="/checkout" to="/checkout" className="nav-link" >
                    <ul style={{listStyleType:"none"}}>
                      <li><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></li>
                      <li><p style={{margin:"0 0 -16px 0", color:"#7c7c7d"}}>Cart</p></li>
                    </ul>
                  </a>
                </li>

              </ul>

              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" id="searchValue" onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    search()
                  }
                }}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => {
                  search()
                }}>
                  Search
                </button>
                {
                  loginState && loginState.loggedin == true ?
                  <LogoutButton />
                  :
                  null
                }
              </div>
            </div>
          </div>
          {window.location.href.includes('/product') ? (
            <div style={{
              backgroundColor: 'rgb(248,249,250)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              boxShadow: 'rgb(193, 193, 193) 0px 1px 0px',
            }}>
              <div class="select">
                  <select onChange={(e) => {
                    setAisle(e.target.value)
                  }}>
                      <option>Aisle</option>
                      <option value={1}>Aisle 1</option>
                      <option value={2}>Aisle 2</option>
                      <option value={3}>Aisle 3</option>
                      <option value={4}>Aisle 4</option>
                      <option value={5}>Aisle 5</option>
                      <option value={6}>Aisle 6</option>
                      <option value={7}>Aisle 7</option>
                      <option value={8}>Aisle 8</option>
                      <option value={9}>Aisle 9</option>
                      <option value={10}>Aisle 10</option>
                  </select>
                  <div class="select_arrow">
                  </div>
              </div>
              <div class="select">
                  <select onChange={(e) => {
                    setCategory(e.target.value)
                  }}>
                      <option>Category</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Spreads">Spreads</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Vegetable">Vegetables</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Drinks">Drinks</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Frozen">Frozen</option>
                      <option value="Deli">Deli</option>
                      <option value="Meat">Meat</option>
                      <option value="Alcohol">Alcohol</option>
                  </select>
                  <div class="select_arrow">
                  </div>
              </div>
            </div>
          ):(
            null
          )}
          </>
        );
    }
}

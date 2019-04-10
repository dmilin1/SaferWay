import React, { Component } from 'react';
import './COutProductPage.css'
export default class SearchPage extends Component {

  render() {
    return (
      <div className = "AppS">
        <div className = "AppS__Aside">
         <a><i className="fa fa-search fa-3x" aria-hidden="true"></i></a>
           <input type="text" id="searchInput" className="FormField__Input" placeholder="Item Name" name="SearchInput"></input>
        </div>
      </div>
    );
  }
}

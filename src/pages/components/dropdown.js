import React from 'react';
import './style.css';


class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div  className="dropdown" style = {{background:"white",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> Categories</div>

          { this.state.displayMenu ? (
          <ul>
         <li><a href="Women">Women</a></li>
         <li><a href="Men">Men</a></li>
         <li><a href="Young Adult">Young Adult</a></li>
         <li><a href="Kids">Kids</a></li>
         <li><a href="Baby">Baby</a></li>
         <li><a href="Electronics">Electronics</a></li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

export default Dropdown;

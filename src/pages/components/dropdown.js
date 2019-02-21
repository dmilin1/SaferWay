import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor(){
      super();

      this.state = {
        showMenu: false,
      }

      this.showMenu = this.showMenu.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
    }


    showMenu(event) {
      event.preventDefault();

      this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
      });
    }

    closeMenu() {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }

  render() {
    return (
      <div>
        <button>
          Show menu
        </button>

        <div className="menu">
          <button> Menu item 1 </button>
          <button> Menu item 2 </button>
          <button> Menu item 3 </button>
        </div>
      </div>
    );
  }
}

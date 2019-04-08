import React from 'react';
import {Button} from 'react-bootstrap';
import './Popup.css';

class Popup extends React.Component{
  render(){
    return(
      <div className="popup">
        <div className="popup_inner">
          <h1>
            {this.props.title}
            <Button onClick={this.props.closePopup} style={{background:"#2b5238"}} className="popupCloseButton">X</Button>
          </h1>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Popup

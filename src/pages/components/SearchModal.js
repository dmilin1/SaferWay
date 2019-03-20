import React from 'react';
import './SearchModal.css';

const SearchModal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-body">
                  <p>
                    <h3>Search <span className="close-modal-btn" onClick={props.close}>×</span> </h3>
                    {props.children}
                  </p>
                </div>
            </div>
        </div>
    )
}

export default SearchModal;

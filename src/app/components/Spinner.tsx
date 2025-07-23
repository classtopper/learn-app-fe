import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner-circle">
            </div>
            <p className="spinner-text">LOADING</p>
        </div>
    );
};

export default Spinner;

import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1>Create course</h1>
            <div className='navbar__button'>
                <button className='navbar__button__active'>Active</button>
                <button className='navbar__button__save'>Save</button>
            </div>
        </div>
    );
};

export default Navbar;
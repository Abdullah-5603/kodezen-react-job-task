import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='kzui-navbar'>
            <h1>Create course</h1>
            <div className='kzui-navbar__button'>
                <button className='kzui-navbar__button__active'>Active</button>
                <button className='kzui-navbar__button__save'>Save</button>
            </div>
        </div>
    );
};

export default Navbar;
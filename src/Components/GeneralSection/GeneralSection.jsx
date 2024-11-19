import React from 'react';
import './GeneralSection.css'

const GeneralSection = () => {
    return (
        <div className='kzui-general-section'>
            <h3>General</h3>

            <div className='kzui-general-section__input'>
                <label htmlFor="">Course name</label>
                <input type="text" placeholder='Enter Course Name'/>
            </div>
            
            <div className='kzui-general-section__textarea'>
                <label htmlFor="">Course name</label>
                <textarea type="text"/>
            </div>

        </div>
    );
};

export default GeneralSection;
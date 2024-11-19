import React from 'react';
import './CourseOrganization.css'

const CourseOrganization = () => {
    return (
        <div className='kzui-course-organization'>
            <h3>Course Organization</h3>

            <div className='kzui-course-organization__category'>
                <label htmlFor="">Course category</label>
                <select name="" id="">
                    <option value="Select Category">Select Category</option>
                </select>
            </div>

            <button className='kzui-course-organization__button'>+ Add New Category</button>

            <div className='kzui-course-organization__tag'>
                <label htmlFor="">Add tag</label>
                <input type="text" />
            </div>
            <div className='kzui-course-organization__excerpt'>
                <label htmlFor="">Add excerpt</label>
                <textarea type="text"  placeholder='Enter Excerpt'/>
            </div>
        </div>
    );
};

export default CourseOrganization;
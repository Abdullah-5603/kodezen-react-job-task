import React from 'react';
import './CourseType.css'

const CourseType = () => {
    return (
        <div className='kzui-course-type'>
            <h3>Course type</h3>

            <div className='kzui-course-type__select'>
                <div className='kzui-course-type__select__free'>
                    <label htmlFor="free">Free</label>
                   <input type="radio" name='free' id='free' checked/> 
                </div>
                <div className='kzui-course-type__select__paid'>
                    <label htmlFor="paid">Paid</label>
                   <input type="radio" name='paid' id='paid'/> 
                </div>
                <div className='kzui-course-type__select__paid'>
                    <label htmlFor="public">Public</label>
                   <input type="radio" name='public' id='public'/> 
                </div>

            </div>
        </div>
    );
};

export default CourseType;
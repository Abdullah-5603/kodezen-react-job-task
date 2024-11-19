import React from 'react';
import './CoursePrerequisite.css'

const CoursePrerequisite = () => {
    return (
        <div className='kzui-course-prerequisite'>
            <h3>Course prerequisite</h3>

            <div className='kzui-course-prerequisite__input'>
                <label htmlFor="">Prerequisite type</label>
                <select name="" id="">
                    <option value="Select Category">Course</option>
                </select>
            </div>
            <div className='kzui-course-prerequisite__input'>
                <label htmlFor="">Course prerequisite</label>
                <select name="" id="">
                    <option value="Select Category">Course</option>
                </select>
            </div>
        </div>
    );
};

export default CoursePrerequisite;
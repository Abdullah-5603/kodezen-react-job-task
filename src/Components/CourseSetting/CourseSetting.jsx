import React from 'react';
import './CourseSetting.css'

const CourseSetting = () => {
    return (
        // <div className='kzui-course-setting'>
        //     <h3>Course setting</h3>
        // </div>
        <div className="kzui-course-settings-container">
            <h2 className="kzui-course-settings-title">Course settings</h2>
            <div className="kzui-course-settings-tabs">
                <div className="kzui-tab active">General</div>
                <div className="kzui-tab">Additional</div>
                <div className="kzui-tab">Content drip</div>
            </div>
            <div className="kzui-course-settings-content">
                {/* Toggle Section */}
                <div className="kzui-course-settings-item">
                    <div className='kzui-cursor-setting-item__text'>
                        <label className="kzui-item-label">Question and answer</label>
                        <span className="kzui-item-description">
                            Enable/disable QA section for this course.
                        </span>
                    </div>
                    <div className="kzui-toggle-switch">
                        <input type="checkbox" id="qa-toggle" />
                        <label htmlFor="qa-toggle"></label>
                    </div>
                </div>

                <div className="kzui-course-settings-item">
                    <div className='kzui-cursor-setting-item__text'>
                        <label className="kzui-item-label">Announcements</label>
                        <span className="kzui-item-description">
                            Enable/disable announcements section for this course.
                        </span>
                    </div>
                    <div className="kzui-toggle-switch">
                        <input type="checkbox" id="announcements-toggle" />
                        <label htmlFor="announcements-toggle"></label>
                    </div>
                </div>

                {/* Course Duration */}
                <div className="kzui-course-settings-item">
                    <div className='kzui-cursor-setting-item__text'>
                        <label className="kzui-item-label">Course duration</label>
                        <span className="kzui-item-description">
                            Set the expected time duration for this course
                        </span>
                    </div>
                    <div className="kzui-duration-inputs">
                        <div>
                            <input type="text" min="0" defaultValue="0" />
                            <span>Hrs</span>
                        </div>
                        <div>
                            <input type="text" min="0" defaultValue="0" />
                            <span>Min</span>
                        </div>
                    </div>
                </div>

                <div className="kzui-divider"></div>

                {/* Other Fields */}
                <div className="kzui-course-settings-item">
                    <div className='kzui-cursor-setting-item__text'>
                        <label className="kzui-item-label">Maximum students enroll</label>
                        <span className="kzui-item-description">
                            0, Means no student limit
                        </span>
                    </div>
                    <input type="number" min="0" defaultValue="0" />
                </div>

                <div className="kzui-course-settings-item">
                    <div className='kzui-cursor-setting-item__text'>
                        <label className="kzui-item-label">Difficulty level</label>
                        <span className="kzui-item-description">Choose course level</span>
                    </div>
                    <select>
                        <option>All level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                <div className="kzui-course-settings-item">
                    <span className="kzui-item-description">
                        Set the number of courses to show per page on the course list page.
                    </span>
                    <input type="text" placeholder="Language" />
                </div>
            </div>
        </div>
    );
};

export default CourseSetting;
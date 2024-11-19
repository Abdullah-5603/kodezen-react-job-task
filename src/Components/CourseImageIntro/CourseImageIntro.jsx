import React from 'react';
import { SlCloudUpload } from "react-icons/sl";
import './CourseImageIntro.css'

const CourseImageIntro = () => {
    return (
        <div className='kzui-course-image-intro'>
            <h3>Course image/intro</h3>

            <div className='kzui-course-image-intro__content'>
                <div className='kzui-course-image-intro__content__image'>
                    <div>
                        <SlCloudUpload />
                    </div>
                    <h5>Upload Image</h5>
                </div>
                <div className='kzui-course-image-intro__content__typography'>
                    <div>
                        <h4>Feature image</h4>
                        <p>Support: JPEG, PNG andMP4 format, up to 100MB</p>
                        <p>Recommended size: 80px X 80px</p>

                    </div>

                    <button><SlCloudUpload/> <span>Upload</span></button>
                </div>
            </div>
            <div className='kzui-course-image-intro__content'>
                <div className='kzui-course-image-intro__content__image'>
                    <div>
                        <SlCloudUpload />
                    </div>
                    <h5>Upload Video</h5>
                </div>
                <div className='kzui-course-image-intro__content__typography'>
                    <div>
                        <h4>Course video intro</h4>
                        <p>Support: HTML5 MP4</p>
                    </div>

                    <button><SlCloudUpload/> <span>Upload</span></button>
                </div>
            </div>
        </div>
    );
};

export default CourseImageIntro;
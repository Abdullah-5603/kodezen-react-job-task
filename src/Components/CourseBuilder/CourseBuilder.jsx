import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './CourseBuilder.css';

const CourseBuilder = () => {
    const [newCurriculum, setNewCurriculum] = useState(false);
    const [openContentModal, setOpenContentModal] = useState(false);
    const [openLessonModal, setOpenLessonModal] = useState(false);
    const [currentCurriculum, setCurrentCurriculum] = useState({});
    const [currentCurriculumId, setCurrentCurriculumId] = useState('');
    const [currentLessonId, setCurrentLessonId] = useState('');
    const [activeEditOption, setActiveEditOption] = useState(null); // Track active edit option
    const [expandedCurriculum, setExpandedCurriculum] = useState(null); // Tracks the expanded curriculum
    const [curriculumData, setCurriculumData] = useState([
        {
            id: 1, title: 'Curriculum 1', summary: "Curriculum 1 summary",
            curriculumContents: [
                { id: 11, lessonTitle: 'Lesson 1', lessonSlug: 'lesson slug', lessonContent: 'Lesson 1 content' },
                { id: 22, lessonTitle: 'Lesson 2', lessonSlug: 'lesson slug', lessonContent: 'Lesson 2 content' },
            ],
            subCurriculums: [
                { id: 111, title: 'sub Curriculum 1', summary: "sub Curriculum 1 summary" },
                { id: 222, title: 'sub Curriculum 2', summary: "sub Curriculum 2 summary" },
            ]
        },
        { id: 2, title: 'Curriculum 2', summary: "Curriculum 2 summary", curriculumContents: [], subCurriculums: [] },
    ]);

    const onCloseContentModal = () => setOpenContentModal(false);
    const onCloseLessonModal = () => setOpenLessonModal(false);

    function generateUniqueId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uniqueId = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            uniqueId += chars[randomIndex];
        }
        return uniqueId;
    }


    const handleNewCurriculumSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const summary = form.summary.value;
    
        const newCurriculum = {
            id: currentCurriculumId || generateUniqueId(), // Use the existing ID for editing, or generate a new one
            title,
            summary,
            curriculumContents: [],
            subCurriculums: [],
        };
    
        setCurriculumData((prevCurriculumData) => {
            const isEdit = currentCurriculumId !== null;
    
            return isEdit
                ? prevCurriculumData.map((curriculum) =>
                      curriculum.id === currentCurriculumId
                          ? { ...curriculum, title: title, summary: summary } // Update the existing curriculum
                          : curriculum
                  )
                : [...prevCurriculumData, newCurriculum]; // Add a new curriculum
        });
    
        // Reset the currentCurriculumId to null for future additions
        setCurrentCurriculumId('');
        setNewCurriculum(false); // Close the form/modal
    };
    
    const handleDeleteCurriculum = (id) => {
        setCurriculumData((prev) => prev.filter((curriculum) => curriculum.id !== id));
    };

    const handleDeleteLesson = (curriculumId, lessonId) => {
        setCurriculumData((prevData) =>
            prevData.map((curriculum) =>
                curriculum.id === curriculumId
                    ? {
                        ...curriculum,
                        curriculumContents: curriculum.curriculumContents.filter(
                            (lesson) => lesson.id !== lessonId
                        ),
                    }
                    : curriculum
            )
        );
    };

    const handleEditLesson = (curriculumId, lessonId) => {
        const currentCurriculum = curriculumData.find(
            (curriculum) => curriculum.id === curriculumId
        );

        if (currentCurriculum) {
            const currentLesson = currentCurriculum.curriculumContents.find(
                (lesson) => lesson.id === lessonId
            );

            if (currentLesson) {
                setCurrentCurriculum(currentLesson); 
            } else {
                console.error("Lesson not found");
            }
        } else {
            console.error("Curriculum not found");
        }
    };


    // console.log(currentCurriculum);
    // console.log(currentLessonId);

    const handleLessonSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const lessonTitle = form.lessonTitle.value;
        const lessonSlug = form.lessonSlug.value;
        const lessonContent = form.lessonContent.value;

        const newLesson = {
            id: generateUniqueId(), 
            lessonTitle: lessonTitle,
            lessonSlug: lessonSlug,
            lessonContent: lessonContent,
        };

        setCurriculumData((prevCurriculumData) =>
            prevCurriculumData.map((curriculum) => {
                if (curriculum.id === currentCurriculumId) {
                    const lessonExists = curriculum?.curriculumContents?.find(
                        (lesson) => lesson.id === currentLessonId
                    );

                    console.log(lessonExists);

                    return {
                        ...curriculum,
                        curriculumContents: lessonExists
                            ? curriculum.curriculumContents.map((lesson) =>
                                lesson.id === currentLessonId
                                    ? { ...lesson, lessonTitle: lessonTitle, lessonSlug: lessonSlug, lessonContent: lessonContent, id: currentLessonId } 
                                    : lesson
                            )
                            : [...curriculum?.curriculumContents, newLesson], 
                    };
                }
                return curriculum;
            })
        );

        setCurrentLessonId('');
        onCloseLessonModal();
    };


    return (
        <>
            <div className='kzui-course-builder'>
                <h3>Course Builder</h3>

                {curriculumData.length > 0 && (
                    <div className='kzui-course-builder__curriculum-list'>
                        {curriculumData.map((curriculum) => (
                            <div key={curriculum.id} className='kzui-course-builder__curriculum-item'>
                                <div className='kzui-course-builder__curriculum-item__header'>
                                    <h4>{curriculum.title}</h4>

                                    <div className='kzui-course-builder__curriculum-item__edit'>
                                        <BsThreeDots
                                            onClick={() =>
                                                setActiveEditOption(
                                                    activeEditOption === curriculum.id ? null : curriculum.id
                                                )
                                            }
                                        />
                                        {expandedCurriculum === curriculum.id ? (
                                            <IoIosArrowUp
                                                onClick={() => setExpandedCurriculum(null)}
                                            />
                                        ) : (
                                            <IoIosArrowDown
                                                onClick={() => setExpandedCurriculum(curriculum.id)}
                                            />
                                        )}

                                        {activeEditOption === curriculum.id && (
                                            <div className='kzui-course-builder__curriculum-item__edit__buttons'>
                                                <button
                                                    onClick={() => {
                                                        setActiveEditOption(null)
                                                        setCurrentCurriculumId(curriculum.id)
                                                    }}
                                                    className='kzui-course-builder__curriculum-item__edit__buttons__edit'
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setActiveEditOption(null);
                                                        handleDeleteCurriculum(curriculum.id);
                                                    }}
                                                    className='kzui-course-builder__curriculum-item__edit__buttons__delete'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                               
                                {expandedCurriculum === curriculum.id && (
                                    <div>
                                        <div className='kzui-course-builder__curriculum-item__divider'></div>
                                        {curriculum?.curriculumContents?.length > 0 && (
                                            curriculum.curriculumContents.map((curriculumContent) => (
                                                <div
                                                    key={curriculumContent.id}
                                                    className='kzui-course-builder__curriculum-item__curriculum-content'
                                                >
                                                    <p>Lesson - {curriculumContent.lessonTitle}</p>
                                                    <div className='kzui-course-builder__curriculum-item__curriculum-content__buttons'>
                                                        <button
                                                            onClick={() => {
                                                                handleEditLesson(curriculum.id, curriculumContent.id)
                                                                setCurrentCurriculumId(curriculum.id)
                                                                setCurrentLessonId(curriculumContent.id)
                                                                setOpenLessonModal(true)
                                                            }}
                                                        ><MdEdit /></button>
                                                        <button onClick={() => {
                                                            handleDeleteLesson(curriculum.id, curriculumContent.id);
                                                        }}><MdDelete /></button>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                        }

                                        <div className='kzui-course-builder__curriculum-item__buttons'>
                                            <button onClick={() => {
                                                setOpenContentModal(true)
                                                setCurrentCurriculumId(curriculum.id)
                                            }}>
                                                + Add Content
                                            </button>
                                            <button>+ Add Sub-Curriculum</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                )}
                {
                    newCurriculum && (
                        <form onSubmit={handleNewCurriculumSubmit} action="" className='kzui-course-builder__add-new-course'>
                            <div className='kzui-course-builder__input'>
                                <input type="text" name='title' placeholder='Add title here' required />
                                <input type="text" name='summary' placeholder='Add summary here' />
                            </div>
                            <div className='kzui-course-builder__button'>
                                <button
                                    type='button'
                                    onClick={() => setNewCurriculum(false)}
                                    className='kzui-course-builder__cancel-button'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='kzui-course-builder__add-curriculum-button'
                                >Add Curriculum</button>
                            </div>
                        </form>
                    )
                }

                <button
                    style={{ display: newCurriculum ? 'none' : 'block' }}
                    onClick={() => setNewCurriculum(true)}
                    className='kzui-course-builder__add-new-curriculum-button'
                >
                    + Add New Curriculum
                </button>
            </div>

            <Modal classNames={{
                modal: "kzui-content-modal"
            }} open={openContentModal} onClose={onCloseContentModal} center>
                <div className='kzui-content-modal-header'>
                    <button>Start from scratch</button>
                    <button>Build from existing</button>
                </div>
                <div className='kzui-divider'></div>
                <div className='kzui-content-modal-contents'>
                    <button onClick={() => {
                        setOpenLessonModal(true)
                        setCurrentCurriculum({})
                    }}>Add Lesson</button>
                    <button>Add Quiz</button>
                    <button>New Assignment</button>
                    <button>Add Tutor Booking</button>
                </div>
            </Modal>

            <Modal classNames={{
                modal: "kzui-lesson-modal"
            }} open={openLessonModal} onClose={onCloseLessonModal} center>
                <h3>Lesson</h3>
                <div className='kzui-divider'></div>

                <form onSubmit={handleLessonSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <div className='kzui-lesson-modal__input'>
                        <label htmlFor="">Lesson title</label>
                        <input defaultValue={currentCurriculum?.lessonTitle ? currentCurriculum.lessonTitle : ''} type="text" name='lessonTitle' />
                    </div>
                    <div className='kzui-lesson-modal__input'>
                        <label htmlFor="">Lesson slug</label>
                        <input defaultValue={currentCurriculum?.lessonSlug ? currentCurriculum.lessonSlug : ''} type="text" name='lessonSlug' />
                    </div>
                    <div className='kzui-lesson-modal__input'>
                        <label htmlFor="">Lesson content</label>
                        <textarea defaultValue={currentCurriculum?.lessonContent ? currentCurriculum.lessonContent : ''} type="text" name='lessonContent' />
                    </div>

                    <div>
                        <label htmlFor="">Feature Image</label>
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

                                <button><SlCloudUpload /> <span>Upload</span></button>
                            </div>
                        </div>
                    </div>

                    <div className='kzui-course-builder__button'>
                        <button
                            type='button'
                            onClick={() => setOpenLessonModal(false)}
                            className='kzui-course-builder__cancel-button'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='kzui-course-builder__add-curriculum-button'
                        >Add Lesson</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CourseBuilder;

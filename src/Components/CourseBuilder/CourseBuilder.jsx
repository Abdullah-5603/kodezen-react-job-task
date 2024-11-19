import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './CourseBuilder.css';
import AddNewCurriculum from '../AddNewCurriculum/AddNewCurriculum';

const CourseBuilder = () => {
    const [newCurriculum, setNewCurriculum] = useState(false);
    const [newSubCurriculum, setNewSubCurriculum] = useState(false);
    const [openContentModal, setOpenContentModal] = useState(false);
    const [openLessonModal, setOpenLessonModal] = useState(false);
    const [currentCurriculum, setCurrentCurriculum] = useState({});
    const [currentCurriculumId, setCurrentCurriculumId] = useState('');
    const [currentSubCurriculumId, setCurrentSubCurriculumId] = useState('');
    const [currentLessonId, setCurrentLessonId] = useState('');
    const [currentSubCurriculumLessonId, setCurrentSubCurriculumLessonId] = useState('');
    const [activeEditOption, setActiveEditOption] = useState(null);
    const [activeEditOption2, setActiveEditOption2] = useState(null); 
    const [expandedCurriculum, setExpandedCurriculum] = useState(null); 
    const [expandedCurriculum2, setExpandedCurriculum2] = useState(null); 
    const [curriculumData, setCurriculumData] = useState([
        {
            id: 1, title: 'Curriculum 1', summary: "Curriculum 1 summary",
            curriculumContents: [
                { id: 11, lessonTitle: 'Lesson 1', lessonSlug: 'lesson slug', lessonContent: 'Lesson 1 content' },
                { id: 22, lessonTitle: 'Lesson 2', lessonSlug: 'lesson slug', lessonContent: 'Lesson 2 content' },
            ],
            subCurriculums: [
                {
                    id: 111, title: 'sub Curriculum 1', summary: "sub Curriculum 1 summary",
                    subCurriculumContents: [
                        { id: 1111, lessonTitle: 'sub Lesson 1', lessonSlug: 'lesson slug', lessonContent: 'Sub Lesson 1 content' },
                        { id: 2222, lessonTitle: 'sub Lesson 2', lessonSlug: 'lesson slug', lessonContent: 'Sub Lesson 2 content' },
                    ]
                },
                {
                    id: 222, title: 'sub Curriculum 2', summary: "sub Curriculum 2 summary",
                    subCurriculumContents: [
                        { id: 11111, lessonTitle: 'sub Lesson 1', lessonSlug: 'lesson slug', lessonContent: 'Sub Lesson 1 content' },
                        { id: 22222, lessonTitle: 'sub Lesson 2', lessonSlug: 'lesson slug', lessonContent: 'Sub Lesson 2 content' },
                    ]
                },
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

    const handleCurriculumSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const summary = form.summary.value;

        const newCurriculum = {
            id: currentCurriculumId || generateUniqueId(),
            title: title,
            summary: summary,
            curriculumContents: [],
            subCurriculums: [],
        };

        const newSubCurriculumData = {
            id: generateUniqueId(),
            title: title,
            summary: summary,
            subCurriculumContents: [],
        };

        setCurriculumData((prevCurriculumData) => {
            const isEdit = currentCurriculumId && currentCurriculumId.length > 0;
            const isSubCurriculum = (currentSubCurriculumId && currentSubCurriculumId.length > 0) || newSubCurriculum;

            if (isSubCurriculum) {
                return prevCurriculumData.map((curriculum) => {
                    if (curriculum.id === currentCurriculumId) {
                        if (newSubCurriculum) {
                            return {
                                ...curriculum,
                                subCurriculums: [...curriculum.subCurriculums, newSubCurriculumData],
                            };
                        } else {
                            const updatedSubCurriculums = curriculum.subCurriculums.map((sub) =>
                                sub.id === currentSubCurriculumId
                                    ? { ...sub, title: newSubCurriculumData.title, summary: newSubCurriculumData.summary }
                                    : sub
                            );

                            return { ...curriculum, subCurriculums: updatedSubCurriculums };
                        }
                    }
                    return curriculum;
                });
            }

            if (isEdit) {
                return prevCurriculumData.map((curriculum) =>
                    curriculum.id === currentCurriculumId
                        ? { ...curriculum, title: title, summary: summary }
                        : curriculum
                );
            }

            return [...prevCurriculumData, newCurriculum];
        });

        setCurrentCurriculumId('');
        setCurrentSubCurriculumId('');
        setNewCurriculum(false);
        setNewSubCurriculum(false); 
    };

    const handleDeleteCurriculum = (id) => {
        setCurriculumData((prev) => prev.filter((curriculum) => curriculum.id !== id));
    };
    const handleDeleteSubCurriculum = (curriculumId, subCurriculumId) => {
        setCurriculumData((prevCurriculumData) =>
            prevCurriculumData.map((curriculum) => {
                if (curriculum.id === curriculumId) {
                    const updatedSubCurriculums = curriculum.subCurriculums.filter(
                        (subCurriculum) => subCurriculum.id !== subCurriculumId
                    );

                    return { ...curriculum, subCurriculums: updatedSubCurriculums };
                }
                return curriculum;
            })
        );
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

    const handleDeleteSubCurriculumLesson = (curriculumId, subCurriculumId, lessonId) => {
        setCurriculumData((prevCurriculumData) =>
            prevCurriculumData.map((curriculum) => {
                if (curriculum.id === curriculumId) {
                    const updatedSubCurriculums = curriculum.subCurriculums.map((subCurriculum) => {
                        if (subCurriculum.id === subCurriculumId) {
                            const updatedSubCurriculumContents = subCurriculum.subCurriculumContents.filter(
                                (lesson) => lesson.id !== lessonId
                            );
                            return { ...subCurriculum, subCurriculumContents: updatedSubCurriculumContents };
                        }
                        return subCurriculum;
                    });

                    return { ...curriculum, subCurriculums: updatedSubCurriculums };
                }
                return curriculum;
            })
        );
    };

    const handleEditLesson = (curriculumId, lessonId) => {
        const currentCurriculum = curriculumData.find((curriculum) => curriculum.id === curriculumId);
        if (currentCurriculum) {
            const currentLesson = currentCurriculum.curriculumContents.find(
                (lesson) => lesson.id === lessonId
            );

            if (currentLesson) {
                setCurrentCurriculum(currentLesson); 
                return;
            }
            for (const subCurriculum of currentCurriculum.subCurriculums) {
                const currentSubCurriculumLesson = subCurriculum.subCurriculumContents.find(
                    (lesson) => lesson.id === lessonId
                );

                if (currentSubCurriculumLesson) {
                    setCurrentCurriculum(currentSubCurriculumLesson);
                    return;
                }
            }
            console.error("Lesson not found in curriculum or sub-curriculum");
        } else {
            console.error("Curriculum not found");
        }
    };

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

                    if (
                        ((typeof currentSubCurriculumLessonId === 'string' && currentSubCurriculumLessonId.length > 0) ||
                            (typeof currentSubCurriculumLessonId === 'number' && currentSubCurriculumLessonId > 0)) ||
                        ((typeof currentSubCurriculumId === 'string' && currentSubCurriculumId.length > 0) ||
                            (typeof currentSubCurriculumId === 'number' && currentSubCurriculumId > 0))

                    ) {
                        console.log(currentSubCurriculumLessonId);
                        return {
                            ...curriculum,
                            subCurriculums: curriculum?.subCurriculums?.map((subCurriculum) => {
                                if (subCurriculum.id === currentSubCurriculumId) {
                                    const lessonExists = subCurriculum?.subCurriculumContents?.find(
                                        (lesson) => lesson.id === currentSubCurriculumLessonId
                                    );

                                    return {
                                        ...subCurriculum,
                                        subCurriculumContents: lessonExists
                                            ? subCurriculum.subCurriculumContents.map((lesson) =>
                                                lesson.id === currentSubCurriculumLessonId
                                                    ? { ...lesson, lessonTitle: lessonTitle, lessonSlug: lessonSlug, lessonContent: lessonContent, id: currentSubCurriculumLessonId }
                                                    : lesson
                                            )
                                            : [...subCurriculum?.subCurriculumContents, newLesson],
                                    };
                                }
                                return subCurriculum;
                            }),
                        };
                    } else {
                        // Handle curriculum lessons
                        const lessonExists = curriculum?.curriculumContents?.find(
                            (lesson) => lesson.id === currentLessonId
                        );

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
                }
                return curriculum;
            })
        );

        setCurrentLessonId('');
        setCurrentSubCurriculumId('');
        setCurrentSubCurriculumLessonId('');
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
                                        )}

                                        {curriculum?.subCurriculums?.length > 0 && (
                                            curriculum.subCurriculums.map((subCurriculum) => (
                                                <div
                                                    key={subCurriculum.id}
                                                    className='kzui-course-builder__sub-curriculum-item'
                                                >
                                                    <div className='kzui-course-builder__curriculum-item__header'>
                                                        <p>Sub Curriculum - {subCurriculum.title}</p>
                                                        <div className='kzui-course-builder__curriculum-item__edit'>
                                                            <BsThreeDots
                                                                onClick={() =>
                                                                    setActiveEditOption2(
                                                                        activeEditOption2 === subCurriculum.id ? null : subCurriculum.id
                                                                    )
                                                                }
                                                            />
                                                            {expandedCurriculum2 === subCurriculum.id ? (
                                                                <IoIosArrowUp
                                                                    onClick={() => setExpandedCurriculum2(null)}
                                                                />
                                                            ) : (
                                                                <IoIosArrowDown
                                                                    onClick={() => setExpandedCurriculum2(subCurriculum.id)}
                                                                />
                                                            )}

                                                            {activeEditOption2 === subCurriculum.id && (
                                                                <div className='kzui-course-builder__curriculum-item__edit__buttons'>
                                                                    <button
                                                                        onClick={() => {
                                                                            setActiveEditOption2(null)
                                                                            setCurrentCurriculumId(curriculum.id)
                                                                            setCurrentSubCurriculumId(subCurriculum.id)

                                                                        }}
                                                                        className='kzui-course-builder__curriculum-item__edit__buttons__edit'
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setActiveEditOption2(null);
                                                                            setCurrentCurriculumId(curriculum.id)
                                                                            setCurrentSubCurriculumId(subCurriculum.id)
                                                                            handleDeleteSubCurriculum(curriculum.id, subCurriculum.id)
                                                                        }}
                                                                        className='kzui-course-builder__curriculum-item__edit__buttons__delete'
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {
                                                        expandedCurriculum2 === subCurriculum.id && (
                                                            <div>
                                                                <div className='kzui-course-builder__curriculum-item__divider'></div>
                                                                {subCurriculum?.subCurriculumContents?.length > 0 && (
                                                                    subCurriculum.subCurriculumContents.map((subCurriculumContent) => (
                                                                        <div
                                                                            key={subCurriculumContent.id}
                                                                            className='kzui-course-builder__curriculum-item__curriculum-content'
                                                                        >
                                                                            <p>Lesson - {subCurriculumContent.lessonTitle}</p>
                                                                            <div className='kzui-course-builder__curriculum-item__curriculum-content__buttons'>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        handleEditLesson(curriculum.id, subCurriculumContent.id)
                                                                                        setCurrentCurriculumId(curriculum.id)
                                                                                        setCurrentSubCurriculumId(subCurriculum.id)
                                                                                        setCurrentSubCurriculumLessonId(subCurriculumContent.id)
                                                                                        setOpenLessonModal(true)
                                                                                    }}
                                                                                ><MdEdit /></button>
                                                                                <button onClick={() => {
                                                                                    handleDeleteSubCurriculumLesson(curriculum.id, subCurriculum.id, subCurriculumContent.id);
                                                                                }}><MdDelete /></button>
                                                                            </div>
                                                                        </div>
                                                                    )))}

                                                                <button className='kzui-sub-curriculum-content-button' onClick={() => {
                                                                    setOpenContentModal(true)
                                                                    setCurrentCurriculumId(curriculum.id)
                                                                    setCurrentSubCurriculumId(subCurriculum.id)
                                                                }}>
                                                                    + Add Content
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        )}

                                        {
                                            newSubCurriculum && (
                                                <AddNewCurriculum
                                                    handleNewCurriculumSubmit={handleCurriculumSubmit}
                                                    setNewCurriculum={setNewSubCurriculum}
                                                />
                                            )
                                        }


                                        <div className='kzui-course-builder__curriculum-item__buttons'>
                                            <button onClick={() => {
                                                setOpenContentModal(true)
                                                setCurrentCurriculumId(curriculum.id)
                                            }}>
                                                + Add Content
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setNewSubCurriculum(true)
                                                    setCurrentCurriculumId(curriculum.id)
                                                }}
                                            >+ Add Sub-Curriculum</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                )}
                {
                    newCurriculum && (
                        <AddNewCurriculum
                            handleNewCurriculumSubmit={handleNewCurriculumSubmit}
                            setNewCurriculum={setNewCurriculum}
                        />
                    )
                }

                <button
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

import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { MdEdit, MdDelete } from "react-icons/md";
import { PiDotsSixVerticalLight } from "react-icons/pi";
import AddNewCurriculum from '../AddNewCurriculum/AddNewCurriculum';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './CourseBuilder.css';

const CourseBuilder = () => {
    const [newCurriculum, setNewCurriculum] = useState(false);
    const [newSubCurriculum, setNewSubCurriculum] = useState(false);
    const [openContentModal, setOpenContentModal] = useState(false);
    const [openCurriculumModal, setOpenCurriculumModal] = useState(false);
    const [openLessonModal, setOpenLessonModal] = useState(false);
    const [openBuildFromExisting, setOpenBuildFromExisting] = useState(false);
    const [currentCurriculum, setCurrentCurriculum] = useState({});
    const [currentCurriculumId, setCurrentCurriculumId] = useState('');
    const [currentSubCurriculumId, setCurrentSubCurriculumId] = useState('');
    const [currentLessonId, setCurrentLessonId] = useState('');
    const [currentSubCurriculumLessonId, setCurrentSubCurriculumLessonId] = useState('');
    const [activeEditOption, setActiveEditOption] = useState(null);
    const [activeEditOption2, setActiveEditOption2] = useState(null);
    const [expandedCurriculum, setExpandedCurriculum] = useState(null);
    const [expandedCurriculum2, setExpandedCurriculum2] = useState(null);
    const [currentLessons, setCurrentLessons] = useState([]);
    const [curriculumData, setCurriculumData] = useState([]);

    const onCloseContentModal = () => { setOpenContentModal(false); setOpenBuildFromExisting(false) }
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

        const newCurriculumData = {
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
            const isEdit = currentCurriculumId && (currentCurriculumId.length > 0 || currentCurriculumId > 0);
            const isSubCurriculum = (currentSubCurriculumId && (currentSubCurriculumId.length > 0 || currentCurriculumId > 0)) || newSubCurriculum;
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

            return [...prevCurriculumData, newCurriculumData];
        });

        setCurrentCurriculumId('');
        setCurrentSubCurriculumId('');
        setNewCurriculum(false);
        setNewSubCurriculum(false);
        setOpenCurriculumModal(false);
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
            checked: true,
        };

        const subLesson = {
            id: generateUniqueId(),
            lessonTitle: lessonTitle,
            lessonSlug: lessonSlug,
            lessonContent: lessonContent,
            checked: false,
        };

        setCurriculumData((prevCurriculumData) =>
            prevCurriculumData.map((curriculum) => {
                if (curriculum.id === currentCurriculumId) {
                    if (openBuildFromExisting && currentSubCurriculumId) {
                        setCurrentLessons((prevLessons) => [...(prevLessons || []), subLesson]);
                        return {
                            ...curriculum,
                            subCurriculums: curriculum?.subCurriculums?.map((subCurriculum) =>
                                subCurriculum.id === currentSubCurriculumId
                                    ? {
                                        ...subCurriculum,
                                        subCurriculumContents: [
                                            ...(subCurriculum?.subCurriculumContents || []),
                                            subLesson,
                                        ],
                                    }
                                    : subCurriculum
                            ),
                        };
                    }
                    setCurrentLessons((prevLessons) => [...(prevLessons || []), newLesson]);
                    if (
                        ((typeof currentSubCurriculumLessonId === 'string' && currentSubCurriculumLessonId.length > 0) ||
                            (typeof currentSubCurriculumLessonId === 'number' && currentSubCurriculumLessonId > 0)) ||
                        ((typeof currentSubCurriculumId === 'string' && currentSubCurriculumId.length > 0) ||
                            (typeof currentSubCurriculumId === 'number' && currentSubCurriculumId > 0))

                    ) {
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

    const handleCheckboxChange = (id) => {
        const updatedLessons = currentLessons.map(lesson =>
            lesson.id === id ? { ...lesson, checked: !lesson.checked } : lesson
        );
        const updatedCurriculumData = curriculumData.map(curriculum => ({
            ...curriculum,
            subCurriculums: curriculum.subCurriculums.map(subCurriculum => ({
                ...subCurriculum,
                subCurriculumContents: subCurriculum.subCurriculumContents.map(content =>
                    content.id === id ? { ...content, checked: !content.checked } : content
                )
            }))
        }));
        setCurrentLessons(updatedLessons);
        setCurriculumData(updatedCurriculumData);
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
                                    <h4><PiDotsSixVerticalLight />{curriculum.title}</h4>

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
                                                        setCurrentCurriculum(curriculum)
                                                        setCurrentCurriculumId(curriculum.id)
                                                        setOpenCurriculumModal(true)
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
                                                    <p><PiDotsSixVerticalLight /> Lesson - {curriculumContent.lessonTitle}</p>
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
                                                        <p><PiDotsSixVerticalLight /> Sub Curriculum - {subCurriculum.title}</p>
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
                                                                            setCurrentCurriculum(subCurriculum)
                                                                            setOpenCurriculumModal(true)

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
                                                                    subCurriculum.subCurriculumContents.map((subCurriculumContent) => {
                                                                        if (subCurriculumContent?.checked) {
                                                                            return (
                                                                                <div
                                                                                    key={subCurriculumContent.id}
                                                                                    className='kzui-course-builder__curriculum-item__curriculum-content'
                                                                                >
                                                                                    <p><PiDotsSixVerticalLight /> Lesson - {subCurriculumContent.lessonTitle}</p>
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
                                                                            )
                                                                        }
                                                                    }))}

                                                                <button className='kzui-sub-curriculum-content-button' onClick={() => {
                                                                    setOpenContentModal(true)
                                                                    setCurrentCurriculumId(curriculum.id)
                                                                    setCurrentSubCurriculumId(subCurriculum.id)
                                                                    setCurrentLessons(subCurriculum?.subCurriculumContents)
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
                            handleNewCurriculumSubmit={handleCurriculumSubmit}
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

            <Modal open={openCurriculumModal} onClose={() => setOpenCurriculumModal(false)} center>
                <AddNewCurriculum
                    handleNewCurriculumSubmit={handleCurriculumSubmit}
                    setNewCurriculum={setNewCurriculum}
                    curriCulumData={currentCurriculum}
                />
            </Modal>

            <Modal classNames={{
                modal: "kzui-content-modal"
            }} open={openContentModal} onClose={onCloseContentModal} center>
                <div className='kzui-content-modal-header'>
                    <button onClick={() => {
                        setOpenBuildFromExisting(false);
                    }}>Start from scratch</button>
                    <button onClick={() => {
                        setOpenBuildFromExisting(true)
                    }}>Build from existing</button>
                </div>
                <div className='kzui-divider'></div>
                {
                    openBuildFromExisting ? (
                        <div className='kzui-content-modal-existing-build'>
                            <div className='kzui-content-modal-existing-build__sidebar'>
                                <button className='lesson'>Lesson</button>
                                <button>Quiz</button>
                                <button>Assignment</button>
                                <button>Tutor Booking</button>
                            </div>
                            <div className='kzui-content-modal-existing-build__contents'>
                                <div className='kzui-content-modal-existing-build__contents__header'>
                                    <input type="text" placeholder='Search' />
                                    <button onClick={() => {
                                        setOpenLessonModal(true)
                                        setCurrentCurriculum({})
                                    }}>Add Lesson</button>
                                </div>
                                <div className='kzui-content-modal-existing-build__contents__lessons'>
                                    {currentLessons.length > 0 && currentLessons.map((lesson) => (
                                        <div key={lesson.id} className='kzui-content-modal-existing-build__contents__lessons__item'>
                                            <div>
                                                <input type="checkbox" checked={lesson.checked} onChange={() => handleCheckboxChange(lesson.id)} />
                                                <label>{lesson.lessonTitle}</label>
                                            </div>
                                            <button onClick={() => {
                                                handleEditLesson(currentCurriculumId, lesson.id)
                                                setCurrentSubCurriculumLessonId(lesson.id)
                                                setOpenLessonModal(true)
                                            }}><MdEdit /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='kzui-content-modal-contents'>
                            <button onClick={() => {
                                setOpenLessonModal(true)
                                setCurrentCurriculum({})
                            }}>Add Lesson</button>
                            <button>Add Quiz</button>
                            <button>New Assignment</button>
                            <button>Add Tutor Booking</button>
                        </div>
                    )
                }
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

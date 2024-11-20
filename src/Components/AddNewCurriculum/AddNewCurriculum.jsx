import React from 'react';

const AddNewCurriculum = ({handleNewCurriculumSubmit, setNewCurriculum, setNewSubCurriculum, curriCulumData}) => {
    return (
        <form onSubmit={handleNewCurriculumSubmit} action="" className='kzui-course-builder__add-new-course'>
        <div className='kzui-course-builder__input'>
            <input defaultValue={curriCulumData?.title} type="text" name='title' placeholder='Add title here' required />
            <input defaultValue={curriCulumData?.summary} type="text" name='summary' placeholder='Add summary here' />
        </div>
        <div className='kzui-course-builder__button'>
            <button
                type='button'
                onClick={() => {
                    setNewCurriculum(false);
                    setNewSubCurriculum(false);
                }}
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
    );
};

export default AddNewCurriculum;
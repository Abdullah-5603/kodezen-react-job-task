import './App.css'
import CourseBuilder from './Components/CourseBuilder/CourseBuilder'
import CourseImageIntro from './Components/CourseImageIntro/CourseImageIntro'
import CourseInstructor from './Components/CourseInstructor/CourseInstructor'
import CourseOrganization from './Components/CourseOrganization/CourseOrganization'
import CoursePrerequisite from './Components/CoursePrerequisite/CoursePrerequisite'
import CourseSetting from './Components/CourseSetting/CourseSetting'
import CourseType from './Components/CourseType/CourseType'
import GeneralSection from './Components/GeneralSection/GeneralSection'
import Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'

function App() {

  return (
    <div className='kzui-layout'>
      <Navbar />
      <Header />
      <div className='kzui-layout__page'>
        <div className='kzui-layout__page__left'>
          <GeneralSection />
          <CourseImageIntro />
          <CourseSetting />
          <CourseBuilder />
          <CourseInstructor/>
        </div>
        <div className='kzui-layout__page__right'>
          <CourseType />
          <CourseOrganization />
          <CoursePrerequisite />
        </div>
      </div>
    </div>
  )
}

export default App

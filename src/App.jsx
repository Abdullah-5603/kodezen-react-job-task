import './App.css'
import CourseOrganization from './Components/CourseOrganization/CourseOrganization'
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
        </div>
        <div className='kzui-layout__page__right'>
          <CourseType />
          <CourseOrganization/>
        </div>
      </div>
    </div>
  )
}

export default App

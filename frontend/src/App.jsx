import { useState } from 'react'
import UploadBatchButton from './Components/UploadBatchButton'
import StudyTable from './Screens/StudyTable'
import UpdateStudies from './Components/UpdateStudies';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  const [pageNo, setPageNo] = useState(1);

  return (
    <>
      <div>
        <UploadBatchButton />
        <UpdateStudies />
        <Routes>
          <Route path='/' element={<Navigate to={"/studies"} />} />
          <Route path='/studies' element={<StudyTable pageNo={pageNo} />} />
          {/* <Route/>
          <Route/>
          <Route/> */}
        </Routes>
      </div>
    </>
  )
}

export default App

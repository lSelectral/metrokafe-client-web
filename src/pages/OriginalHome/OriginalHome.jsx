import React from 'react'
import EntryForm from '../../components/EntryForm/EntryForm'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './OriginalHome.scss'

const OriginalHome = () => {
  return (
    <div className="original-home">
        <Navbar/>
        <div className="center">
          <Sidebar/>
          <EntryForm/>
        </div>
    </div>
  )
}

export default OriginalHome
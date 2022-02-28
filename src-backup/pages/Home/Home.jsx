import React from 'react'
import EntryForm from '../../components/EntryForm/EntryForm'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Table from '../../components/Table/Table'
import './Home.scss'

const Home = () => {
  return (
    <div className="home">
        <Navbar/>
        <div className="center">
          <Sidebar/>
          <EntryForm/>
        </div>
    </div>
  )
}

export default Home
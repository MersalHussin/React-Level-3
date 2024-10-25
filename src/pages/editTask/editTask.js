import React from 'react'
import './editTask.css'
import Header from '../../comp/header'
import Footer from '../../comp/Footer'

function EditTask() {
  return (
    <>
    <Header/>
    <div className='edit-task'>

      {/* TITLE */}
      <section  className='title center'> 
        <h1>
          <input className='title-input' type="text" value={"Mersal Hussin"}/>
          <i className='fa-regular fa-pen-to-square'></i>
        </h1>
      </section>
      {/* SUB-TASKS SECTION */}
      <section className='sub-task'>
        <div className='info flex'>
          <p>Created: 6 days ago</p>
          <div>
            <label htmlFor="Complated">Complated</label>
            <input type="checkbox" name="Complated" id="Complated" />
          </div>
        </div>

        <div className='tasks'>
            <ul className='tasks-list'>
                <li>Please help me  <i className='fa-solid fa-trash'></i></li>
                <li>Please help me  <i className='fa-solid fa-trash'></i></li>
                <li>Please help me  <i className='fa-solid fa-trash'></i></li>
                <li>Please help me  <i className='fa-solid fa-trash'></i></li>
            </ul>
        </div>

      </section>
      {/* Add-MORE BTN & DELETE BTN */}
      <section className='btns flex '>
        <button className='add-more-btn'>
        Add More <i className='fa-solid fa-plus'></i>
        </button>

        <button className='delete'>
          Delete Task 
        </button>
      </section>
    </div>
    <Footer/>
    </>

  )
}

export default EditTask
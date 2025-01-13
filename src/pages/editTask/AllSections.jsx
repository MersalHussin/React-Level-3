import React, { useState } from 'react'
import {  useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Moment from 'react-moment';

function AllSections({user , stringId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const[checkCompalted, setCheckComplated] = useState(true)


if(loading){
  return(
    <h1>Loading</h1>
  )
}
if(error){
  return(
    <h1>Error</h1>
  )
}
if(user){
  console.log(value.data().complated)
  return (
    <>

{/* TITLE */}
    <section  className='title center'> 
    <h1>
      <input className='title-input' type="text" defaultValue={`${value.data().title}`}/>
      <i className='fa-regular fa-pen-to-square'></i>
    </h1>
  </section>
{/* SUB-TASKS */}
  <section className='sub-task'>
    <div className='info flex'>
      <p><Moment fromNow date={parseInt(value.data().id)}/></p>
      <div>
        <label htmlFor="Complated">Complated</label>
        <input onChange={()=>{}} type="checkbox" name="Complated" id="Complated" checked={value.data().complated}  />
      </div>
    </div>

    <div className='tasks'>
        <ul className='tasks-list'>
          {
            value.data().dataeils.map((dateailsItem,  index) => (
            <li key={dateailsItem}> 
                  <p>
                    {dateailsItem}
                  </p>
                 <i className='fa-solid fa-trash'></i>
            </li>
            ))
          }
        </ul>
    </div>
  </section>

{/*  BTNS */}
  <section className='btns flex '>
    <button className='add-more-btn'>
    Add More <i className='fa-solid fa-plus'></i>
    </button>

    <button className='delete'>
      Delete Task 
      
    </button>
  </section>
    </>
  )
}
}

export default AllSections
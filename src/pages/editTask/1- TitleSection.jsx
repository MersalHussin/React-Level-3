import React from 'react'
import {  useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function TitleSection({user , stringId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

console.log(stringId)

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
  console.log(value.data().title)
  return (
    <>
    <section  className='title center'> 
    <h1>
      <input className='title-input' type="text" defaultValue={`${value.data().title}`}/>
      <i className='fa-regular fa-pen-to-square'></i>
    </h1>
  </section>

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
    </>
  )
}
}

export default TitleSection
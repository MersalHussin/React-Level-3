import React from 'react'
import {  useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function SubTaskSection({user ,stringId}) {

    const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  
  return (
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
  )
}

export default SubTaskSection
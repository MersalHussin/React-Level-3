import React from 'react'
import {  useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function BTNSection({user,stringId}) {
    const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  return (
    <section className='btns flex '>
    <button className='add-more-btn'>
    Add More <i className='fa-solid fa-plus'></i>
    </button>

    <button className='delete'>
      Delete Task 
      
    </button>
  </section>
  )
}

export default BTNSection
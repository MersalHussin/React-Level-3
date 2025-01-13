import React from 'react'
import './editTask.css'
import Header from '../../comp/header'
import Footer from '../../comp/Footer'
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import TitleSection from './1- TitleSection';
import SubTaskSection from './2- SubTaskSection';
import BTNSection from './3- BTNSection';
import { useParams } from 'react-router-dom';
import AllSections from './AllSections';
function EditTask() {
  const [user, loading, error] = useAuthState(auth);
  let {stringId} = useParams()


  if(error){
    return <h1>Error Try Again</h1>
  }
  if(loading){
    return <h1>Loading</h1>
  }


  if(user){
    return (
      <>
      <Header/>
      <div className='edit-task'>
        <AllSections  user={user}  stringId={stringId}/>
        {/* TITLE */}
      {/* <TitleSection user={user}  stringId={stringId}/> */}
        {/* SUB-TASKS SECTION */}
      {/* <SubTaskSection user={user} stringId={stringId}/> */}
        {/* Add-MORE BTN & DELETE BTN */}
      {/* <BTNSection user={user} stringId={stringId}/> */}
      </div>
      <Footer/>
      </>
  
    )
  }
}

export default EditTask
import React from 'react'
import Deleteicon from '../svgs/Deleteicon';

const Note = ({note , getNotes}) => {
  //destructor note object
  const{note:text,id} = note;

  //delete note
  const deleteNote = async () => {
    try{
     const response = await fetch 
    (`https://firenote-213b1-default-rtdb.firebaseio.com/notes/${id}.json`,
    { method:'DELETE', }
      );
      if(!response.ok){
        throw new Error("Failed to delete this note.")
      }
      getNotes();
      }catch(error) {
        alert(error.message)
      }

  }
  return (
    <div className='card card-ctr'>
        <h3> + {text}</h3>
        <div onClick={deleteNote}>
        <Deleteicon />
        </div>
    </div>
  )
}

export default Note;
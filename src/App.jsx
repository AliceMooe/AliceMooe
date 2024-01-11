import { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
import Intro from "./components/Intro";



function App() {
  //define state 
  const [notes,setNotes] = useState([]);

  const [isLoading,setLoading] = useState(false);
  const [isError,setError]     = useState(false);
  // get notes when start
  useEffect(()=> {
    getNotes();
  },[])

  //get note
  const getNotes = async ()=>{
    setLoading(true);
    try{
      
    const response = await fetch("https://firenote-213b1-default-rtdb.firebaseio.com/notes.json");
    if(!response.ok){throw new Error('Cannot connect to the firebase.Come back soon.')}
    const notes = await response.json();

    const modifiedNote = [];

    for(const key in notes){
      modifiedNote.push({id : key,note : notes[key]});
    }
    setNotes(modifiedNote);
  }catch(error){
   setError(error.message);
  }
  setLoading(false);
  }
  return (
    <>
   
    <Navbar totalNotes={notes.length} />
    <AddNote getNotes={getNotes}/>
   
   
     {/* Show loading spinner if data is not yet loaded */}
     {isLoading && !isError && <div className="loader"></div>}

    {/* Show error message if there was an issue retrieving the data */}
    {isError && !isLoading&& <p className="error"> {isError} </p> }

   
    {/* Map through array of notes and display each one */}
    {!isLoading && !isError && (
      <>
       {
      notes.map((note,index)=> (
        <Note key={index} note={note} getNotes={getNotes} />
      ))
    }
      </>
    )}
     { notes.length === 0 && <Intro />}


    </>
  );
}

export default App;

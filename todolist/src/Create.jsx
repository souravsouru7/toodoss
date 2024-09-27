import React, { useState } from 'react'
import axios from 'axios';
function Create() {

  const [task,setTask]=useState();
  const handletask=()=>{
    axios.post("http://localhost:3001/addtask",{task:task})
    .then((data)=>console.log(data)
    .catch((erro)=>{
      console.log(erro);
      
    })
    )

  }
  return (
    <div>

        <input type="text" name='' placeholder='add the input ' onChange={(e)=>setTask(e.target.value)} />
        <button type='button' onClick={handletask}> ADD</button>
    </div>
  )
}

export default Create
import { useEffect, useState } from 'react'
import AllTasks from './components/AllTasks'
import Mode from './components/Mode'



function App() {
  let [input, setInput] = useState("")
  let [tasks, setTasks] = useState(()=> JSON.parse(localStorage.getItem("Todo-Tasks")) || [])
  let [editId, setEditId] = useState(null)
  let [isDark , setIsDark] = useState(()=> JSON.parse(localStorage.getItem("Todo-Mode"))|| false)


useEffect(()=>{
localStorage.setItem("Todo-Tasks", JSON.stringify(tasks))
},[tasks])

useEffect(()=>{
  localStorage.setItem("Todo-Mode", JSON.stringify(isDark))
},[isDark])
  function addOrUpdateTask() {
if(editId !== null){
  let updatedTask = tasks.map((task)=> 
  task.id === editId ? {...task , text : input} : task
  )
  setTasks(updatedTask)
  setEditId(null)
    setInput("")

}
else{
   if (input.trim() !== "") {
      let newTask = {
        id: Date.now(),
        text: input,
        completed: false
      }

      setTasks([newTask, ...tasks])
      setInput("")
    }
}



   
  }
  function deleteTask(index) {
    let filteredTasks = tasks.filter((task, i) => index !== i)
    setTasks(filteredTasks)

  }

  function completeTask(id) {
    let updated = tasks.map((task) => {
      return id === task.id ? { ...task, completed: true } : task
    })

    updated.sort((a, b) => a.completed - b.completed)
    setTasks(updated)
  }

  function editTask(id){
 const updatedTask = tasks.find((task)=> task.id === id )
 setInput(updatedTask.text)
 setEditId(id)
  }




  return (
    <div className={`app ${isDark?"dark":""}`}>
      <h1>My Todo List</h1>
      <Mode setIsDark = {setIsDark} isDark={isDark} />
      <div className="input-area">
        <input type="text" placeholder='Enter Task'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        <button className="add-task" onClick={addOrUpdateTask}>

          {editId === null? "Add" : "Update"}
        </button>
      </div>
      <div className="task-area">
        {tasks.length === 0? (
         <h2 className='no-task'>There are no tasks yet</h2>
        ) : (
          <>
          <AllTasks tasks = {tasks} deleteTask = {deleteTask} completeTask={completeTask} editTask = {editTask}
          isDark = {isDark}/>
        </>
        )
      }
       
      </div>
    </div>
  )
}

export default App

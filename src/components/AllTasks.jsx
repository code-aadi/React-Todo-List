import React from 'react'

const AllTasks = ({tasks , deleteTask , completeTask , editTask , isDark}) => {
  return (
    <>
     <ul>
          {tasks.map((task, index) =>
            <li 
             key={task.id}>
                <span className='check-task-cont'>
              <input type="checkbox"
                checked={task.completed}
                onChange={() => {
                  completeTask(task.id)
                }}
              />
              <span className= {`task-text ${task.completed ? "completed" : ""}`} >{task.text}</span>

                </span>
              <span className="del-edit-cont">
              <img 
              src='delete-symbol.png'
              className={`delete-btn ${isDark?"dark-del":""}`}
                onClick={() => {
                  deleteTask(index)
                }}
              ></img>

              <img className={`edit-btn ${isDark?"dark-edit":""} ${task.completed?"disabled":""}`}
              src='edit.png'
                onClick={() => {
                  editTask(task.id)
                 
                }}
              ></img>
              </span>
            </li>)}
        </ul>
    </>
  )
}

export default AllTasks

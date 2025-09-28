import Task from "./Task" 
import "./ShowTask.css"
export default function ShowTask({tasks}) {

  return (
    <div className='list'>
    <ul>
      {tasks.map((task) => (
          <Task key={task.id} task={task} />
      ))}
    </ul>
      
    </div>
  )
}

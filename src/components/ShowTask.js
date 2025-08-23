import Task from "./Task" 
import "./ShowTask.css"
export default function ShowTask({tasks,setTasks}) {

  return (
    <div className='list'>
    <ul>
  {tasks.map((task) => (
    
  
      <Task setTasks={setTasks} key={task.id} tasks={tasks} task={task}/>
  
  ))}
</ul>
      
    </div>
  )
}

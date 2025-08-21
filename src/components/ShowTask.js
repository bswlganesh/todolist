
import "./ShowTask.css"
export default function ShowTask({tasks,setTasks}) {
  
  
  return (
    <div className='list'>
    <ul>
  {tasks.map((task) => (
    <li key={task.id}>
      <p>Name: {task.name}</p>
      <p>Time: {task.time}</p>
    </li>
  ))}
</ul>
      
    </div>
  )
}

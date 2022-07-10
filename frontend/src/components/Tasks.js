import Task from './Task';
const Tasks = ({tasks , updateImportant , onDelete}) =>{
    
    
    return (
        <div className='task-list'>
            {
              tasks.map((task) =>
                <Task key={task.id} task={task} updateImportant={updateImportant} onDelete={onDelete}/>
              )
            }
        </div>
    )
}


export default Tasks;
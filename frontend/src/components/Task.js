const Task = ({task , updateImportant , onDelete}) =>{
    const {id,title , description , important , count} = task;  
    return (
        <div className={important === true ? "task important" : "task"} onDoubleClick={()=>updateImportant(id)}>
            <div className="header">
                <h3>{title}</h3>
                <p>{count}</p>
                <ion-icon name="close-outline" onClick={()=>onDelete(id)}></ion-icon>
            </div>
            <p>{description}</p>
        </div>
    )
  
}



export default Task;
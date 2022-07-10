
import { useState } from "react";

const Form = ({addTask}) => {

    

    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [reminder , setReminder] = useState(false);
    const onSubmit = (e) =>{
        e.preventDefault();
        if(title !== '' && description !== ''){
            addTask({title , description , important : reminder});
            setTitle('');
            setDescription('');
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="task-title">Task</label>
            <input type="text" id="task-title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label htmlFor="task-description">Description</label>
            <input type="text" id="task-description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <div className="reminder">
                <label htmlFor="reminder">Set Reminder</label>
                <input type="checkbox" id="reminder" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type="submit" className="btn btn-block" value="Save" />
        </form>
    );
}

export default Form;
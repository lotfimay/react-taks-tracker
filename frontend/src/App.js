import {useState , useEffect} from 'react'
import Header from './components/Header';
import Form from './components/Form';
import Tasks from './components/Tasks';
import axios from 'axios';



function App() {


  const [tasks , setTasks] = useState([]);



  const [showAdd , setShowAdd] = useState(false)

  useEffect(()=>{
       const getTasks = async() =>{
         const tasksFromSever = await fetchTasks();
         setTasks(tasksFromSever);
       }
       getTasks(); 
  } , [] );


  const fetchTasks = async() =>{
      const res = await axios.get('/api/tasks');
      const data = res.data;
      let result = [];
      data.forEach((task) =>{
        result.push({
          id : task.task_id,
          title : task.task_title,
          description : task.task_description,
          important : task.reminder,
        })
      })
      return result;
  }


  const updateImportant = (id) =>{ 
     const task = tasks.filter((task) => task.id === id)[0];
     axios.patch(`/api/tasks/update_reminder/${id}` ,{
          reminder : !task.important
     }).then((response) =>{
           if(response.status === 200){
            setTasks(tasks.map(task => task.id === id ? {...task , important:!task.important} : task));
           }
           else console.log('something went wrong');
     })
     .catch((err) => {
         console.log(err);
     })
     
  }

  const onDelete = (id) =>{
    axios.delete(`/api/tasks/${id}`)
       .then(() =>  setTasks(tasks.filter(task => task.id !== id)))
       .catch((err) => console.log('something went wrong'));
  }

 
  const addTask = (data) =>{
      axios.post('/api/tasks',{
        data : {
          task_title : data.title,
          task_description : data.description,
          reminder : data.important,
        }
      })
      .then((response) => {
        if(response.status === 200){
          console.log(response);
          data.id = response.data.task_id;
          setTasks([...tasks , data])
        }
        else console.log('Something went wrong')
      })
      .catch((err) => console.log(err));
      
  }

 
  
  return (
    <div className="container">
      <Header 
      title="Task Tracker" 
      showAdd={showAdd} 
      onAdd={()=>setShowAdd(!showAdd)}
      />
      {!showAdd && <Form addTask={addTask}/>}
      <Tasks 
      tasks={tasks}
      updateImportant={updateImportant}
      onDelete={onDelete}
      />
    </div>
  );
}

export default App;

const  { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient();



const all_tasks = async(req , res) =>{
    try{
        let tasks = await prisma.task.findMany();
        tasks.forEach(task => task.task_id = parseInt(task.task_id));
        return res.json(tasks);
    }catch(err){ 
        console.log(err);
        return res.status(500).json({'message' : 'Something went wrong'});
    }
}

const task_by_id = async(req  , res) =>{
    try{
        let task = await prisma.task.findUnique({
            where : {
                task_id : parseInt(req.params.task_id),
            }
        });
        if(task)
            task.task_id = parseInt(task.task_id);
        return res.json(task);
    }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'Something went wrong'});
    }
}

const add_task = async (req , res) =>{
    try{
        console.log(req.body);
        const {task_title , task_description , reminder } = req.body.data;
        let new_task = await prisma.task.create({
            data : {
                task_title : task_title,
                task_description : task_description ,
                reminder : reminder,
            }
        });
        new_task.task_id = parseInt(new_task.task_id);
        return res.json(new_task);
    }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'something went wrong !'})
    }
}

const update_task_importance = async(req , res) =>{
    try {
      let updated_task = await prisma.task.update({
        data : {
            reminder : req.body.reminder
        },
        where : {
            task_id : parseInt(req.params.task_id),
        }
      });
      return res.json({'message'  : 'task updated succesfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'something went wrong !'});
    }
}

const delete_task = async(req , res) =>{
    try{
      const deleted_task = await prisma.task.delete({
        where : {
            task_id : parseInt(req.params.task_id),
        }
      });
      return res.json({'message' : 'deleted successfully'})
    }catch(err){
      console.log(err);
      return res.json({'message' : 'something went wrong'})
    }
}






module.exports = {
    all_tasks,
    task_by_id,
    add_task,
    update_task_importance,
    delete_task,
}


const express = require('express');
const tasksRouter = require('./routes/taskRouter');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/tasks' , tasksRouter);



app.listen(3001 , () => {
    console.log('Server running on port 3001 ...');
});
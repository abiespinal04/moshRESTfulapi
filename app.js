
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
//PORT
//Create an enviroment variable ( export PORT = 5000)
const port = process.env.PORT || 3000;
const courses = [
    {id:1, name: 'Course1'},
    {id:2, name: 'Course2'},
    {id:3, name: 'Course3'}
]

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
  
});

app.get('/api/courses/:id', (req,res)=>{
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send("The course with given ID was not found");
  else{
      res.status(200).send(course);
  }
});

// app.post('/api/courses', (req,res) => {
//     res.send(courses);

// });

app.post('/api/courses', (req,res)=>{
    const schema = {
        name : Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);


    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
   
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course); // the push method appends to the array
    res.send(course);
});
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

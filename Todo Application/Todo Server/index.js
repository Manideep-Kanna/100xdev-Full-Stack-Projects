import express from 'express'
import {v4 as uuidv4} from 'uuid'

const todosList = [
    {
        id: "kanna",
        title: "Buy Groceries",
        description: "Purchase fruits, vegetables, and milk from the supermarket.",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "Complete Assignment",
        description: "Finish the math assignment due tomorrow.",
        completed: true,
    },
    {
        id: uuidv4(),
        title: "Call John",
        description: "Discuss the project details with John over the phone.",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "Workout",
        description: "Go to the gym for a cardio session.",
        completed: true,
    },
    {
        id: uuidv4(),
        title: "Read a Book",
        description: "Read 30 pages of 'Atomic Habits' by James Clear.",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "Plan Vacation",
        description: "Research destinations and book flights for the summer vacation.",
        completed: true,
    },
    {
        id: uuidv4(),
        title: "Attend Meeting",
        description: "Join the Zoom call for the project update meeting at 10 AM.",
        completed: true,
    },
    {
        id: uuidv4(),
        title: "Pay Bills",
        description: "Pay electricity and internet bills before the due date.",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "Clean House",
        description: "Vacuum the living room and clean the kitchen.",
        completed: true,
    },
    {
        id: uuidv4(),
        title: "Cook Dinner",
        description: "Prepare pasta and salad for dinner.",
        completed: false,
    }
];


const app = express();
app.use(express.json())


app.get("/todos",(req,res) =>{
    res.send(todosList).status(200)
})

app.get("/todos/:id",(req,res) =>{
    const todoId = req.params.id;
    const todo = todosList.find(todo => todo.id == todoId);

    if(todo){
        res.send(todo).status(200)
    }
    else{
        res.send("No Todo with this ID please check it").status(404)
    }
})

app.post("/todos",(req,res) =>{
    const title = req.body.title;
    const description = req.body.description;
    const id = uuidv4();
    todosList.push({id,title,description,completed:false})

    res.send({id}).status(201)
    
})

app.put("/todos/:id",(req,res) =>{
    const todoId = req.params.id;
    const todo = todosList.find(todo => todo.id == todoId);
    const updatedTitle = req.body.title;
    const updatedComplete = req.body.completed;

    if(!todo) res.sendStatus(404)

    todo.title = updatedTitle;
    todo.completed = updatedComplete;
    
    res.send(todo);

});

app.delete("/todos/:id",(req,res) =>{
    const todoId = req.params.id;
    const foundIndex = todosList.findIndex(todo => todo.id == todoId);
    if(foundIndex == -1) res.sendStatus(404);
    todosList.splice(foundIndex,1);
    res.send (todosList)
})

app.listen(3000, () =>{
    console.log('App is running on PORT 3000')
})
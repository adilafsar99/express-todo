const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded())

const todos = [{
  id: 1,
  title: "A task that is not yet complete."
}]

app.get("/", (req, res)=> {
  res.send("A Todo app made using Node and Express JS.")
  console.log(req.body)
})

app.get("/get/todos", (req, res)=> {
  res.send(todos)
})

app.post('/add/todo', (req, res)=> {
  let todo = {
    id: todos.length + 1,
    title: req.body.title
  }
  todos.push(todo)
  res.send({
    todo, msg: "Task added."
  })
})

app.put('/edit/todo/:id', (req, res)=> {
  let id = req.params.id;
  let index = todos.findIndex(data => data.id == req.params.id);
  if (id && index !== -1) {
    todos.splice(index, 1, {
      id: +req.params.id,
      title: req.body.title
    })
    res.send("Task updated.")
  } else {
    res.send("Invalid ID or task.")
  }
})

app.delete('/delete/todo/:id', (req, res)=> {
  let id = req.params.id;
  let index = todos.findIndex(data => data.id == req.params.id);
  if (id && index !== -1) {
    todos.splice(index, 1)
    res.send("Task deleted.")
  } else {
    res.send("Invalid ID or task.")
  }
})

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})
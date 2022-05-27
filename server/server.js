import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { pool } from "./config/database.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get specific todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    todo.rowCount !== 0
      ? res.json(todo.rows[0])
      : res.status(404).json("id doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
  }
});

//insert new todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
    console.log("The data was successfully added to the database!");
  } catch (error) {
    console.log(error.message);
  }
});

//update specific todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    updateTodo.rowCount !== 0
      ? res.json("The update completed successfully!")
      : res.status(404).json("id doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
  }
});

//delete specific todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    deleteTodo.rowCount !== 0
      ? res.json("Deletion completed successfully!")
      : res.status(404).json("id doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is listening on port ${process.env.SERVER_PORT}!`)
);

import express from "express";

import { pool } from "../config/database";
import {
  SEARCH_QUERY,
  GET_ALL_QUERY,
  GET_SPECIFIC_QUERY,
  INSERT_QUERY,
  UPDATE_QUERY,
  DELETE_QUERY,
} from "../constants/dbQuery";

const router = express.Router();

//search todos
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const todos = await pool.query(SEARCH_QUERY + `'${query}%'`);
    todos.rowCount !== 0
      ? res.json(todos.rows)
      : res.status(404).json("todo doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
  }
});

//get all todos
router.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(GET_ALL_QUERY);
    allTodos.rowCount !== 0
      ? res.json(allTodos.rows)
      : res
          .status(404)
          .json({ error: "todos doesn`t exists, please try again" });
  } catch (error) {
    console.log(error.message);
  }
});

//get specific todo
router.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(GET_SPECIFIC_QUERY, [id]);
    todo.rowCount !== 0
      ? res.json(todo.rows[0])
      : res.status(404).json("id doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
    S;
  }
});

//insert new todo
router.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(INSERT_QUERY, [description]);
    res.json(newTodo.rows[0]);
    console.log("The data was successfully added to the database!");
  } catch (error) {
    console.log(error.message);
  }
});

//update specific todo
router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(UPDATE_QUERY, [description, id]);
    updateTodo.rowCount !== 0
      ? res.json("The update completed successfully!")
      : res.status(404).json("id doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
  }
});

//delete specific todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(DELETE_QUERY, [id]);
    deleteTodo.rowCount !== 0
      ? res.json("Deletion completed successfully!")
      : res.status(404).json("id doesn`t exist, please try again");
  } catch (error) {
    console.log(error.message);
  }
});

export default router;

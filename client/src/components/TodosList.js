import React, { Fragment, useState, useEffect } from "react";
import { apiCallDelete, apiCallTodos } from "../api/api";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import Search from "./Search";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getTodos = async () => {
    await apiCallTodos("http://localhost:5000/todos")
      .then((response) => {
        if (typeof response !== "string") {
          const todosArray = response;
          setTodos(todosArray);
          console.log("OK");
        } else {
          console.log("No results!");
        }
      })
      .catch((error) => console.error(error.message));
  };

  const deleteTodo = async (id) => {
    const headers = {
      method: "DELETE",
    };
    await apiCallDelete(`http://localhost:5000/todos/${id}`, headers)
      .then((response) => {
        if (response !== 404) {
          setTodos(todos.filter((todo) => todo.todo_id !== id));
          setTodosChange(true);
          console.log("Success!");
        } else {
          console.log("Couldn`t Delete!");
        }
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    getTodos();
    setTodosChange(false);
    console.log("CHANGED !");
  }, [todosChange]);

  return todos.length !== 0 && typeof todos !== "string" ? (
    <Fragment>
      <Search setTodosChange={setTodosChange} setTodos={setTodos} />
      <AddTodo setTodosChange={setTodosChange} />
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} setTodosChange={setTodosChange} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  ) : (
    <h3 className="text-center mt-5">No todos to display, try again!</h3>
  );
};

export default TodosList;

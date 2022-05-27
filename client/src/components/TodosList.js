import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const TodosList = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");

    const todosArray = await res.json();
    setTodos(todosArray);
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      if (res.status !== 404) {
        setTodos(todos.filter((todo) => todo.todo_id !== id));
        console.log("Success!");
      } else {
        console.log("Error!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return todos.length !== 0 ? (
    <Fragment>
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
                <EditTodo todo={todo} />
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
    <h3 className="text-center mt-5">
      No todos to display, please add a todo.
    </h3>
  );
};

export default TodosList;

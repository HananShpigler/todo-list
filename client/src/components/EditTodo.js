import React, { Fragment, useState } from "react";
import { apiCallEdit } from "../api/api";

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);

  const editText = async (id) => {
    try {
      const desc = { description };
      if (description) {
        const headers = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(desc),
        };
        await apiCallEdit(`http://localhost:5000/todos/${id}`, headers)
          .then((response) => {
            setTodosChange(true);
            console.log(response);
          })
          .catch((error) => console.error(error.message));
      } else {
        console.log("Description can`t be empty");
      }
    } catch (error) {
      console.error("Error!");
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(todo.todo_id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;

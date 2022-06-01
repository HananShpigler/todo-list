import React, { Fragment, useState } from "react";
import { apiCallAdd } from "../api/api";

const AddTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const desc = { description };
    if (description) {
      const headers = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(desc),
      };
      await apiCallAdd("http://localhost:5000/todos", headers)
        .then((response) => {
          setTodosChange(true);
          setDescription("");
          console.log(response);
        })
        .catch((error) => console.error(error.message));
    } else {
      console.log("Description can`t be empty");
    }
  };

  return (
    <Fragment>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Add To-Do"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">ADD</button>
      </form>
    </Fragment>
  );
};

export default AddTodo;

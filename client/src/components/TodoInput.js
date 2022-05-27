import React, { Fragment, useState } from "react";

const TodoInput = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const desc = { description };

      if (description) {
        const res = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(desc),
        });
        console.log("response status: ", res.status);
      } else {
        console.log("Description can`t be empty");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Todo Input</h1>
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

export default TodoInput;

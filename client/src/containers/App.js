import React, { Fragment } from "react";
import "./App.css";
import TodoInput from "../components/TodoInput";
import TodosList from "../components/TodosList";

function App() {
  return (
    <Fragment>
      <div className="container">
        <TodoInput />
        <TodosList />
      </div>
    </Fragment>
  );
}

export default App;

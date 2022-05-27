import React, { Fragment } from "react";
import "./App.css";
import TodosList from "../components/TodosList";
import Header from "../components/Header";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Header />
        <TodosList />
      </div>
    </Fragment>
  );
}

export default App;

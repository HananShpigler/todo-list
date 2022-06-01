import React, { Fragment, useState } from "react";
import { apiCallSearch } from "../api/api";

const Search = ({ setTodos }) => {
  const [query, setQuery] = useState("");

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    if (query) {
      await apiCallSearch(`http://localhost:5000/search?query=${query}`)
        .then((response) => {
          if (typeof response !== "string") {
            const todosArray = response;
            setQuery("");
            setTodos(todosArray);
            console.log("OK");
          } else {
            console.log("No results!");
          }
        })
        .catch((error) => console.error(error.message));
    } else {
      console.log("Search can`t be empty");
    }
  };

  return (
    <Fragment>
      <form className="d-flex mb-3" onSubmit={onSubmitSearch}>
        <input
          type="text"
          placeholder="Search To-Do"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>
    </Fragment>
  );
};

export default Search;

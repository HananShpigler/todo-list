export const SEARCH_QUERY = "SELECT * FROM todo WHERE description LIKE";
export const GET_ALL_QUERY = "SELECT * FROM todo";
export const GET_SPECIFIC_QUERY = "SELECT * FROM todo WHERE todo_id = $1";
export const INSERT_QUERY =
  "INSERT INTO todo (description) VALUES($1) RETURNING *";
export const UPDATE_QUERY =
  "UPDATE todo SET description = $1 WHERE todo_id = $2";
export const DELETE_QUERY = "DELETE FROM todo WHERE todo_id = $1";

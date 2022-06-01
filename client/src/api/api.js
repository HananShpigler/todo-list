export const apiCallAdd = (link, headers) =>
  fetch(link, headers).then((response) => response.statusText);

export const apiCallEdit = (link, headers) =>
  fetch(link, headers).then((response) => response.statusText);

export const apiCallSearch = (link) =>
  fetch(link).then((response) => response.json());

export const apiCallTodos = (link) =>
  fetch(link).then((response) => response.json());

export const apiCallDelete = (link, headers) =>
  fetch(link, headers).then((response) => response.status);

import { Database } from "bun:sqlite";

const db = new Database("todos.sqlite");

db.run(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)"
);

interface ITodo {
  id: number;
  task: string;
}

export const services = {
  list: () => db.query("SELECT * FROM todos").all() as ITodo[],
  add: (text: string) => {
    db.run("INSERT INTO todos (task) VALUES (?)", [text]);
  },
  remove: (id: string) => db.run("DELETE FROM todos WHERE id = ?", [id]),
};

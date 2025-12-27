import { Database } from "bun:sqlite";

// 1. Initialize db
const db = new Database("todos.sqlite");

// 2. Create todo table.
db.run(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)"
);

interface ITodo {
  id: number;
  text: string;
}

// 3. Functionalities factory
export const services = {
  list: () => db.query("SELECT * FROM todos").all() as ITodo[],
  add: (text: string) => db.run("INSERT INTO todos (text) VALUES (?)", [text]),
  delete: (id: string) => db.run("DELETE FROM todos WHERE id = ?", [id]),
};

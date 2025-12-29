import { Database } from "bun:sqlite";

const db = new Database("app.db");
db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
interface ITodo {
  id: number;
  task: string;
}
export const services = {
  read: () => db.query("SELECT * FROM todos").all() as ITodo[],
  create: (task: string) =>
    db.run("INSERT INTO todos (task) VALUES (?)", [task]),
  update: (id: string, task: string) =>
    db.run("UDPATE todos SET task = ? WHERE id = ?", [task, id]),
  delete: (id: string) => db.run("DELETE FROM todos WHERE id = ?", [id]),
};

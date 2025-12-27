import index from "./index.html";
import { services } from "./services";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/list": () => Response.json(services.list()),
    "/add": async (req) => {
      const formData = await req.formData();
      const todo = formData.get("todo")?.toString();
      if (todo) services.add(todo);
      return Response.redirect("/");
    },
    "/delete": (req) => {
      const id = new URL(req.url).searchParams.get("id");
      if (id) services.delete(id);
      return Response.redirect("/");
    },
  },
});

console.log(`Listening on ${server.url}`);

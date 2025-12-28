import index from "./index.html";
import { services } from "./services";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/api/list": () => Response.json(services.list()),
    "/api/add": async (req) => {
      const formData = await req.formData();
      const task = formData.get("task")?.toString();
      if (task) services.add(task);
      return Response.redirect("/");
    },
    "/api/delete": async (req) => {
      const id = new URL(req.url).searchParams.get("id");
      if (id) services.remove(id);
      return Response.redirect("/");
    },
  },
});

console.log(`Listening on ${server.url}`);

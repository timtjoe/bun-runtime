import index from "./index.html";
import { services } from "./services";
const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/api/all": () => Response.json(services.read()),
    "/api/create": async (req) => {
      const formData = await req.formData();
      const task = formData.get("task");
      if (task) services.create(task);
      return Response.redirect("/");
    },
    "/api/delete": (req) => {
      const id = new URL(req.url).searchParams.get("id");
      if (id) services.delete(id);
      return Response.redirect("/");
    },
  },
});

console.log(`Listening on ${server.url}`);

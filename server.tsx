const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req: any, res: any) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    });
  
    const io = new Server(server);
  
    io.on("connection", (socket: any) => {
      console.log("New user connected");
  
      socket.on("slideChange", (slideIndex: any) => {
        socket.broadcast.emit("slideChange", slideIndex);
      });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});

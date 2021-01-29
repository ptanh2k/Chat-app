const { Console } = require("console");
const express = require("express");
const uploadFile = require("express-fileupload");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("Disconnect", () => {
    console.log("User had left the room");
  });
});

app.use(uploadFile());
app.use(router);

app.post("/upload", (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file upload" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

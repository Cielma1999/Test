const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
/* const operation = require("./app/controllers/todo.controller"); */
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "欢迎访问 todolist" });
});

/* app.post("/todos",(req,res)=>operation.findAll(req,res)) */

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`服务器运行端口： ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync();
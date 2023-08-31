// const express = require("express");
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
let users = [
  {
    id: 1,
    name: "Hamdy",
  },
  {
    id: 2,
    name: "Ahmed",
  },
  {
    id: 3,
    name: "Youssef",
  },
];
// Create
app.post("/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    id: Date.now(),
  };
  users.push(newUser);
  res.json(newUser);
});
// Read
app.get("/users", (req, res) => {
  res.json(users);
});
// Update
app.put("/users", (req, res) => {
  const { id, name } = req.body;
  users = users.map((user) => {
    if (user.id === id) {
      user.name = name;
    }
    return user;
  });
  res.json(users);
});
// Create
app.delete("/users", (req, res) => {
  const id = req.body.id;
  users = users.filter((user) => user.id !== id);
  res.json(users);
});

const isAuthorized: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "mysecretvalue") {
    next();
  } else {
    res.status(401);
    res.json({ msg: "No Access" });
  }
};
// GET one user
app.get("/users/:id", isAuthorized, (req, res) => {
  const id = +req.params.id;
  const user = users.filter((user) => user.id === id);
  res.json(user);
});

// start
app.listen(port, () => {
  console.log("Server Start Running...");
});

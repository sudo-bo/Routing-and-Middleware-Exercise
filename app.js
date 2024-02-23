const express = require("express");
const items = require("./fakeDb");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  items.push(req.body);
  res.status(201).json({ added: req.body });
});

app.get("/items/:name", (req, res) => {
  const item = items.find((i) => i.name === req.params.name);
  if (!item) {
    return res.status(404).send("Item not found");
  }
  res.json(item);
});

app.patch("/items/:name", (req, res) => {
  const item = items.find((i) => i.name === req.params.name);
  if (!item) {
    return res.status(404).send("Item not found");
  }
  if (req.body.name) item.name = req.body.name;
  if (req.body.price) item.price = req.body.price;
  res.json({ updated: item });
});

app.delete("/items/:name", (req, res) => {
  const itemIndex = items.findIndex((i) => i.name === req.params.name);
  if (itemIndex === -1) {
    return res.status(404).send("Item not found");
  }
  items.splice(itemIndex, 1); // Remove item from the array
  res.json({ message: "Deleted" });
});

module.exports = app;

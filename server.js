require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jsxViewEngine = require("jsx-view-engine");
const pokemons = require("./models/pokemons.js");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

app.get("/", async (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", (req, res) => {
  res.render("Index", { pokemon: pokemons });
});

app.get("/pokemon/:id", (req, res) => {
  res.render("Show", { pokemon: pokemons[req.params.id] });
});

app.listen(3000, () => {
  console.log("My server is set up and running");
});

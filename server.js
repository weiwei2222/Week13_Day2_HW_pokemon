require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jsxViewEngine = require("jsx-view-engine");
const Pokemon = require("./models/pokemon");
// const pokemons = require("./models/pokemons.js");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.use((req, res, next) => {
  console.log("Middleware is running");
  next();
});
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", async (req, res) => {
  try {
    const foundAllPokemon = await Pokemon.find({});
    res.status(200).render("Index", { pokemon: foundAllPokemon });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/pokemon/new", async (req, res) => {
  res.render("New");
});

app.post("/pokemon", async (req, res) => {
  try {
    const createPokemon = await Pokemon.create(req.body);
    res.status(200).redirect("/pokemon");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/pokemon/:id", async (req, res) => {
  try {
    const foundOnePokemon = await Pokemon.findById(req.params.id);
    res.render("Show", {
      pokemon: foundOnePokemon,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(3000, () => {
  console.log("My server is set up and running");
});

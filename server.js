require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  res.send("Welcome to the <a href='/pokemon'>Pokemon</a> App!");
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

app.post("/pokemon/search", async (req, res) => {
  try {
    const searchPokemon = await Pokemon.find({ name: req.body.name });
    res.render("Search", { pokemon: searchPokemon });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/pokemon/:id", async (req, res) => {
  try {
    const foundOnePokemon = await Pokemon.findById(req.params.id);
    res.render("Show", { pokemon: foundOnePokemon });
  } catch (err) {
    res.status(400).send(err);
  }
});

// edit
app.get("/pokemon/:id/edit", async (req, res) => {
  try {
    const foundPokemon = await Pokemon.findById(req.params.id);
    res.status(200).render("Edit", { pokemon: foundPokemon });
  } catch (err) {
    res.status(400).send(err);
  }
});

// update
app.put("/pokemon/:id", async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).redirect(`/pokemon/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete
app.delete("/pokemon/:id", async (req, res) => {
  try {
    const deletePokemon = await Pokemon.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/pokemon");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(3000, () => {
  console.log("My server is set up and running");
});

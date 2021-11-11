const express = require("express");
const router = express.Router();
const data = require("../data");
const marvel = data.character;

// 1. GET
router.get("/", async (req, res) => {
  try {
    res.render("home", { title: "Character Finder" });
  } catch (e) {
    res.status(400).render("error", { erroe: e });
  }
});

// 2. POST
router.post("/search", async (req, res) => {
  try {
    const allCharacters = await marvel.getMarvelCharacters(
      req.body.searchTerm.trim()
    );
    res.render("character", {
      title: "Characters Found",
      searchTerm: req.body.searchTerm,
      result: allCharacters.data.results,
    });
    // return;
  } catch (e) {
    res.status(400).render("error", { error: e });
  }
});

// 3. GET
router.get("/characters/:id", async (req, res) => {
  try {
    const characterById = await marvel.getMarvelCharactersById(req.params.id);
    res.render("singleCharacter", {
      title: characterById.data.results[0].name,
      image: characterById.data.results[0].thumbnail.path,
      extension: characterById.data.results[0].thumbnail.extension,
      description: characterById.data.results[0].description,
      comics: characterById.data.results[0].comics.items,
    });
  } catch (e) {
    res.status(404).render("error", { error: e });
  }
});

module.exports = router;

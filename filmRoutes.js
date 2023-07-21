const express = require("express");
const router = express.Router();
const {readDataFromFile,writeDataToFile}=require("./input")


// Endpoint pour lister tous les films
router.get("/films", (req, res) => {
  const films = readDataFromFile();
  res.status(200).json(films);
});

// Endpoint pour créer un film
router.post("/film", (req, res) => {
  const { title, year, genre, director, actors, synopsis, location, thumbnail } = req.body;
  const film = {
    title,
    year,
    genre,
    director,
    actors,
    synopsis,
    location,
    thumbnail,
  };
  const films = readDataFromFile();
  films.push(film);
  writeDataToFile(films);
  res.status(200).json({ message: "Film added successfully" });
});


// Endpoint pour supprimer un film a base de son titre
router.delete("/films/:title", (req, res) => {
  const titleToDelete = req.params.title;
  const films = readDataFromFile();
  const filteredFilms = films.filter((film) => film.title !== titleToDelete);
 // Vérifier si le film a été trouvé et supprimé
  if (films.length === filteredFilms.length) {
    return res.status(404).json({ error: "Film not found" });
  }
  writeDataToFile(filteredFilms);
  res.status(200).json({ message: "Film deleted successfully" });
});


// Endpoint pour modifier un film a base de son titre 
router.put("/films/:title", (req, res) => {
  const title = req.params.title;
  const { year, genre, director, actors, synopsis, location, thumbnail } = req.body;
  const films = readDataFromFile();
  const updatedFilms = films.map((film) => {
    if (film.title === title) {
      return {
        title,
        year,
        genre,
        director,
        actors,
        synopsis,
        location,
        thumbnail,
      };
    }
    return film;
  });
 
  writeDataToFile(updatedFilms);
  res.status(200).json({ message: "Film updated successfully" });
});
 
module.exports = router;


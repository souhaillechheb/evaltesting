const request = require("supertest");
const app = require("./app");
//const fs = require("fs");
const data =require("./data.json")


describe("FilmDB API", () => {
    // beforeEach(() => {
    //     // Nettoyer les données avant chaque test
    //     fs.writeFileSync("./data.json", "[]");
    //   });

  it("should fetch all films", async () => {
    const res = await request(app).get("/api/films");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
  }); 

  it("should create a film", async () => {
    const film = {
      title: "Film ajout",
      year: 2022,
      genre: "Action",
      director: "Director 1",
      actors: "Actor 1, Actor 2",
      synopsis: "Synopsis 1",
      location: "/path/to/video/file1.mp4",
      thumbnail: "/path/to/thumbnail1.jpg",
    };
    const res = await request(app).post("/api/film").send(film);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film added successfully");
  });

  it("should create a film", async () => {
    const film = {
      title: "Film 2",
      year: 2022,
      genre: "drama",
      director: "Director 2",
      actors: "Actor 3, Actor 4",
      synopsis: "Synopsis 2",
      location: "/path/to/video/file1.mp4",
      thumbnail: "/path/to/thumbnail1.jpg",
    };
    const res = await request(app).post("/api/film").send(film);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film added successfully");
  });
  it("should create a film", async () => {
    const film = {
      title: "Film 3",
      year: 2056,
      genre: "HHHHH",
      director: "Director 2",
      actors: "Actor 3, Actor 4",
      synopsis: "Synopsis 2",
      location: "/path/to/video/file1.mp4",
      thumbnail: "/path/to/thumbnail1.jpg",
    };
    const res = await request(app).post("/api/film").send(film);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Film added successfully");
  });
  


  it("should delete a film", async () => {   
    const filmTitleToDelete = "Film 3";
    // Envoyez une requête DELETE à l'endpoint "/api/films" avec le titre du film à supprimer
    const deleteRes = await request(app).delete(`/api/films/${filmTitleToDelete}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe("Film deleted successfully");
    // Ensuite, vérifiez que le film a été supprimé en envoyant une requête GET à l'endpoint "/api/films"
    const getRes = await request(app).get("/api/films");
    expect(getRes.status).toBe(200);
    // Assurez-vous que le film avec le titre spécifié n'est plus présent dans la liste des films retournée
    expect(getRes.body).not.toContainEqual(expect.objectContaining({ title: filmTitleToDelete }));
  });

  it("should update a film", async () => {
    const filmTitleToUpdate = "Film ajout"; 
    const updatedFilmData = {
      title: "forestgump",
      year: 14000,
      genre: "DRAMA mama",
      director: "ABDELGHAFFAR",
      actors: ["DRISS", "SOUHAIL"],
      synopsis: "THIS",
      location: "emplacement",
      thumbnail: "miniature",
    };
    const res = await request(app)
      .put(`/api/films/${filmTitleToUpdate}`)
      .send(updatedFilmData);
       expect(res.status).toBe(200);
       expect(res.body.message).toBe("Film updated successfully");

  });

});
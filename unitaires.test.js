const request = require('supertest');
const app = require('./app');



describe('Tests des endpoints de gestion de films', () => {
  it('Devrait retourner la liste de tous les films', async () => {
    const res = await request(app).get('/films');
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    
  });

  it('Devrait créer un nouveau film', async () => {
    const newFilm = {
      title: 'Film 3',
      year: 2021,
      genre: 'Drama',
      director: 'Jane Doe',
      actors: ['Actor 5', 'Actor 6'],
      synopsis: 'Synopsis 3',
      location: '/path/to/film3.mp4',
      thumbnail: '/path/to/thumbnail3.jpg',
    };

    const res = await request(app).post('/film').send(newFilm);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Film added successfully');
  });

  it('Devrait supprimer un film spécifique par titre', async () => {
    const filmTitleToDelete = 'Film 2';
    const res = await request(app).delete(`/films/${filmTitleToDelete}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Film deleted successfully');
  });

  it('Devrait retourner une erreur 404 pour un film non trouvé', async () => {
    const nonExistentFilmTitle = 'Film 4444 ';
    const res = await request(app).delete(`/films/${nonExistentFilmTitle}`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Film not found');
  });

  it('Devrait mettre à jour un film spécifique par titre', async () => {
    const filmTitleToUpdate = 'Film 2';
    const updatedFilm = {
      year: 2022,
      genre: 'Romance',
      director: 'John Smith',
      actors: ['Actor 3', 'Actor 7'],
      synopsis: 'Updated Synopsis 2',
      location: '/path/to/updatedFilm2.mp4',
      thumbnail: '/path/to/updatedThumbnail2.jpg',
    };

    const res = await request(app).put(`/films/${filmTitleToUpdate}`).send(updatedFilm);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Film updated successfully');
  });

  
});

import {json} from 'body-parser';
import express from 'express';
import {log} from './log';

// yarn ts-node-dev src/index.ts

const app = express();
app.use(json());
const port = process.env.PORT || 3000;
let films = [
  {
    id: 1,
    title: 'film1',
    rating: 95,
  },
  {
    id: 2,
    title: 'film2',
    rating: 90,
  },
  {
    id: 3,
    title: 'film3',
    rating: 84,
  },
];
app.get('/', (_req, res) => {
  res.send({messege: 'Hello'});
});

app.get('/films', (_req, res) => {
  res.send(films);
});

app.get('/films/:filmId', (req, res) => {
  log.info(req.params);
  res.send(films.find(film => film.id === Number.parseInt(req.params.filmId, 10)));
});

app.post('/films', (req, res) => {
  log.info(req.body);
  const maxId = Math.max(...films.map(film => film.id));
  films.push({
    ...req.body,
    id: maxId + 1,
  });
  res.send(films);
});

app.put('/films/:filmId', (req, res) => {
  log.info(req.body);
  films = films.map(
    film => (film.id === Number.parseInt(req.params.filmId, 10) ? {
      ...req.body,
      id: film.id,

    } : film),
  );
  res.send(films);
});

app.delete('/films/:filmId', (req, res) => {
  log.info(req.params);
  films = films.filter(film => film.id !== Number.parseInt(req.params.filmId, 10));
  res.send(films);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

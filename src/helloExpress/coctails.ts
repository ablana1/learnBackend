import {json} from 'body-parser';
import express from 'express';
import {log} from '../log';

// yarn ts-node-dev src/helloExpress/coctails.ts

// Создать Rest-api с помощью которого можно посомтреть список коктейлей,
// удалить, создать, изменить, получить по идентифитору;
// Коктейль должен состоять из идентификатора, названия, объема;
// Проверить работу api через инсомнию;

const app = express();
app.use(json());
const port = 3000;
let coctails = [
  {
    id: 1,
    name: 'Milk shake',
    volume: 300,
  },
  {
    id: 2,
    name: 'Mohito',
    volume: 200,
  },
  {
    id: 3,
    name: 'Sunrise',
    volume: 100,
  },
];
app.get('/', (_req, res) => {
  res.send({messege: 'Coctails'});
});

app.get('/coctails', (_req, res) => {
  res.send(coctails);
});

app.get('/coctails/:coctailId', (req, res) => {
  log.info(req.params);
  res.send(coctails.find(coctail => coctail.id === Number.parseInt(req.params.coctailId, 10)));
});

app.post('/coctails', (req, res) => {
  log.info(req.body);
  const maxId = Math.max(...coctails.map(coctail => coctail.id));
  coctails.push({
    ...req.body,
    id: maxId + 1,
  });
  res.send(coctails);
});

app.put('/coctails/:coctailId', (req, res) => {
  log.info(req.body);
  coctails = coctails.map(
    coctail => (coctail.id === Number.parseInt(req.params.coctailId, 10) ? {
      ...req.body,
      id: coctail.id,

    } : coctail),
  );
  res.send(coctails);
});

app.delete('/coctails/:coctailId', (req, res) => {
  log.info(req.params);
  coctails = coctails.filter(coctail => coctail.id !== Number.parseInt(req.params.coctailId, 10));
  res.send(coctails);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

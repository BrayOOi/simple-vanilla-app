import express from 'express'

const app = express();

app.use(express.static('./static/'))
  .get( '/pets', async (req, res) => {
    const pets = await import ('./static/pets.json')
    res.json(pets.default);
  })
  .get( '/', ( req, res ) => {
    res.sendFile(__dirname + 'index.html');
  })
  .listen(8000, () => {
    console.log('Server Started. Listening to 8000');
  })
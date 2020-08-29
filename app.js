import express from 'express';
import request from 'request';

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  const query = req.query.search;
  const url = `https://omdbapi.com/?apikey=thewdb&s=${query}`;
  request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.render('results', {data: data});
      } else {
        console.log("Oups! Something went wrong.");
        console.log("Error: ", error);
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Movie App Server has started!');
});

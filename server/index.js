const path = require('path');
const express = require("express");
const fetch = require("node-fetch");
const e = require('express');
const urlCrossRef = `https://api.crossref.org/works`;
const urlDoaj = `https://doaj.org/api/v2/search/articles/`;
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
// app.use(express.json({
//   type: "*/*" // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomand
// }));
app.use(express.urlencoded());
app.get("/api", (req, res) => {
  console.log('En /api');
  res.json({ message: "Hello from server!" });
});

app.post("/api/getContentsCrossref", async (req, res) => {
  //console.log('Reqs desde el front al back:');
  const data  = await fetch(urlCrossRef + `?query=${req.body.query}&sort=score&rows=1`);
  if (data.ok){
    //console.log('Request successful');
    const jsonData = await data.json();
    //console.log(jsonData.message.items[0]);
    res.send(jsonData.message.items[0]);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
  //TODO: PARSEAR ESTA RESPUESTA CUANDO NO SEA 503
  console.log('Data returned');
});

app.post("/api/getContentsDoaj", async (req, res) => {
  //console.log('Reqs desde el front al back:');
  const data  = await fetch(urlDoaj + `doi:${req.body.DOI}`);
  if (data.ok){
    console.log('Request successful DOAJ');
    const jsonData = await data.json();
    console.log(jsonData);
    res.send(jsonData);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
  //TODO: PARSEAR ESTA RESPUESTA CUANDO NO SEA 503
  console.log('Data returned');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


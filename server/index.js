const path = require('path');
const express = require("express");
const fetch = require("node-fetch");
const e = require('express');
const url = `https://api.crossref.org/works`;

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

app.post("/api/getContents", async (req, res) => {
  console.log('Reqs desde el front al back:');
  const data  = await fetch(url + `?query=${req.body.query}&sort=score&rows=1`);
  if (data.ok){
    console.log('Request successful');
    const jsonData = await data.json();
    console.log(jsonData.message.items[0]);
    res.send(jsonData.message.items[0]);;
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


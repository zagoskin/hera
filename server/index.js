const path = require('path');
const express = require("express");
const fetch = require("node-fetch");
const e = require('express');

var constants = require('./constants');

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
  // console.log('Url crossref');
  // console.log(url);
  const url = req.body.url;
  const data  = await fetch(url);
  if (data.ok){
    //console.log('Request successful');
    const jsonData = await data.json();
    //console.log(jsonData.message.items[0]);
    res.send(jsonData);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
});

app.post("/api/getContentsDoaj", async (req, res) => {
  const url = req.body.url;
  const data  = await fetch(url);
  if (data.ok){
    const jsonData = await data.json();
    res.send(jsonData);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
});

app.post("/api/getContentsMicrosoft", async (req, res) => {
  const url = req.body.url;
  const data  = await fetch(url + `&subscription-key=${constants.MICROSOFT_KEY}`);
  if (data.ok){
    const jsonData = await data.json();
    res.send(jsonData);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
});

app.post("/api/getContentsScopus", async (req, res) => {
  const url = req.body.url;
  const data  = await fetch(url, {
    method: 'GET',
    headers: {
      "X-ELS-APIKey": constants.SCOPUS_KEY,
    }
  });
  if (data.ok){
    const jsonData = await data.json();
    res.send(jsonData);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


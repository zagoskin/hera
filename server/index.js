const path = require('path');
const express = require("express");
const fetch = require("node-fetch");
const e = require('express');
// const urlCrossRef = `https://api.crossref.org/works`;
// const urlDoaj = `https://doaj.org/api/v2/search/articles/`;
// const urlMicrosoft = `https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate`;
const microsoftSusKey = 'e49b412041094951957423bde5ad243a';
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
  console.log('Data returned from crossref');
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
  console.log('Data returned from doaj');
});

app.post("/api/getContentsMicrosoft", async (req, res) => {
  const url = req.body.url;
  const data  = await fetch(url + `&subscription-key=${microsoftSusKey}`);
  if (data.ok){
    const jsonData = await data.json();
    res.send(jsonData);;
  } else {
    console.log('Request failed', res.ok);
    res.send( { error: 'Something went wrong' });
  }
  console.log('Data returned from microsoft');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


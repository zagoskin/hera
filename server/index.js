const path = require('path');
const express = require("express");
const fetch = require("node-fetch");
const e = require('express');

var constants = require('./constants');

const PORT = process.env.PORT || 3001;

const app = express();

const fetchJsonContents = async (url,options) => {
  const data  = await fetch(url,options);
  if (data.ok){
    const jsonData = await data.json();
    return jsonData;
  } else {
    console.log('Request failed');
    return { error: 'Something went wrong' };
  }
}

const fetchHtmlContents = async (url,options) => {
  return fetch(url,options)
    .then((response) => {
      return response.text();
  }).then((html) => {
    return html;
  });
  // if (data.ok){
  //   const dataHtml = data.text();
  //   return HTMLParser.parse(dataHtml);
  // } else {
  //   console.log('Request failed');
  //   return { error: 'Something went wrong' };
  // }
}

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
  const data  = await fetchJsonContents(req.body.url,{});
  res.send(data);
});

app.post("/api/getContentsDoaj", async (req, res) => {
  const data  = await fetchJsonContents(req.body.url,{});
  res.send(data);
});

app.post("/api/getContentsMicrosoft", async (req, res) => {
  const data  = await fetchJsonContents(req.body.url + `&subscription-key=${constants.MICROSOFT_KEY}`,{});
  res.send(data);
});

app.post("/api/getContentsScopus", async (req, res) => {
  const data  = await fetchJsonContents(req.body.url, {
    method: 'GET',
    headers: {
      "X-ELS-APIKey": constants.SCOPUS_KEY,
    }
  });
  res.send(data);
});

app.post("/api/getContentsDimensions", async (req, res) => {
  const data = await fetchJsonContents(req.body.url, {});
  res.send(data);
});

app.post("/api/getContentsAltmetric", async (req, res) => {
  const data = await fetchJsonContents(req.body.url, {});
  res.send(data);
});

app.post("/api/getContentsHtml", async (req, res) => {
  const html = await fetchHtmlContents(req.body.url, {});
  const response = {
    'html': html,
  }
  res.send(response);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


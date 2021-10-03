const path = require('path');
const express = require("express");
const fetch = require("node-fetch");
const e = require('express');
const https = require('https');
const { AbortController } = require('node-abort-controller');

const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

var constants = require('./constants');

const PORT = process.env.PORT || 3001;

const app = express();

const fetchWithTimeout = async (url, options, timeout) => {
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}

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
  try {
    const data = await fetchWithTimeout(url,options,10000);
    if (data.ok){
      return data.text();
    } else {
      console.log('Request failed');
      return { error: 'Something went wrong' };
    }
  } catch (error) {
    console.log('Request failed');
    return { error: 'Timed out' };
  }
  // return fetch(url,options)
  //   .then((response) => {
  //     return response.text();
  // }).then((html) => {
  //   return html;
  // });
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.urlencoded());
app.get("/api", (req, res) => {
  console.log('En /api');
  res.json({ message: "Hello from server!" });
});

app.post("/api/getContentsDefault", async (req, res) => {
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

app.post("/api/getContentsWos", async (req, res) => {
  const data  = await fetchJsonContents(req.body.url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "searchValue": req.body.options,
      "pageNum": 1,
      "pageSize": 10,
    })
  });
  res.send(data);
});

app.post("/api/getContentsHtml", async (req, res) => {
  const html = await fetchHtmlContents(req.body.url, {
        agent: httpsAgent
      });
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


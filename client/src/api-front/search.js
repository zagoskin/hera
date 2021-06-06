const getContents = async (url,apiURL) => {
  try {
    const res = await fetch(apiURL, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    let contents = await res.json();
    return contents;
  } catch (e) {
    console.error(e);
  }
}

const getHtml = async (url,apiURL) => {
  try {
    const htmlObject = await fetch(apiURL, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    let htmlResObj = await htmlObject.json();
    return htmlResObj;
  } catch (e) {
    console.error(e);
  }
}

export const getContentsCrossref = async (url) => {
  const contents = await getContents(url,`/api/getContentsCrossref`);
  console.log('Contents de la API en front Crossref:');
  console.log(contents);
  if (contents.error){
    contents.message = {...contents.message, error: contents.error}
  }
  return contents.message;
}

export const getContentsDoaj = async (url) => {
  const contents = await getContents(url,`/api/getContentsDoaj`);
  console.log('Contents de la API en front DOAJ:');
  console.log(contents);
  return contents;
}

export const getContentsMicrosoft = async (url) => {
  const contents = await getContents(url, `/api/getContentsMicrosoft`);
  console.log('Contents de la API en front Microsoft:');
  console.log(contents);
  return contents.entities;
}

export const getContentsScopus = async (url) => {
  const contents = await getContents(url, `/api/getContentsScopus`);
  console.log('Contents de la API en front Scopus:');
  console.log(contents);
  return contents["serial-metadata-response"];
}

export const getContentsDimensions = async (url) => {
  const contents = await getContents(url, `/api/getContentsDimensions`);
  console.log('Contents de la API en front Dimensions:');
  console.log(contents);
  return contents;
}

export const getContentsAltmetric = async (url) => {
  const contents = await getContents(url, `/api/getContentsAltmetric`);
  console.log('Contents de la API en front Altmetric:');
  console.log(contents);
  return contents;
}

export const getContentsScimago = async (url,title) => {
  const res = await getHtml(url,`/api/getContentsScimago`);
  const searchHtml = res.html;

  let parser = new DOMParser();

  const searchDOM = parser.parseFromString(searchHtml, 'text/html');
  const errorP = searchDOM.body.querySelector(".journaldescription.colblock").querySelector("h2");

  let contents;

  if (errorP){ //busco si hay un resultado en la busqueda
    contents = {
      error: errorP.innerText
    }
  } else {
    const searchResults = searchDOM.body.querySelector(".search_results");
  
    const firstTitle = searchResults.querySelector(".jrnlname").innerText;

    if (firstTitle.split(" ")[0] === title.split(" ")[0]){
      const anchorURL = searchResults.querySelector("a").href;
      alert(anchorURL);
      const journalURL = "https://www.scimagojr.com/"+anchorURL.split("http://localhost:3000/")[1];
    
      const searchRes = await getHtml(journalURL,`/api/getContentsScimago`);
      const journalHtml = searchRes.html;
    
      const journalDOM = parser.parseFromString(journalHtml, 'text/html');
      const hIndex = journalDOM.body.querySelector(".hindexnumber").innerText;
      const embedString = journalDOM.getElementById("embed_code").value;
      const journalData = journalDOM.body.querySelector(".journalgrid").querySelectorAll("div");
      const country = journalData[0].querySelector("p").querySelector("a").innerText;
      const coverage = journalData[6].querySelector("p").innerText;
      contents = {
        hIndex,
        country,
        coverage,
        embedString
      }
    } else {
      contents = {
        error: "Not found in list"
      }
    }
  }

  console.log('Resultados SCIMAGO a devolver:');
  console.log(contents);

  return contents;
}
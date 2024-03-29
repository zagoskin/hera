const getContents = async (url, apiURL, options) => {
  // console.log(options);
  try {
    const res = await fetch(apiURL, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url,
        'options': options,
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

const getHtml = async (url, apiURL, options) => {
  try {
    const htmlObject = await fetch(apiURL, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url,
        'options': options,
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
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsDefault`, '');
  // console.log('Contents de la API en front Crossref:');
  // console.log(contents);
  if (contents.error) {
    contents.message = { ...contents.message, error: contents.error }
  }
  return contents.message;
}

export const getContentsDoaj = async (url) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsDefault`, '');
  // console.log('Contents de la API en front DOAJ:');
  // console.log(contents);
  return contents;
}

export const getContentsMicrosoft = async (url) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsMicrosoft`, '');
  // console.log('Contents de la API en front Microsoft:');
  // console.log(contents);
  return contents;
}

export const getContentsScopus = async (url) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsScopus`, '');
  // console.log('Contents de la API en front Scopus:');
  // console.log(contents);
  return contents["serial-metadata-response"];
}

export const getContentsDimensions = async (url) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsDefault`, '');
  // console.log('Contents de la API en front Dimensions:');
  // console.log(contents);
  return contents;
}

export const getContentsAltmetric = async (url) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsDefault`, '');
  // console.log('Contents de la API en front Altmetric:');
  // console.log(contents);
  return contents;
}

export const getContentsSemantic = async (url) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsDefault`, '');
  // console.log('Contents de la API en front Semantic:');
  // console.log(contents);
  return contents;
}

export const getContentsWos = async (url, issn) => {
  const contents = await getContents(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsWos`, issn);
  // console.log('Contents de la API en front Wos:');
  // console.log(contents);
  return contents;
}

export const getContentsScimago = async (url, title) => {
  const res = await getHtml(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsHtml`, '');

  if (res.html.error){
    return { error: "Recurso no encontrado" };
  } else {
      const searchHtml = res.html;

      let parser = new DOMParser();
    
      const searchDOM = parser.parseFromString(searchHtml, 'text/html');
      const errorP = searchDOM.body.querySelector(".journaldescription.colblock").querySelector("h2");
    
      let contents;
    
      if (errorP) { //busco si hay un resultado en la busqueda
        contents = {
          error: "Recurso no encontrado"
        }
      } else {
        try {
          const searchResults = searchDOM.body.querySelector(".search_results");
      
          const firstTitle = searchResults.querySelector(".jrnlname").innerText;
      
          if ((searchResults.children.length === 1) || (firstTitle.split(" ")[0] === title.split(" ")[0])) {
            const anchorURL = searchResults.querySelector("a").href;
      
            const journalURL = "https://www.scimagojr.com/" + anchorURL.replace(/^(?:\/\/|[^/]+)*\//, '');
            //alert(journalURL);
            const searchRes = await getHtml(journalURL, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsHtml`, '');
            const journalHtml = searchRes.html;
      
            const journalDOM = parser.parseFromString(journalHtml, 'text/html');
            const hIndex = journalDOM.body.querySelector(".hindexnumber").innerText;
            const embedString = journalDOM.getElementById("embed_code").value;
            const journalData = journalDOM.body.querySelector(".journalgrid").querySelectorAll("div");
            const country = journalData[0].querySelector("p").querySelector("a").innerText;
            const coverage = journalData[6].querySelector("p").innerText;
            const publisher = journalDOM.body.querySelector(".journalgrid").querySelectorAll("div")[2].querySelector("p").innerText;
            contents = {
              hIndex,
              country,
              coverage,
              embedString,
              journalURL,
              publisher
            }
          } else {
            contents = {
              error: "Recurso no encontrado"
            }
          }
        } catch (e){
          contents = {
            error: "Falla en la extracción de datos"
          }
        }
      }
    
      // console.log('Resultados SCIMAGO a devolver:');
      // console.log(contents);
    
      return contents;
  }

}

export const getContentsRedib = async (url) => {

  const res = await getHtml(url, `${process.env.REACT_APP_SERVER_BASE_URL}/api/getContentsHtml`, '');
  // console.log("Respuesta de getHtml redib");
  // console.log(res);
  if (res.html.error) {
    return { error: "Recurso no encontrado" };
  } else {
      let parser = new DOMParser();
    
      const resDOM = parser.parseFromString(res.html, 'text/html');
      const errorP = resDOM.body.querySelector(".pull-left.help-block");
      let contents;
    
      if (errorP) {
        contents = {
          error: "Recurso no encontrado",
        }
      } else {
        // console.log("Datos");
        // console.log(resDOM.body.querySelector(".cabecera").querySelector("#languageIconMenu").querySelector("a").href);
        try {
          const journalTitle = resDOM.body.querySelector(".well-text-revista").querySelector("h1").innerText;
          const journalURL = resDOM.body.querySelector(".cabecera").querySelector("#languageIconMenu").querySelector("a").href;
          const redibURL = resDOM.body.querySelector(".dropdown").querySelector(".dropdown-menu").querySelector("a").href.split("?")[0];
      
          const listaNodoIndicadores = resDOM.body.querySelector(".indicadores").querySelectorAll(".indicador1");
          const arrayNodos = Array.from(listaNodoIndicadores);
          const indicadores = arrayNodos.map((nodo) => nodo.innerText);
      
          const listaAcredInter = resDOM.getElementsByClassName("acreditaciones")[0].querySelectorAll(".acreditacion1");
          const arrayAcredInter = Array.from(listaAcredInter);
          const acredInter = arrayAcredInter.map((nodo) => nodo.innerText);
      
          const listaAcredNac = resDOM.getElementsByClassName("acreditaciones")[1].querySelectorAll(".acreditacion1");
          const arrayAcredNac = Array.from(listaAcredNac);
          const acredNac = arrayAcredNac.map((nodo) => nodo.innerText);
      
          const widgetDiv = resDOM.body.querySelector(".copia-widget");
          let widget;
      
          if (widgetDiv) {
            const widgetString = widgetDiv.querySelector("input").value;
            const widgetBody = parser.parseFromString(widgetString, 'text/html').body;
        
            const anchorHref = widgetBody.querySelector("a").href;
            const imgSrc = widgetBody.querySelector("img").src;
            widget = {
              anchorHref,
              imgSrc,
            }
          }
          //La mayoría de los resultados no tienen esto
          //const rankingDiv = resDOM.getElementById("rankingSerial");
          contents = {
            journalTitle,
            journalURL,
            redibURL,
            indicadores,
            acredInter,
            acredNac,
            widget
          }
        } catch (e) {
          contents = {
            error: "Falla en la extracción de datos"
          }
        }
      }
      return contents;
  }

}
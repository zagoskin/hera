//la parte de "works" implica buscar por query en este caso, se podria filtar si se conoce issn pero no implementado

export const api = `http://localhost:3001/api`;
var urlCrossRef;
var urlDoaj;
var urlMicrosoft;
var urlScopus;
var urlDimensions;
var urlAltmetric;

export const setURLsByDOI = (DOI) => {
  urlCrossRef = `https://api.crossref.org/works/${DOI}`;
  urlDoaj = `https://doaj.org/api/v2/search/articles/doi:${DOI}`;
  const doiUP = DOI.toUpperCase();
  urlMicrosoft = `https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate?expr=DOI=='${doiUP}'&attributes=DOI,Ti,CC,ECC,AA.AuN,AA.AuId,AA.S,F.DFN,AW,DN`;
  urlDimensions = `https://metrics-api.dimensions.ai/doi/${DOI}`;
  urlAltmetric = `https://api.altmetric.com/v1/doi/${DOI}`;  
  //otras URLs
}

export const setURLsByISSN = (ISSN) => {
  urlCrossRef = `https://api.crossref.org/journals/${ISSN}`;
  urlDoaj = `https://doaj.org/api/v2/search/journals/issn:${ISSN}`;
  urlScopus = `https://api.elsevier.com/content/serial/title?issn=${ISSN}&field=SJR,SNIP`
  //otras URLs
}

export const getURLCrossref = () => {
  return urlCrossRef;
}

export const getURLDoaj = () => {
  return urlDoaj;
}

export const getURLMicrosoft = () => {
  return urlMicrosoft;
}

export const getURLScopus = () => {
  return urlScopus;
}

export const getURLDimensions = () => {
  return urlDimensions;
}
export const getURLAltmetric = () => {
  return urlAltmetric;
}
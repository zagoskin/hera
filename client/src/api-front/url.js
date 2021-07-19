//la parte de "works" implica buscar por query en este caso, se podria filtar si se conoce issn pero no implementado

export const api = `http://localhost:3001/api`;
let urlCrossRef;
let urlDoaj;
let urlMicrosoft;
let urlScopus;
let urlDimensions;
let urlAltmetric;
let urlScimago;
let urlSemantic;
let urlRedib;
let urlWos = `https://mjl.clarivate.com/api/jprof/public/rank-search`;

export const setURLsByDOI = (DOI) => {
  urlCrossRef = `https://api.crossref.org/works/${DOI}`;
  urlDoaj = `https://doaj.org/api/v2/search/articles/doi:${DOI}`;
  const doiUP = DOI.toUpperCase();
  urlMicrosoft = `https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate?expr=DOI=='${doiUP}'&attributes=DOI,Ti,CC,ECC,AA.AuN,AA.AuId,AA.S,F.DFN,AW,DN`;
  urlDimensions = `https://metrics-api.dimensions.ai/doi/${DOI}`;
  urlAltmetric = `https://api.altmetric.com/v1/doi/${DOI}`;
  urlSemantic = `https://api.semanticscholar.org/v1/paper/${DOI}`
  //otras URLs
}

export const setURLsByISSN = (ISSN) => {
  urlCrossRef = `https://api.crossref.org/journals/${ISSN}`;
  urlDoaj = `https://doaj.org/api/v2/search/journals/issn:${ISSN}`;
  urlScopus = `https://api.elsevier.com/content/serial/title/issn/${ISSN}`;
  urlScimago = `https://www.scimagojr.com/journalsearch.php?q=${ISSN}`;
  urlRedib = `https://redib.org/Search/Results?type=ISN&lookfor=${ISSN}`;
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

export const getURLScimago = () => {
  return urlScimago;
}

export const getURLSemantic = () => {
  return urlSemantic;
}

export const getURLRedib = () => {
  return urlRedib;
}

export const getURLWos = () => {
  return urlWos;
}
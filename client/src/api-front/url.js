//la parte de "works" implica buscar por query en este caso, se podria filtar si se conoce issn pero no implementado

export const api = `http://localhost:3001/api`;
var urlCrossRef;
var urlDoaj;
var urlMicrosoft;

export const setURLsByDOI = (DOI) => {
  urlCrossRef = `https://api.crossref.org/works/${DOI}`;
  urlDoaj = `https://doaj.org/api/v2/search/articles/doi:${DOI}`;
  const doiUP = DOI.toUpperCase();
  urlMicrosoft = `https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate?expr=DOI=='${doiUP}'&attributes=DOI,Ti,CC,ECC,AA.AuN,AA.AuId,AA.S,F.DFN,AW,DN`;
  //otras URLs
}

export const setURLsByISSN = (ISSN) => {
  urlCrossRef = `https://api.crossref.org/journals/${ISSN}`;
  urlDoaj = `https://doaj.org/api/v2/search/journals/issn:${ISSN}`;
  //Microsoft no busca por ISSN así que esto devuelve un arreglo vacío en el campo entities
  urlMicrosoft = `https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate?expr=DOI=='${ISSN}'&attributes=DOI,Ti,CC,ECC,AA.AuN,AA.AuId,AA.S,F.DFN,AW,DN`;
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

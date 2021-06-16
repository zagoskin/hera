import { getContentsCrossref, getContentsDoaj, getContentsMicrosoft, getContentsScopus, getContentsDimensions, getContentsAltmetric, getContentsScimago } from './search'
import { getURLCrossref, getURLDoaj, getURLMicrosoft, getURLScopus, getURLDimensions, getURLAltmetric, setURLsByDOI, setURLsByISSN, getURLScimago } from './url';

export const getDataByQuery = async (query,criteria) => { 
  
  let microsoftData = [];
  let scopusData;
  let dimensionsData;
  let altmetricData;
  let scimagoData;
  if (criteria === "DOI"){
    setURLsByDOI(query);
    microsoftData = await getContentsMicrosoft(getURLMicrosoft());
    dimensionsData = await getContentsDimensions(getURLDimensions());
    altmetricData = await getContentsAltmetric(getURLAltmetric());
  }else {
    if (criteria === "ISSN"){
      setURLsByISSN(query);
      scopusData = await getContentsScopus(getURLScopus());
    }
  }
  const crossrefData = await getContentsCrossref(getURLCrossref()); 
  const doajData = await getContentsDoaj(getURLDoaj());

  let res = {
    crossref: crossrefData,
    doaj: doajData.total === 0 ? 0 : doajData.results[0],
    microsoft: microsoftData.length > 0 ? microsoftData[0] : null,
    scopus: scopusData ?? null,
    dimensions: dimensionsData,
    altmetric: altmetricData,
    abstract: 
      crossrefData.abstract ? 
        !(Array.isArray(crossrefData.abstract)) ? 
          crossrefData.abstract 
        : (doajData.total > 0) ? 
          doajData.results[0].bibjson.abstract 
        : microsoftData.length > 0 ? 
          microsoftData[0].AW 
        : '' 
      : '',
    title: crossrefData.title ? crossrefData.title : doajData.total > 0 ? doajData.results[0].bibjson.title : microsoftData.length > 0 ? microsoftData[0].DN : '',
    URL: criteria === 'DOI' ? `https://dx.doi.org/${query}` : doajData.total > 0 ? doajData.results[0].bibjson.ref.journal : `https://portal.issn.org/resource/ISSN/${query}`,
    authors: crossrefData.author ? crossrefData.author : doajData.total > 0 ? doajData.results[0].bibjson.author : microsoftData.length > 0 ? microsoftData[0].AA : undefined,
    identifier: {
      type: criteria,
      value: query
    },
  }

  if (criteria === "ISSN"){
    scimagoData = await getContentsScimago(getURLScimago(),res.title);
  }

  res = {...res, scimago: scimagoData}

  return res;
}
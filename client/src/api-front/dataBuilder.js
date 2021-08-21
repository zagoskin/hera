import { getContentsCrossref, getContentsDoaj, getContentsMicrosoft, getContentsScopus, getContentsDimensions, getContentsAltmetric, getContentsScimago, getContentsSemantic, getContentsRedib, getContentsWos } from './search'
import { getURLCrossref, getURLDoaj, getURLMicrosoft, getURLScopus, getURLDimensions, getURLAltmetric, setURLsByDOI, setURLsByISSN, getURLScimago, getURLSemantic, getURLRedib, getURLWos } from './url';

export const getDataByQuery = async (query, criteria) => {

  let microsoftData = [];
  let scopusData;
  let dimensionsData;
  let altmetricData;
  let scimagoData;
  let semanticData;
  let redibData;
  let wosData;
  
  if (criteria === "DOI") {
    setURLsByDOI(query);
    microsoftData = await getContentsMicrosoft(getURLMicrosoft());
    dimensionsData = await getContentsDimensions(getURLDimensions());
    altmetricData = await getContentsAltmetric(getURLAltmetric());
    semanticData = await getContentsSemantic(getURLSemantic());
  } else {
    if (criteria === "ISSN") {
      setURLsByISSN(query);
      scopusData = await getContentsScopus(getURLScopus());
      redibData = await getContentsRedib(getURLRedib());
      wosData = await getContentsWos(getURLWos(),query);
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
    semantic: semanticData,
    redib: redibData,
    wos: wosData,
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
    issn: crossrefData.ISSN ? crossrefData.ISSN[0] : doajData.total > 0 ? doajData.results[0].bibjson.journal ? doajData.results[0].bibjson.journal.issns[0] : null : null,
    identifier: {
      type: criteria,
      value: query
    },
    type: criteria === "ISSN" ? "journal" :
          crossrefData.type ? crossrefData.type.split('-').join(' ') 
          :  microsoftData.length > 0 ? 
              microsoftData[0].BT === 'a' ? `journal article`
            : microsoftData[0].BT === 'b' ? `book`
            : microsoftData[0].BT === 'c' ? `book chapter`
            : microsoftData[0].BT === 'p' ? `bonference paper`
            : '' : ''
  }

  if (criteria === "ISSN") {
    scimagoData = await getContentsScimago(getURLScimago(), res.title);
  }

  res = { ...res, scimago: scimagoData }

  return res;
}
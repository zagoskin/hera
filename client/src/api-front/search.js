import { api } from './url';

export const getContentCrossref = async (query) => {
  try {
    const res = await fetch(`/api/getContents`, {
      method: 'POST',
      body: new URLSearchParams({
        'query': query
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front:')
    const contents = await res.json();
    console.log(contents);
    // const doi = contents.message.items[0].DOI;
    // console.log(doi);
    // const redalycData = await fetch(`http://148.215.1.70/redalyc/oai?verb=GetRecord&identifier=oai:redalyc.org:10201906&metadataPrefix=oai_dc`, {
    //   credentials: 'include'
    // });
    // console.log('redalycData');
    // console.log(redalycData);

     return [contents];
  } catch(e) {
    console.error(e);
  }
}
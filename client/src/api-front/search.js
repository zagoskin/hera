import { url } from "./url";

export const getContentList = async (query) => {
  try {
    const res = await fetch(url + `?query=${query}&sort=score&rows=1`);
    const contents =  await res.json();

    const doi = contents.message.items[0].DOI;
    console.log(doi);
    const redalycData = await fetch(`http://148.215.1.70/redalyc/oai?verb=GetRecord&identifier=oai:redalyc.org:10201906&metadataPrefix=oai_dc`, {
      credentials: 'include'
    });
    console.log('redalycData');
    console.log(redalycData);

    return contents.message.items;
  } catch(e) {
    console.error(e);
  }
}
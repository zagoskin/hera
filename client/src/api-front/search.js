import { api } from './url';

export const getContentsCrossref = async (query) => {
  try {
    const res = await fetch(`/api/getContentsCrossref`, {
      method: 'POST',
      body: new URLSearchParams({
        'query': query
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front Crossref:')
    const contents = await res.json();
    console.log(contents);

    return [contents];
  } catch(e) {
    console.error(e);
  }
}

export const getContentsDoaj = async (DOI) => {
  try {
    const res = await fetch(`/api/getContentsDoaj`, {
      method: 'POST',
      body: new URLSearchParams({
        'DOI': DOI
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front DOAJ:')
    const contents = await res.json();
    console.log(contents);

    return [contents];
  } catch(e) {
    console.error(e);
  }
}
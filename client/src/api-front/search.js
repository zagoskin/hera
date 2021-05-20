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
    var contents = await res.json();
    return contents;
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
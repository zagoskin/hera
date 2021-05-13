export const getContentsCrossref = async (url) => {
  try {
    const res = await fetch(`/api/getContentsCrossref`, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front Crossref:')
    var contents = await res.json();
    console.log(contents);
    if (contents.error){
      contents.message = {...contents.message, error: contents.error}
    }
    return contents.message;
  } catch(e) {
    console.error(e);
  }
}

export const getContentsDoaj = async (url) => {
  try {
    const res = await fetch(`/api/getContentsDoaj`, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front DOAJ:')
    const contents = await res.json();
    console.log(contents);

    return contents;
  } catch(e) {
    console.error(e);
  }
}

export const getContentsMicrosoft = async (url) => {
  try {
    const res = await fetch(`/api/getContentsMicrosoft`, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front Microsoft:')
    const contents = await res.json();
    console.log(contents);

    return contents.entities;
  } catch(e) {
    console.error(e);
  }
}

export const getContentsScopus = async (url) => {
  try {
    const res = await fetch(`/api/getContentsScopus`, {
      method: 'POST',
      body: new URLSearchParams({
        'url': url
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log('Contents de la API en front Scopus:')
    const contents = await res.json();
    console.log(contents);

    return contents["serial-metadata-response"];
  } catch(e) {
    console.error(e);
  }
}
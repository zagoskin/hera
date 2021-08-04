//Actualmente este regexp intenta capturar el prefijo posible de 10.NNNN.NN sugerido por https://www.doi.org/doi_handbook/2_Numbering.html#2.2.2
export const validDOI = new RegExp(/^10.\d{4,9}(\.\d+)?\/[-._;()/:A-Z0-9]+$/, 'i');


//crossref regexp DOI^10.\d{4,9}/[-._;()/:A-Z0-9]+$/
//old DOI ^10.[0-9]{4}/

export const validISSN = new RegExp('^[0-9]{4}-[0-9]{3}[0-9xX]$');

//^10\.+[0-9]{4}+\/.i
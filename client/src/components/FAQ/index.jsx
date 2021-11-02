import React from 'react';
import './faq.css';


// import instagramLogo from '../../images/insta.png';

export default function FAQ(){

  return (
    <div>
      <h1 className="faqQuestion">¿Qué es HERA?</h1>
      <p className="faqP">
        HERA es una herramienta que apunta a simplificar, agilizar 
        y apoyar el proceso de determinar la calidad y el impacto de un recurso académico. 
        Para ello integra  información proveniente de diferentes bases de datos académicas en forma rápida y concisa.
      </p>

      <h1 className="faqQuestion">¿Qué es un recurso académico?</h1>
      <p className="faqP">
        Utilizamos este término para referirnos genéricamente a dos clases de contenidos: 
        Artículos de conferencias/revistas, capítulos de libros, o cualquier contenido que posea un DOI.
        Revistas que posean un ISSN.
      </p>

      <h1 className="faqQuestion">¿Qué es un DOI?</h1>
      <p className="faqP">
        Document Object Identifier (DOI) es una cadena alfanumérica única para 
        identificar contenido y proveer un vínculo persistente a su localización en Internet. 
        Es habitual que las publicaciones científicas cuenten con esta clase de identificadores.
      </p>

      <h1 className="faqQuestion">¿Qué es un ISSN?</h1>
      <p className="faqP">
        El International Standard Serial Number (ISSN) es un código de 8 dígitos 
        que sirve para identificar publicaciones periódicas y recursos continuos de toda clase 
        y que sean editadas en cualquier soporte (en papel o digital).
      </p>

      <h1 className="faqQuestion">¿Qué información integra HERA?</h1>
      <p className="faqP">
        Dado un DOI o un ISSN, HERA obtiene información sobre la calidad 
        y el impacto del recurso académico en cuestión. 
        Para ello, consulta las bases de datos de <a href="https://www.crossref.org/">CrossRef</a>, <a href="https://doaj.org/">DOAJ</a>, <a href="https://academic.microsoft.com/">Microsoft Academic</a>, <a href="https://www.semanticscholar.org/">SemanticScholar</a>, 
        <a href="https://redib.org/">REDIB</a>, <a href="https://mjl.clarivate.com/">Web of Science</a>, <a href="https://www.scopus.com/home.uri">Scopus</a>, <a href="https://www.scimagojr.com/">SJR</a>, <a href="https://www.dimensions.ai/">Dimensions</a> y <a href="https://www.altmetric.com/">Altmetric</a>.
      </p>

      <h1 className="faqQuestion">¿Qué tan actualizada está la información que provee HERA?</h1>
      <p className="faqP">
        HERA no tiene una base de datos propia sino que funciona en tiempo real ante cada búsqueda, 
        consultando diferentes servicios provistos por cada una de las bases de datos mencionadas. 
        La información exhibida es la que provee cada base de datos en el momento de la búsqueda.
      </p>
    </div>
  )
}
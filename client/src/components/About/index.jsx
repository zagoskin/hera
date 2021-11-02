import React from 'react';
import './about.css';


// import instagramLogo from '../../images/insta.png';

export default function About(){

  return (
    <div>
      <p className="aboutP">
      En la actualidad, los miembros de la comunidad académica y científica 
      se enfrentan a una tarea ardua y engorrosa cuando deben determinar la calidad 
      y el impacto de una publicación científica. 
      Esta situación se debe a dos factores. 
      En primer lugar, al crecimiento exponencial en la disponibilidad de recursos 
      que tuvo el área debido al desarrollo tecnológico. 
      En segundo lugar, la ausencia de estándares y la consecuente existencia de múltiples métricas y 
      sistemas de evaluación que, aunque comparten objetivos, no siempre lo llevan a cabo de la misma manera.
      </p>
      <p className="aboutP">
      <em>HERA (Herramienta para Enriquecimiento de Recursos Académicos)</em> es una propuesta que busca dar respuesta al problema anterior 
      y surge como una iniciativa conjunta entre diferentes unidades de la UNLP: la 
      <a href="https://www.econo.unlp.edu.ar/investigacion_transferencia"> Secretaría de Investigación y Transferencia</a> de la Facultad de Ciencias Económicas, el 
      <a href="http://weblidi.info.unlp.edu.ar/wp/"> III-LIDI</a> de la Facultad de Informática y el 
      <a href="http://sedici.unlp.edu.ar/"> SEDICI</a>.
      </p>
      <p className="aboutP">
      <em>HERA</em> es una herramienta que apunta a simplificar, 
      agilizar y apoyar el proceso de determinar la calidad y el impacto de un recurso académico. 
      Para ello integra  información proveniente de diferentes bases de datos académicas en forma rápida y concisa.

      </p>

    </div>
  )
}
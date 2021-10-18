import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import history from './history';
import './index.css';
import Search from './components/Search/index';
import heraLogo from './images/heraLogo.png';
import logoLidi from './images/logoLidi.png';
import logoFCEUNLP from './images/logoFCEUNLP.png';
import logoSedici from './images/logoSedici.png';
import About from './components/About';
import FAQ from './components/FAQ';

class Main extends React.Component {
  render() {
    return (
      <Router history={history}>
        <nav>
          <div className="navBar">
            <Link to="/about" className="navLink">HERA</Link>
            <Link to="/" className="navLink">Buscador</Link>
            <Link to="/faq" className="navLink">Preguntas frecuentes</Link>
            
          </div>
        </nav>
        <div className="container">
          <Link to="/"><div className="titleContainer">
            <div className="titleImgContainer"><img className="titleImg" src={heraLogo} alt="hera logo" /></div>
            <div className="titleText">Herramienta para Enriquecimiento de Recursos Académicos</div>
            </div></Link>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/">
              <Search />
            </Route>

            <Route>
              <Redirect push to="/" />  
            </Route>           
          </Switch>
        </div>
        <footer>
          <div className="footBar">
            <div className="footerImgContainer"><a href="http://sedici.unlp.edu.ar/"><img className="footerImg" src={logoSedici} alt="sedici logo" /></a></div>
            <div className="footerImgContainer"><a href="http://weblidi.info.unlp.edu.ar/wp/"><img className="footerImg" src={logoLidi} alt="lidi logo" /></a></div>
            <div className="footerImgContainer"><a href="https://www.econo.unlp.edu.ar/"><img className="footerImg wider" src={logoFCEUNLP} alt="FCE logo" /></a></div>
          </div>
        </footer>
      </Router>

    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

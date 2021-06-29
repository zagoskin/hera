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

class Main extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <nav></nav>
          <Link to="/"><h1 className="title">Filtro Académico</h1></Link>

          <Switch>
            <Route path="/about">
              <div>
                Un about
              </div>
            </Route>
            <Route path="/">
              <Search />
            </Route>

            <Route>
              <Redirect push to="/" />  
            </Route>           
          </Switch>
        </div>
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

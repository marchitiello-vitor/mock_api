import React from 'react';  
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect ,Switch } from 'react-router-dom';
// import { parseJWT, usuarioAutenticacao } from './services/auth';

import './index.css';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Consultas from './pages/consultas/Consultas';
import NotFound from './pages/notFound/NotFound';

import reportWebVitals from './reportWebVitals';

// const PermissaoAdm = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticacao() && parseJWT().role === '1' ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="home" />
//       )
//     }
//   />
// );

// const PermissaoMedico = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticacao() && parseJWT().role === '2' ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="home" />
//       )
//     }
//   />
// );

// const PermissaoComumMedico = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       (usuarioAutenticacao() && parseJWT().role === '2') ||  (usuarioAutenticacao() && parseJWT().role === '3') ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="home" />
//       )
//     }
//   />
// );

// const PermissaoComum = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       (usuarioAutenticacao() && parseJWT().role === '3') ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="home" />
//       )
//     }
//   />
// );

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Home */}
        <Route path="/login" component={Login} /> {/* Login */}
        <Route path="/consultas" component={Consultas} /> {/* Consultas */}
        <Route path="/notFound" component={NotFound} /> {/* Not Found */}
        <Redirect to="/notFound" /> {/* Redireciona para Not Found caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();

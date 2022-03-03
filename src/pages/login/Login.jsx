import { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../assets/css/login.css';

import Logo from '../../assets/img/Logo-Branco.png';
import Medicos from '../../assets/img/Imagem-Login.svg';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false
    }
  };

  efetuaLogin = (event) => {
    event.preventDefault();

    this.setState({ erroMensagem: "", isLoading: true })

    axios.post('http://localhost:5000/api/login', {
      email: this.state.email,
      senha: this.state.senha
    })

      .then(resposta => {
        if (resposta.status === 200) {
          localStorage.setItem('usuario-login', resposta.data.token);
          this.setState({ isLoading: false });
            this.props.history.push('/');
        }
      })
      .catch(() => {
        this.setState({ erroMensagem: "Email e/ou senha inválidos!", isLoading: false });
      })
  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
  }

  render() {
    return (
      <div>
        <header className="header-login">
          <Link to="/"><img className="logo" src={Logo} alt="Logo"></img></Link>
        </header>
        <main className="container_login">
          <img src={Medicos} alt="médicos"></img>
          <div className="form_h1">
            <h1>Bem Vindo!</h1>
            <form className="formulario_login" onSubmit={this.efetuaLogin}>
              <div className="campos">
                <div className="campo">
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.atualizaStateCampo}/>
                </div>

                <div className="campo">
                  <label for="">Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={this.state.senha}
                    onChange={this.atualizaStateCampo}/>
                </div>
              </div>

              <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>
              {
                this.state.isLoading === true &&
                <button type="submit" disabled>Loading...</button>
              }
              {
                this.state.isLoading === false &&
                <button disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''} type="submit">Login</button>
              }

            </form>
          </div>
        </main>
      </div>
    );
  }
}

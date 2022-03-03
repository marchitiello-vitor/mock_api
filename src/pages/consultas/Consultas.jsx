import { Component } from "react";
import axios from 'axios';
import { parseJWT } from "../../services/auth";

import '../../assets/css/consultas.css';
import '../../assets/css/cadastrar-consulta.css';
import '../../assets/css/alterar-descricao.css';
import '../../assets/css/grid.css';

import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'

export default class Consultas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listaConsultas: [],
            listaPacientes: [],
            listaMedicos: [],
            idConsulta: '',
            idMedico: 0,
            idPaciente: 0,
            idSituacao: 0,
            data: '',
            hora: '',
            idConsultaAlterada: 0,
            descricao: ''
        }
    };

    buscarConsultas = () => {
        axios('https://6204f8c7161670001741b14a.mockapi.io/usuarios/1/pacientes/1/consultas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaConsultas: resposta.data });
                    console.log(this.state.listaConsultas);
                }
            })
            .catch((erro) => console.log(erro));
    }

    buscarMinhasConsultas = () => {
        axios('http://localhost:5000/api/consultas/minhas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaConsultas: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    }

    buscarPacientes = () => {
        axios('http://localhost:5000/api/pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaPacientes: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    }

    buscarMedicos = () => {
        axios('http://localhost:5000/api/medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaMedicos: resposta.data });
                }
            })
            .catch((erro) => console.log(erro));
    }

    cadastrarConsulta = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true })

        let consulta = {
            idMedico: this.state.idMedico,
            idPaciente: this.state.idPaciente,
            idSituacao: parseInt(this.state.idSituacao),
            dataeHora: new Date(this.state.data + ' ' + this.state.hora)
        };

        axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })

            .then((resposta) => {
                if (resposta.status === 201) {
                    this.buscarConsultas()
                    this.setState({ isLoading: false })
                }
            })
            .catch((resposta) => console.log(resposta),
                this.setState({ isLoading: false })
            )
            .then(() => {
                this.limparCampos()
            }
            )
    }


    atualizaDescricao = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true })

        axios.patch(`http://localhost:5000/api/consultas/descricao/${this.state.idConsultaAlterada}`, {
            Descricao: this.state.descricao,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    this.setState({ isLoading: false, descricao: '' });
                    this.buscarMinhasConsultas();
                }
            })
            .catch(() => {
                this.setState({isLoading: false })
            });
    }

    selecionarConsulta = (Consulta) => {
        this.setState({ idConsultaAlterada: Consulta.idConsulta });
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }

    limparCampos = () => {
        this.setState({
            idConsulta: '',
            idMedico: 0,
            idPaciente: 0,
            idSituacao: 0,
            data: '',
            hora: ''
        })
    };

    componentDidMount() {
        if (parseJWT().role === '1') {
            this.buscarConsultas()
            this.buscarPacientes()
            this.buscarMedicos()
        } else {
            this.buscarMinhasConsultas()
        }
    }

    render() {
        return (
            <div>
                <Header></Header>
                <main className='main-consultas'>
                    {parseJWT().role === '1' ?
                        <form className="form-cadastro-consulta" onSubmit={this.cadastrarConsulta}>
                            <div className="cadastro-consulta">
                                <h1>Consulta</h1>
                                <div className="todos-campos">
                                    <div className="campos">
                                        <div className='campo-consulta'>
                                            <label>Medico</label>
                                            <select
                                                name="idMedico"
                                                className='select-cadastro'
                                                value={this.state.idMedico}
                                                onChange={this.atualizaStateCampo}
                                            >
                                                <option value="0" disabled>
                                                    Selecione o Medico
                                                </option>
                                                {this.state.listaMedicos.map((medico) => {
                                                    return (
                                                        <option key={medico.idMedico} value={medico.idMedico}>
                                                            {medico.idUsuarioNavigation.nomeUsuario}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className='campo-consulta'>
                                            <label>Paciente</label>
                                            <select
                                                name="idPaciente"
                                                className='select-cadastro'
                                                value={this.state.idPaciente}
                                                onChange={this.atualizaStateCampo}
                                            >
                                                <option value="0" disabled>
                                                    Selecione o Paciente
                                                </option>
                                                {this.state.listaPacientes.map((paciente) => {
                                                    return (
                                                        <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                                            {paciente.idUsuarioNavigation.nomeUsuario}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div className="campo-consulta">
                                            <label>Situação</label>
                                            <select
                                                className="select-cadastro"
                                                id="situacao"
                                                name="idSituacao"
                                                value={this.state.idSituacao}
                                                onChange={this.atualizaStateCampo}>
                                                <option value="0" disabled className="neutro"> Escolha a Situação</option>
                                                <option value="1"> Realizada</option>
                                                <option value="2"> Cancelada</option>
                                                <option value="3"> Agendada</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="campos">
                                        <div className="campo-tempo">
                                            <label>Data</label>
                                            <input
                                                name="data"
                                                className="data"
                                                type="date"
                                                value={this.state.data}
                                                onChange={this.atualizaStateCampo} />
                                        </div>
                                        <div className="campo-tempo">
                                            <label className="hora">Hora</label>
                                            <input
                                                name="hora"
                                                type="time"
                                                value={this.state.hora}
                                                onChange={this.atualizaStateCampo} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.isLoading === true && (
                                <button type="submit">Loading...</button>
                            )}

                            {this.state.isLoading === false && (
                                <button type="submit">Cadastrar</button>
                            )}
                        </form>
                        :
                        <div></div>}

                    {parseJWT().role === '2' ? 
                    <form className="form-descricao" onSubmit={this.atualizaDescricao}>
                    <div className="cadastro">
                        <h1>Alterando a Consulta {this.state.idConsultaAlterada}</h1>
                            <div className="campo-descricao">
                                <label>Descrição</label>
                                <textarea
                                    name="descricao"
                                    cols="30"
                                    maxLength="100"
                                    value={this.state.descricao}
                                    onChange={this.atualizaStateCampo}></textarea>
                        </div>
                    </div>
          {
            this.state.isLoading === true &&
            <button type="submit" disabled>Loading...</button>
          }
          {
            this.state.isLoading === false &&
            <button disabled={this.state.descricao === '' ? 'none' : ''} type="submit">Alterar</button>
          }
                </form> : <div></div>}
                    <div className="container container_consultas">
                        {this.state.listaConsultas.map((Consulta) => {
                            return (
                                <div key={Consulta.idConsulta}>
                                    <div className={Consulta.idSituacaoNavigation.idSituacao === 1 ? "consulta consulta-verde" : (Consulta.idSituacaoNavigation.idSituacao === 2 ? "consulta consulta-vermelha" : "consulta consulta-amarela")}>
                                        <h1>Consulta {Consulta.idConsulta}</h1>
                                        <div className="conteudo">
                                            <div className="div_info">
                                                <div className="info">
                                                    <h2>Médico</h2>
                                                    <span>{Consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</span>
                                                </div>
                                                <div className="info">
                                                    <h2>Paciente</h2>
                                                    <span>{Consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</span>
                                                </div>
                                            </div>
                                            <div className="div_info">
                                                <div className="info">
                                                    <h2>Data</h2>
                                                    <span>{new Date(Consulta.dataeHora).toLocaleDateString('pt-br')}</span>
                                                </div>
                                                <div className="info">
                                                    <h2>Hora</h2>
                                                    <span>{new Date(Consulta.dataeHora).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                            {parseJWT().role === '2' ?
                                                <div className="div_info">
                                                    <div className="info">
                                                        <h2>Situação</h2>
                                                        <div className="situacao">
                                                            <span>{Consulta.idSituacaoNavigation.descricao}</span>
                                                        </div>
                                                    </div>
                                                    <div className="info">
                                                        <button onClick={() => this.selecionarConsulta(Consulta)}>Alterar Descrição</button>
                                                    </div>
                                                </div>
                                                :
                                                <div className="div_info">
                                                    <div className="info">
                                                        <h2>Situação</h2>
                                                        <div className="situacao">
                                                            <span>{Consulta.idSituacaoNavigation.descricao}</span>
                                                        </div>
                                                    </div>
                                                </div>}
                                        </div>
                                        <div className="info descricao">
                                            <h2>Descrição</h2>
                                            <p>{Consulta.descricao}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
                <Footer></Footer>
            </div>
        )
    }
}

import { Component } from "react";
import axios from 'axios';

import '../../assets/css/home.css';
import '../../assets/css/grid.css';

import Medico from '../../assets/img/Imagem-banner-home.svg';
import QuemSomos from '../../assets/img/imagem-quem_somos.svg';
import Clinica from '../../assets/img/clinica.png';

import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaClinicas: []
        }
    };

    buscarClinicas = () => {
        axios('http://localhost:5000/api/clinicas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaClinicas: resposta.data });
                    console.log(this.state.listaClinicas);
                }
            })
            .catch((erro) => console.log(erro));
    }

    componentDidMount() {
        this.buscarClinicas();
    }

    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <div className="banner_home">
                        <div className="info_banner_home">
                            <span>Venha fazer parte!</span>
                            <a href="/cadastro">Cadastre-se</a>
                        </div>
                        <img src={Medico} alt="Desenho médico"></img>
                    </div>
                    <div className="container_quem_somos">
                        <div className="container quem_somos">
                            <h2>Quem somos ?</h2>
                            <div className="texto_quem_somos">
                                <img src={QuemSomos} alt="Interrogação"></img>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                    the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                    type
                                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                                    the
                                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in</p>
                            </div>
                        </div>
                    </div>
                    <div className="container_onde_estamos">
                        <div className="container onde_estamos">
                            <h2>Onde estamos?</h2>
                            {this.state.listaClinicas.map((Clinic) => {
                                return(
                            <div className="clinica">
                                <img src={Clinica} alt="clinica"></img>
                                <div className="clinica_info">
                                    <div className="info_clinica">
                                        <h3>Nome</h3>
                                        <span>{Clinic.nomeFantasia}</span>
                                    </div>
                                    <div className="info_clinica">
                                        <h3>Endereço</h3>
                                        <span>{Clinic.endereco}</span>
                                    </div>
                                </div>
                                <div className="info_clinica horario">
                                    <h3>Horário de funcionamento</h3>
                                    <span>Das {Clinic.horarioAbertura} às {Clinic.horarioFechamento}</span>
                                </div>
                            </div>
                            );
                            })
                            }
                        </div>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

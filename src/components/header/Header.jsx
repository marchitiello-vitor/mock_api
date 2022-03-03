import React from 'react';
import { Link } from 'react-router-dom';
import { usuarioAutenticacao, parseJWT } from '../../services/auth'

import Logo from '../../assets/img/Logo-Branco.png';
import Home from '../../assets/img/home-icon.png';
import SobreNos from '../../assets/img/sobrenos-icon.png';
import Consultas from '../../assets/img/consultas-icon.png';
import Perfil from '../../assets/img/perfil-icon.png';

import '../../assets/css/header.css';
import '../../assets/css/grid.css';

export default function Header() {

    return (
        <header className="header">
            <div className="container container_header">
                <Link to="/"> <img className="logo_header" src={Logo} alt="Logo Branco"></img></Link>
                <nav className="nav_header">
                    <Link to="/"><img className="icone_nav" src={Home} alt="Icone home"></img></Link>
                    <Link to="/sobre-nos"><img className="icone_nav" src={SobreNos} alt="Icone Sobre nós"></img></Link>
                    <Link
                        to={usuarioAutenticacao() === true ? '/consultas' : '/login'}>
                        <img className="icone_nav" src={Consultas} alt="Icone Consultas"></img>
                    </Link>

                    <Link to={usuarioAutenticacao() === true ? (parseJWT().role === '1' ? '/perfil' : '/usuarios') : '/login'}><img className="icone_nav" src={Perfil} alt="Icone Perfil"></img></Link>
                </nav>
            </div>
        </header>
    )
}
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/img/Logo-Branco.png';

import '../../assets/css/footer.css';
import '../../assets/css/grid.css';

export default function Footer() {

    return (
        <footer>
            <div className="container container_footer">
            <Link to="/"><img className="logo_footer" src={Logo} alt="Logo Branco"></img></Link>
                <div className="footer_info">
                    <span>E-mail</span>
                    <span>spmedical.group@gmail.com</span>
                </div>
                <div className="footer_info">
                    <span>Telefone</span>
                    <span>2569-3372</span>
                </div>
            </div>
        </footer>
)}
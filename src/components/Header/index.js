import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

//Imagens
import logo from './img/logo.svg';

// Components
import Menu from "../../components/Home/Menu";

function Header({ type }) {
    const navigate = useNavigate();
    const location = useLocation(); // Obter a URL atual
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpenMobile, setMenuOpenMobile] = useState(false);

    const toggleMenuMobile = () => {
        setMenuOpenMobile(!menuOpenMobile);
    };

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <header className={type}>
                <Container>
                    <Row>
                        <Col>
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <Link className="navbar-brand" to="/"><img className="logo" src={logo} /></Link>
                                <div className="btnsMobile">
                                    <a onClick={() => navigate(`/busca`)} className=""><Icon icon="eva:search-outline" /></a>
                                    <a onClick={toggleMenuMobile} className=""><Icon icon="heroicons-outline:menu-alt-2" /></a>
                                </div>
                                <div className={`collapse navbar-collapse justify-content-center ${menuOpenMobile ? 'show' : ''}`} id="navbarMenu">
                                    {menuOpenMobile && (
                                        <a className="closeMenu" onClick={toggleMenuMobile}><Icon icon="iconamoon:close-duotone" /></a>
                                    )}
                                    <ul className="navbar-nav mr-auto">
                                        <li className={location.pathname === "/" ? "active" : ""}>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className={location.pathname === "/busca" ? "active" : ""}>
                                            <Link to="/busca">Veículos</Link>
                                        </li>
                                        <li className={location.pathname === "/sobre" ? "active" : ""}>
                                            <Link to="/sobre">Sobre Nós</Link>
                                        </li>
                                        <li className={location.pathname === "/importacao" ? "active" : ""}>
                                            <Link to="/importacao">Importação</Link>
                                        </li>
                                        <li className={location.pathname === "/contato" ? "active" : ""}>
                                            <Link to="/faleconosco">Fale Conosco</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="btnFalecConosco">
                                    <Link to="/busca" className='btnBusca'><Icon className="icons" icon="mingcute:search-line" /></Link>
                                </div>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </header>
        </>
    );
}

export default Header;

import React, {useState, useEffect} from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Header.scss';
import { useNavigate  } from 'react-router-dom';

//Imagens
import logo from './img/logo.svg'
import imgZero from "../Header/img/imgZero.png"
import imgBlindados from "../Header/img/imgBlindagem.png";
import imgSeminovos from "../Header/img/imgSeminovos.png";

// Components
import Menu from "../../components/Home/Menu";

function Header({type}) {
    const navigate = useNavigate();
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
                            <nav className="navbar navbar-expand-lg navbar-light ">
                                <Link className="navbar-brand" to="/"><img className="logo" src={logo} /></Link>
                                <div className="btnsMobile">
                                    <a onClick={() => navigate(`/busca`)}  className=""><Icon icon="eva:search-outline" /></a>
                                    <a onClick={toggleMenuMobile} className=""><Icon icon="heroicons-outline:menu-alt-2" /></a>
                                </div>
                                <div className={`collapse navbar-collapse justify-content-center ${menuOpenMobile ? 'show' : ''}`} id="navbarMenu">
                                    {menuOpenMobile && (
                                        <a  className="closeMenu" onClick={toggleMenuMobile}><Icon icon="iconamoon:close-duotone" /></a>
                                    )}
                                    <ul className="navbar-nav mr-auto">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/busca">Veículos</Link></li>
                                        <li><Link to="/sobre">Sobre Nós</Link></li>
                                        <li><Link to="servicos">Servços</Link></li>
                                        
                                    </ul>
                                </div>
                                <div className="btnFalecConosco">
                                    <Link to="/faleconosco" className={`btn btn-${type == "light" ? 'quaternary' : 'primary'}`}>Fale Conosco</Link>
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

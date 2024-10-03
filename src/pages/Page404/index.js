import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Home/Footer";
import Menu from "../../components/Home/Menu";

// imagens
import img404 from "../../pages/Page404/img/404.png";

// Styles
import './Page404.scss';
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigationIdz } from '../../context/useNavigation';


function Page404() {

    const { navigation, idzOrigin, idzEvent, loading } = useNavigationIdz()
    useEffect(() => {
        if (!loading) {
            idzOrigin(window.location.href)
            idzEvent("paginas_acessadas", "404 Not Found")
        } 
    }, [loading])

    return (
        <>
            <Menu />
            <Header />
            <section className='Page404'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <img src={img404} />
                            <h3>opa</h3>
                            <h4>erro 404</h4>
                            <p>Parece que algo deu errado. Mas não se preocupe, veja abaixo algumas opções que você pode gostar.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>

    );
}

export default Page404;

import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';

import './BannerOrcamento.scss';

function BannerOrcamento({ imagem }) {
    return (
        <section className='BannerOrcamento'>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} sm={12} md={12} lg={5} className='boxBannerOrcamento'>
                        <div className='textBannerOrcamento'>
                            <h3>Orçamento</h3>
                            <h2>Estética Veicular</h2>
                            <p>Aqui está o seu orçamento <strong>Personalizado</strong></p>
                            <a className='btn btn-down'><i><Icon className="icons" icon="iconoir:arrow-down" /></i></a>
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={5}
                        className='imgBannerOrcamento'
                        style={{
                            backgroundImage: `url(https://api.idzcar.com.br/${imagem})`
                        }}
                    ></Col>
                </Row>
            </Container>
        </section>
    );
}

export default BannerOrcamento;
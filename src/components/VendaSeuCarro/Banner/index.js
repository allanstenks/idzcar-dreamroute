import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";

// Style
import './BannerVendaSeuCarro.scss';
import 'react-tooltip/dist/react-tooltip.css'

function BannerVendaSeuCarro() {

    return (
        <>
            <section className='BannerVendaSeuCarro'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={8} className='boxBannerVendaSeuCarro'>
                            <div className='textBannerVendaSeuCarro'>
                                <h3>VENDA</h3>
                                <h2>O SEU VEÍCULO</h2>
                                <p>Tem interesse em vender o seu carro? Preencha os dados abaixo</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
}

export default BannerVendaSeuCarro;

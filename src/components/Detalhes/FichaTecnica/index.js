import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Col, Row, Container } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import InputMask from 'react-input-mask';
import Slider from 'react-slick';
import api from '../../../services/apiIdz';
// Styles
import './FichaTecnica.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';



const FichaTecnica = ({ detalhes }) => {


    const [interno, setInterno] = useState()
    const [externo, setExterno] = useState()
    const [decodedInterno, setDecodedInterno] = useState(false)
    const [decodedExterno, setDecodedExterno] = useState(false)


    const superDecoderHTML = (html) =>{
        return html.replaceAll(`&amp;amp;amp;amp;amp;lt;`, "<").replaceAll(`&amp;amp;amp;amp;amp;gt;`, ">").replace(/\\/g, '').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;lt;/g, "<").replace(/&amp;gt;/g, ">").replace(/&amp;quot;/g, '"');
    }

    const decodeHTML = (html) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        if (detalhes) {
            if (detalhes["detalhes_externo"] && !decodedExterno) {
                let ext = superDecoderHTML(decodeHTML(detalhes["detalhes_externo"]));
                setExterno(ext )
                setDecodedExterno(true)
            }
            if (detalhes["detalhes_interno"] && !decodedInterno) {
                let int = superDecoderHTML(decodeHTML(detalhes["detalhes_interno"]));
                setInterno(int)
                setDecodedInterno(true)
            }
        }
    }, [detalhes["detalhes_externo"], detalhes["detalhes_interno"]])

    // Verificar se detalhes está definido
    if (!detalhes) {
        return <div>Detalhes não disponíveis.</div>;
    }



    // Converter os detalhes externos e internos
    // const htmlExterno = detalhes.detalhes_externo ? { __html: decodeHTML(detalhes.detalhes_externo) } : null;
    // const htmlInterno = detalhes.detalhes_interno ? { __html: decodeHTML(detalhes.detalhes_interno) } : null;

    return (
        <>
            {/* {htmlExterno.__html.trim() !== '' && htmlInterno.__html.trim() !== '' ? */}
            <section className='fichatecnicaVeiculo'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h3>Ficha <strong>técnica</strong></h3>
                        </Col>
                        {/* {htmlExterno.__html.trim() !== '' ?
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <h4>Detalhes Internos</h4>
                                <div dangerouslySetInnerHTML={{ __html: decodeHTML(detalhes.detalhes_interno) }}> </div>
                            </Col> : null}
                        {htmlInterno.__html.trim() !== '' ?
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <h4>Detalhes Externos</h4>
                                <div dangerouslySetInnerHTML={htmlExterno}></div>
                            </Col> : null} */}

                        <Col xs={12} sm={12} md={12} lg={6}>
                            <h4>Detalhes Internos</h4>
                            <div dangerouslySetInnerHTML={{ __html: interno }}></div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <h4>Detalhes Externos</h4>
                            <div dangerouslySetInnerHTML={{ __html: externo }}></div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* : null} */}
        </>
    );
};

export default FichaTecnica;
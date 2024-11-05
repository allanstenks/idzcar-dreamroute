import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import api from '../../../services/apiIdz';

// Styles
import './FormVenda.scss';
import 'react-tooltip/dist/react-tooltip.css'

// Componentes
import IdzFileUpload from '../idzFileUpload';
import ReaisInput from '../../../components/VendaSeuCarro/ReaisInput';
import SucessoModal from "../SucessoModal";

function FormVenda() {

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [data, setData] = useState({
        marca: '',
        modelo: '',
        ano: '',
        quilometragem: '',
        preco: '',
        diferenciais: '',
        nome: '',
        email: '',
        telefone: '',
        fotos: {
            frente: null,
            lateral: null,
            traseira: null,
            interior: null
        }
    });

    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        getMarcas();
    }, []);

    const getMarcas = async () => {
        try {
            const response = await api.get(`/api/marcas`);
            if (response.data) {
                const lista = response.data.filter(marca => marca.status === "Ativo")
                    .map(marca => ({ label: marca.titulo, value: marca.id }));
                setMarcas(lista);
            }
        } catch (error) {
            console.error("Erro ao obter marcas:", error);
        }
    };

    const getModelos = async (marca_id) => {
        try {
            const response = await api.get(`/api/modelos/marca/${marca_id}?origem=estetica&agrupado=1`);
            if (response.data) {
                const lista = response.data.filter(modelo => modelo.status === "Ativo")
                    .map(modelo => ({ label: modelo.titulo, value: modelo.id }));
                setModelos(lista);
            }
        } catch (error) {
            console.error("Erro ao obter modelos:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleDropdownChange = (name, value) => {
        setData({
            ...data,
            [name]: value
        });

        if (name === 'marca') {
            getModelos(value); // Obter modelos ao selecionar uma marca
        }
    };

    const handleImagem = (image, angulo) => {
        setData({
            ...data,
            fotos: {
                ...data.fotos,
                [angulo]: image
            }
        });
    };

    const handlePrecoInput = (value) => {
        setData({
            ...data,
            preco: value
        });
    };

    const postOrcamento = async () => {
        try {
            const response = await api.post('/api/vendaseucarro', data);
            if (response) {
                console.log("response");
                setShowSuccessModal(true);
            }
            
        } catch (error) {
            console.error('Erro orcamento data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postOrcamento();
    };

    return (
        <section className='formVenda'>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <h2>conte sobre o seu veículo</h2>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className='formVendaForm'>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <div>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <h3>Descreva abaixo as características do veículo</h3>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <Form.Label className='Label'>
                                                    <div className="">
                                                        <Dropdown 
                                                            optionLabel="label"
                                                            placeholder="marca do carro"
                                                            className='Dropdown'
                                                            value={data.marca}
                                                            options={marcas}
                                                            onChange={(e) => handleDropdownChange('marca', e.value)}
                                                        />
                                                    </div>
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <Form.Label className='Label'>
                                                    <div className="">
                                                        <Dropdown 
                                                            optionLabel="label"
                                                            placeholder="modelo do carro"
                                                            value={data.modelo}
                                                            options={modelos}
                                                            className='Dropdown'
                                                            onChange={(e) => handleDropdownChange('modelo', e.value)}
                                                        />
                                                    </div>
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <Form.Label className='Label'>
                                                    <Form.Control 
                                                        className='Inputs' 
                                                        name="ano" 
                                                        value={data.ano} 
                                                        placeholder='ano do modelo' 
                                                        onChange={handleChange} 
                                                    />
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <Form.Label className='Label'>
                                                    <Form.Control 
                                                        className='Inputs' 
                                                        name="quilometragem" 
                                                        value={data.quilometragem} 
                                                        placeholder='quilometragem' 
                                                        onChange={handleChange} 
                                                    />
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Form.Label className='Label'><strong>por quanto você gostaria de vender?</strong></Form.Label>
                                                <Form.Label className='Label'>
                                                    <ReaisInput
                                                        value={data.preco}
                                                        handleChange={handlePrecoInput}
                                                        placeholder="Informe o valor"
                                                    />
                                                </Form.Label>
                                            </Col>

                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>fale sobre os diferenciais do seu carro</Form.Label>
                                                    <textarea 
                                                        name="diferenciais" 
                                                        value={data.diferenciais} 
                                                        onChange={handleChange}
                                                    ></textarea>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <h3>Dados de contato</h3>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Form.Label className='Label'>
                                                    <Form.Control 
                                                        className='Inputs' 
                                                        name="nome" 
                                                        value={data.nome} 
                                                        placeholder='Nome' 
                                                        onChange={handleChange} 
                                                    />
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <Form.Label className='Label'>
                                                    <Form.Control 
                                                        className='Inputs' 
                                                        name="email" 
                                                        value={data.email} 
                                                        placeholder='Email' 
                                                        onChange={handleChange} 
                                                    />
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={6}>
                                                <Form.Label className='Label'>
                                                    <Form.Control 
                                                        className='Inputs' 
                                                        name="telefone" 
                                                        value={data.telefone} 
                                                        placeholder='Telefone' 
                                                        onChange={handleChange} 
                                                    />
                                                </Form.Label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12} className='mt-5'>
                                                <h3>Envie-nos as fotos do seu veículo</h3>
                                                <p>Procure um local iluminado e tire fotos de todos os ângulos do veículo</p>
                                            </Col>
                                            <Col xs={6} sm={12} md={12} lg={3} className='mMobile mt-5'>
                                                <IdzFileUpload 
                                                    angulo="frente" 
                                                    currentFile={data.fotos.frente} 
                                                    handleUpload={(file) => handleImagem(file, 'frente')}
                                                />
                                            </Col>
                                            <Col xs={6} sm={12} md={12} lg={3} className='mMobile mt-5'>
                                                <IdzFileUpload 
                                                    angulo="lateral" 
                                                    currentFile={data.fotos.lateral} 
                                                    handleUpload={(file) => handleImagem(file, 'lateral')}
                                                />
                                            </Col>
                                            <Col xs={6} sm={12} md={12} lg={3} className='mMobile mt-5'>
                                                <IdzFileUpload 
                                                    angulo="traseira" 
                                                    currentFile={data.fotos.traseira} 
                                                    handleUpload={(file) => handleImagem(file, 'traseira')}
                                                />
                                            </Col>
                                            <Col xs={6} sm={12} md={12} lg={3} className='mMobile mt-5'>
                                                <IdzFileUpload 
                                                    angulo="interior" 
                                                    currentFile={data.fotos.interior} 
                                                    handleUpload={(file) => handleImagem(file, 'interior')}
                                                />
                                            </Col>
                                            
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <div className='validacao'></div>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Form.Group className="text-center">
                                                    <Button variant="secondary" className="Btns ButtonLight" type="button" onClick={handleSubmit}>
                                                        Enviar veículo
                                                    </Button>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <SucessoModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)} />
        </section>
        
    );
}

export default FormVenda;

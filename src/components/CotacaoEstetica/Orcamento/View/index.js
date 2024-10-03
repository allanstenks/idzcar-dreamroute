
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../../../services/apiIdz';


// Style
import './View.scss';
import 'react-tooltip/dist/react-tooltip.css'

import LoadingRing from '../../../../components/Loading';
import ValidacaoEstetica from '../../../../components/CotacaoEstetica/ValidacaoEstetica'


function View({pedidoId, onImagemChange}) {

    const [pedido, setPedido] = useState({ marca: '', modelo: '', produtos: [], vl_final: 'R$ 0,00' });

    // Validação
    const [showModal, setShowModalValidacao] = useState(false)
    const [email, setEmail] = useState()
    const [alertModal, setAlertModal] = useState(true)
    const [codigo, setCodigo] = useState('')
    const [ativoDoisFatores, setAtivoDoisFatores] = useState();
    const [data, setData] = useState({}); 
    const [whatsappEstetica, setWhatsappEstetica] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get('/api/dados-gerais/1');
            setData(response.data); 
            const numeroWhatsApp = response.data.whatsapp[3].whatsapp;
            const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
            setWhatsappEstetica(numeroFormatado);
            setAtivoDoisFatores(response.data.estetica.dois_fatores);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const getPedido = async () => {
        try {
            const response = await api.get(`/api/orcamento-estetica?codigo=${pedidoId}`);
            if (response.data) {
                if(ativoDoisFatores === 1){
                    setShowModalValidacao(true);
                    if (response.data.email) {
                        setEmail(response.data.email);
                    } else {
                        console.error('Nenhum email retornado pela API.');
                    }
                }else{
                   const data = response.data;
                   setPedido(data.orcamento);
                   
                   onImagemChange(data.orcamento.imagem);
                }
            } else {
                console.error('Nenhum dado retornado pela API.');
            }
        } catch (error) {
            console.error('Erro ao obter banners:', error);
        }
    };

    const getValidacao = async (codigo) => {
        try {
            const response = await api.get(`/api/orcamento-estetica?codigo=${pedidoId}${ativoDoisFatores ? `&two_factor=${codigo}` : ''}`);
            
            console.log("responsee", response.data);
            if (response.data.orcamento) {
                const data = response.data;
                if (data.orcamento) {
                    setAlertModal(true)
                    setPedido(data.orcamento);
                    onImagemChange(data.orcamento.imagem);
                } else {
                    console.error('Dados do pedido ou da melhor escolha não estão disponíveis.');
                    setShowModalValidacao(true)
                    setAlertModal(false)
                }
            } else {
                console.error('Nenhum dado retornado pela API.');
            }
        } catch (error) {
            console.error('Erro ao obter Orçamento:', error);
        }
    };

    const formatarNumeroWhatsApp = (numero) => {
        const numeroSemEspacos = numero.replace(/\s/g, '').replace(/-/g, '').replace("(", '').replace(")", '');
        const numeroFormatado = '55' + numeroSemEspacos;
        return numeroFormatado;
    };

    useEffect(() => {
        fetchData(); 
        verificarSessao();    
    }, []); 

    const enviarCodigo = async (codigo) => {
        iniciarSessao(codigo)
        getValidacao(codigo);
        setCodigo(codigo);
        setShowModalValidacao(false);
    };

    const onResend = async (status) => {
       if(status === true){
            getPedido();
       }
    };

    // Função para iniciar a sessão
    const iniciarSessao = (codigo) => {
        const inicioSessao = new Date().getTime(); // Obtém o horário atual em milissegundos
        const sessaoExpiraEm = inicioSessao + (24 * 60 * 60 * 1000); // Adiciona 24 horas ao horário de início
        const dadosSessao = {
            codigo: codigo,
            expiraEm: sessaoExpiraEm
        };
        localStorage.setItem('sessao', JSON.stringify(dadosSessao)); // Salva os dados da sessão no localStorage
    };

    // Função para verificar se a sessão está ativa
    const verificarSessao = () => {
        const dadosSessao = localStorage.getItem('sessao'); // Obtém os dados da sessão do localStorage
        
        // Verifica se há dados de sessão armazenados
        if (dadosSessao) {
            const { codigo, expiraEm } = JSON.parse(dadosSessao);
            const tempoAtual = new Date().getTime(); // Obtém o horário atual em milissegundos
            
            // Verifica se a sessão ainda está ativa (se o tempo atual é menor que o tempo de expiração)
            if (tempoAtual < expiraEm) {
                getValidacao(codigo); // Chamando Orçamento com o Two
            } else {
                localStorage.removeItem('sessao'); // Remove os dados da sessão do localStorage
            }
        } else {
            getPedido(); // Chamando Orçamento sem o Two
        }
    };     

    return (
        <>
            <section className='View'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={10}>
                        <Row className='justify-content-md-center'>
                        {pedido && pedido.marcas ? (
                            <>
                                <Col xs={12} sm={12} md={12}>
                                    <div className='boxView'>
                                        <div className='header'>
                                            <h5>{pedido.marca}</h5>
                                            <h4>{pedido.modelo}</h4>
                                            <h3>orçamento | Estética</h3>
                                        </div>
                                    </div>
                                </Col>
                                
                                {Object.values(pedido.marcas).map((marca, index) => (
                                    <Col key={index} xs={12} sm={12} md={Object.values(pedido.marcas).length === 1 ? 12 : 6}>
                                        <div className='boxResumo'>
                                            {marca.marca && marca.marca !== "Indefinido" && <h5>{marca.marca}</h5>}
                                            {/* Se houver apenas uma marca, exibir a descrição */}
                                            {Object.values(pedido.marcas).length === 1 && marca.produtos[0]?.descricao && (
                                                <p>{marca.produtos[0].descricao}</p>
                                            )}
                                            <ul>
                                                {marca.produtos && marca.produtos.map((produto, prodIndex) => (
                                                    <li key={prodIndex}>
                                                        <ul>
                                                            <li>{produto.produto}</li>
                                                            <li><span>{produto.preco}</span></li>
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='boxValor'>
                                                {marca.vl_final ? (
                                                    <h2><span>Valor Final</span>{marca.vl_final}</h2>
                                                ) : (
                                                    <p>Em breve, um <strong>consultor</strong> entrará em contato com você.</p>
                                                )}
                                                <a target='_blank' href={`https://api.whatsapp.com/send?phone=${whatsappEstetica}`} className='btn btn-secondary'>
                                                    FALAR COM CONSULTOR
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </>
                        ) : (
                            <LoadingRing />
                        )}
                    </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <ValidacaoEstetica
                showModal={showModal}
                enviarCodigo={enviarCodigo}
                email={email}
                alertModal={alertModal}
                onResend={onResend}
            />
        </>

    );
}

export default View;


import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../../../services/apiIdz';


// Style
import './View.scss';
import 'react-tooltip/dist/react-tooltip.css'

import LoadingRing from '../../../../components/Loading';
import ValidacaoBlindagem from '../../../../components/CotacaoBlindagem/ValidacaoBlindagem'


function View({pedidoId, onImagemChange}) {

    const [pedido, setPedido] = useState({ marca: '', modelo: '', produtos: [], vl_final: 'R$ 0,00' });
    const [melhor, setMelhor] = useState({ marca: '', modelo: '', produtos: [], vl_final: 'R$ 0,00' });

    // Validação
    const [showModal, setShowModalValidacao] = useState(false)
    const [email, setEmail] = useState()
    const [alertModal, setAlertModal] = useState(true)
    const [codigo, setCodigo] = useState('')
    const [ativoDoisFatores, setAtivoDoisFatores] = useState();
    const [data, setData] = useState({}); 
    const [whatsappBlindagem, setWhatsappBlindagem] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get('/api/dados-gerais/1');
            setData(response.data); 
            const numeroWhatsApp = response.data.whatsapp[0].whatsapp;
            const numeroFormatado = formatarNumeroWhatsApp(numeroWhatsApp);
            setWhatsappBlindagem(numeroFormatado);
            setAtivoDoisFatores(response.data.orcamento.dois_fatores);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const getPedido = async () => {
        try {
            const response = await api.get(`/api/orcamento-blindagem?codigo=${pedidoId}`);

            if (response.data) {
                if(ativoDoisFatores === 1){
                    setShowModalValidacao(true);
                    if (response.data.email) {
                        setEmail(response.data.email);
                    } else {
                        console.error('Nenhum email retornado pela API.');
                    }
                }else{
                    const data = response.data[0];
                    setPedido(data.orcamento);
                    onImagemChange(data.orcamento.imagem);
                    if(data.melhorescolha){
                        setMelhor(data.melhorescolha);
                    }
                    else {
                        console.error('Erro na geração da melhor escolha.');
                    }
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
            const response = await api.get(`/api/orcamento-blindagem?codigo=${pedidoId}${ativoDoisFatores ? `&two_factor=${codigo}` : ''}`);
            if (response.data.length > 0) {
                const data = response.data[0];
                if (data.orcamento) {
                    setAlertModal(true)
                    setPedido(data.orcamento);
                    onImagemChange(data.orcamento.imagem);
                    if(data.melhorescolha){
                        setMelhor(data.melhorescolha);
                    }
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
                                {melhor.produtos.length > 0 ? ( <>
                                <Col xs={12} sm={12} md={12} lg={melhor.produtos.length > 0 ? '12' : '8'}>
                                    <div className='boxView'>
                                        <div className='header'>
                                            <h5>{pedido.marca}</h5>
                                            <h4>{pedido.modelo}</h4>
                                            <h3>orçamento | Blindagem</h3>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={melhor.produtos.length > 0 ? '6' : '4'}>
                                    {pedido.produtos.length > 0 ? ( <>
                                    <div className='boxResumo'>
                                        <h4>a sua escolha</h4>
                                        <ul>
                                            <li>
                                                {pedido.produtos.map((produto, index) => (
                                                    <ul>
                                                        <li>{produto.produto}</li>
                                                        <li><span>{produto.preco}</span></li>
                                                    </ul>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='boxValor'>
                                        {pedido.vl_final ? <> <h2><span>Valor Final</span>{pedido.vl_final}</h2>  
                                        </> : 
                                        <p>Em breve, um <strong>consultor</strong> entrará em contato com você.</p>
                                         }
                                        <a target='_black' href={`https://api.whatsapp.com/send?phone=${whatsappBlindagem}`} className='btn btn-secondary'>FALAR COM CONSULTOR</a>
                                    </div>
                                        
                                    </> ) : (
                                        <div className='boxResumo'><LoadingRing /></div>
                                    )}
                                </Col>
                                
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        {melhor.produtos.length > 0 ? ( <>
                                        <div className='boxResumo'>
                                            <h4>sugestão 1021 motors</h4>
                                            <h3><i><Icon className="icons" icon="ic:round-star" /></i> nossa recomendação</h3>
                                            <ul>
                                                <li>
                                                    {melhor.produtos.map((produto, index) => (
                                                        <ul>
                                                            <li>{produto.produto}</li>
                                                            <li><span>{produto.preco}</span></li>
                                                        </ul>
                                                    ))}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='boxValor'>
                                            {melhor.vl_final ? <> <h2><span>Valor Final</span>{melhor.vl_final}</h2> 
                                            </> : 
                                            <p>Em breve, um <strong>consultor</strong> entrará em contato com você.</p>
                                            }
                                            <a target='_black' href={`https://api.whatsapp.com/send?phone=${whatsappBlindagem}`} className='btn btn-secondary'>FALAR COM CONSULTOR</a>
                                        </div>
                                            
                                        </> ) : ( null )}
                                    </Col>
                                </>) : <Col xs={12} sm={12} md={12} lg={6}><LoadingRing /></Col>
                                    
                                }
                            
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <ValidacaoBlindagem
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

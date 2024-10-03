import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from '@iconify/react';

// Style
import './Numeros.scss';
import 'react-tooltip/dist/react-tooltip.css';

function Numeros() {
    const [animated, setAnimated] = useState(false);
    const [counters, setCounters] = useState({
        carros: 0,
        anos: 0,
        blindagens: 0
    });

    useEffect(() => {
        const handleScroll = () => {
            const numerosSection = document.querySelector('.numeros');
            if (numerosSection) {
                const numerosSectionTop = numerosSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (numerosSectionTop < windowHeight && !animated) {
                    setAnimated(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [animated]);

    useEffect(() => {
        if (animated) {
            const interval = setInterval(() => {
                setCounters(prevState => ({
                    carros: prevState.carros < 5000 ? prevState.carros + 50 : 5000,
                    anos: prevState.anos < 20 ? prevState.anos + 1 : 20,
                    blindagens: prevState.blindagens < 500 ? prevState.blindagens + 5 : 500
                }));
            }, 50);

            return () => clearInterval(interval);
        }
    }, [animated]);

    return (
        <>
            <section className='numeros'>
                <Container>
                    <Row className='justify-content-md-center'>
                        <Col xs={12} sm={12} md={12} lg={8}>
                            <Row >
                                <Col xs={12} sm={6} md={6} lg={4}>
                                    <i><Icon icon="ion:car-sport-outline" /></i>
                                    <h4>carros vendidos</h4>
                                    <h3>+ {counters.carros}</h3>
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={4}>
                                    <i><Icon icon="solar:calendar-broken" /></i>
                                    <h4>anos de atuação</h4>
                                    <h3>+ {counters.anos}</h3>
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={4}>
                                    <i><Icon icon="octicon:shield-check-24" /></i>
                                    <h4>blindagens realizadas</h4>
                                    <h3>+ {counters.blindagens}</h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Numeros;
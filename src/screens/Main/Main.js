import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { Gallery, GhanaBorder, Carousel } from "../../components";
import logo from "../../assets/logo-banner.png"

import './_main.scss';

const logger = "Screen/Main:: ";

const Main = (props) => {


    return (
        <Container className="main">
            
            <div className="top-bar-container">
                <div className="top-bar container">
                    <Row className="w-100 justify-content-center">
                        <img 
                            alt="logo"
                            src={logo}
                            className="logo"
                        />
                        <GhanaBorder full />
                    </Row>
                    
                </div>
            </div>

            <Row className="main-content">
                <Col lg={6} className="d-flex justify-content-center" >
                    <div className="profile-pic"></div>
                </Col>
                <Col lg={6} className="d-flex justify-content-center align-items-center" >
                    <div className="bio text-uppercase">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        <br /><br />
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        <br /><br />
                        <div className="tagline text-center text-uppercase">
                            Let me help you bring your vision to life.
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="spacer-sm" />

            <Carousel />

            <div className="spacer" />

            <Gallery />


            {/* <Row className="">
                <Col className="d-flex justify-content-center">
                    <img 
                        alt="logo"
                        src={logo}
                        className="logo"
                    />
                </Col>
            </Row>
            <Row className="mb-5">
                <Col>
                    <div className="sub-header text-center">Let me help you bring your vision to life.</div>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col className="logo-border-layer-1"></Col>
                <Col className="logo-border-layer-2"></Col>
                <Col className="logo-border-layer-3"></Col>
            </Row>

            <Gallery /> */}
        </Container>
    )
}

export default Main;
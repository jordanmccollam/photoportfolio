import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Gallery, GhanaBorder, Carousel, HorizontalGallery } from "../../components";
import { ChevronsDown } from "lucide-react";
import logo from "../../assets/logo-banner.png"

import './_main.scss';

const logger = "Screen/Main:: ";

const Main = (props) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchPhotos();
    }, [])

    // This pulls the photos from dropbox api
    const fetchPhotos = async () => {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
        // console.log(logger + "Fetching from: " + API_URL)
        const res = await fetch(`${API_URL}/api/photos`);
        // console.log(logger + "res: ", res);

        if (!res.ok) {
            throw new Error(logger + "Failed to fetch photos: " + res.status);
        }

        const data = await res.json();
        // console.log(logger + "data: ", data);
        const data_randomized = data.sort(() => Math.random() - 0.5)
        setPhotos(data_randomized);
    }

    const scrollToNextSection = (e) => {
        const section = document.getElementById("gallery-section");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    const scrollToTop = (e) => {
        const section = document.getElementById("main-section");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    const scrollToSection = (sectionStr) => {
        const section = document.getElementById(sectionStr);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <Container className="main" id="main-section" fluid>
            
            {photos.length > 0 && ( 
                <HorizontalGallery 
                    photos={photos} 
                    size={8} 
                    scrollTo={() => scrollToSection('about-section')} 
                /> 
            )}

            <Row className="about-section" id="about-section">
                <Col lg={5} className="about-img-container">
                    <img 
                        src={photos[0]?.url}
                        alt={"about-img"}
                        className="about-img"
                    />
                </Col>
                <Col lg={7} >
                    <Row className="h-100 d-flex justify-content-center align-items-center">
                        <Col lg={9} >
                            <h2 className="mb-5">ABOUT</h2>

                            <div className="mb-4">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                            <div className="mb-4">
                                Please enjoy a photo dump of all my work below. <span className="contact-link" >Contact me</span> directly for inquiries and pricing.
                            </div>
                            <div className="tagline mb-5">
                                Let me help you bring your vision to life.
                            </div>
                            <div className="text-center">
                                <ChevronsDown size={'2em'} className="nav-btn" onClick={() => scrollToSection('main-section')} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>





            
            {/* <div className="top-bar-container">
                <div className="top-bar container">
                    <Row className="w-100 justify-content-center">
                        <img 
                            alt="logo"
                            src={logo}
                            className="logo"
                            onClick={scrollToTop}
                        />
                        <GhanaBorder full />
                    </Row>
                </div>
            </div>

            <Row className="main-content">
                <Col lg={5} className="d-flex justify-content-center align-items-center" >
                    <div className="profile-pic"></div>
                </Col>
                <Col lg={7} className="d-flex justify-content-center align-items-center" >
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
                <Col xs={12} className="text-center" >
                    <Button variant="light" className="" onClick={scrollToNextSection}>
                        <ChevronsDown size={'1.5em'} />
                    </Button>
                </Col>
            </Row>

            <div id="gallery-section" />
            <div className="spacer-sm" />
            <Carousel />
            <Gallery /> */}
        </Container>
    )
}

export default Main;
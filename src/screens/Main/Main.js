import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { Gallery, GhanaBorder, Carousel, HorizontalGallery } from "../../components";
import { ChevronsDown, ChevronsUp, Instagram } from "lucide-react";
import logo from "../../assets/logo-banner.png"
import contactPhoto from "../../assets/test-img.webp"
import aboutPhoto from "../../assets/test-img.webp"

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

    const scrollToSection = (sectionStr) => {
        const section = document.getElementById(sectionStr);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <Container className="main" id="main-section" fluid>
            
            <div className="top-bar">
                <Row className="w-100 justify-content-start">
                    <img 
                        alt="logo"
                        src={logo}
                        className="logo"
                        onClick={() => scrollToSection('main-section')}
                    />
                    {/* <GhanaBorder full /> */}
                </Row>
            </div>


            {photos.length > 0 && ( 
                <HorizontalGallery 
                    photos={photos} 
                    size={8} 
                    scrollTo={() => scrollToSection('about-section')} 
                /> 
            )}

            <div className="fade-in">

                <Row className="about-section" id="about-section">
                    <Col md={5} lg={5} className="about-img-container d-none d-md-block">
                        <img 
                            src={photos[0]?.url}
                            alt={"about-img"}
                            className="about-img"
                        />
                    </Col>
                    <Col md={7} lg={7} className="px-5 px-lg-2" >
                        <Row className="h-100 d-flex justify-content-center align-items-center">
                            <Col lg={9} >
                                <h2 className="mb-5">ABOUT</h2>

                                <div className="mb-4">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </div>
                                <div className="mb-4">
                                    Please enjoy a photo dump of all my work below. <span className="contact-link" onClick={() => scrollToSection('contact-section')} >Contact me</span> directly for inquiries and pricing.
                                </div>
                                <div className="tagline mb-5">
                                    Let me help you bring your vision to life.
                                </div>
                                <div className="text-center">
                                    <ChevronsDown size={'2em'} className="nav-btn" onClick={() => scrollToSection('gallery-section')} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                
                <Gallery photos={photos} id={"gallery-section"} />


                <Row className="contact-section" id="contact-section">
                    <Col lg={8} className="d-flex justify-content-center align-items-start px-5 px-lg-2">
                        <div className="contact-container d-flex">
                            <img 
                                src={contactPhoto}
                                alt="contact-img"
                                className="contact-img d-none d-md-block"
                            />
                            <div className="contact-form-container ml-4">
                                <h2 className="">CONTACT</h2>
                                <form action="https://formspree.io/f/myzdaajq" method="POST" className="contact-form" >
                                    <Form.Control placeholder="Email" type="email" name="_replyto" />
                                    <Form.Control className="mt-2" placeholder="Subject" name="subject" />
                                    <Form.Control className="mt-2" as="textarea" rows={5} placeholder="Message" name="message" />
                                    <div className="d-flex justify-content-between mt-2">
                                        <div className="d-flex">
                                            <span className="d-none d-xl-block me-1" >Or call me directly at</span>
                                            <span>707-344-0886 <span className="mx-2">|</span></span>
                                            <a  
                                                href="https://www.instagram.com/cdoez.flickz/" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            ><Instagram size={'1.5em'} className="contact-media-btn" /></a>
                                        </div>
                                        <Button type="submit" variant="dark" className="send-btn px-5" ><span className="send-txt">Send</span></Button>
                                    </div>
                                </form>
                                <div className="text-center">
                                    <ChevronsUp size={'2em'} className="nav-btn" onClick={() => scrollToSection('main-section')} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </Container>
    )
}

export default Main;
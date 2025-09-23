import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Form, Spinner } from 'react-bootstrap';
import { Gallery, GhanaBorder, Carousel, HorizontalGallery } from "../../components";
import { ChevronsDown, ChevronsUp, Instagram } from "lucide-react";
import logo from "../../assets/logo-banner.png"
import contactPhoto from "../../assets/profile_2.JPEG"
import aboutPhoto from "../../assets/profile_1.png"

import './_main.scss';

const logger = "Screen/Main:: ";

const carls_bio_text = "Hi, my name is Carl Osifo-Doe. I was born in Ohio in 2005, and my family is from Ghana. Growing up, I was the ‘tech guy’ in the family. At any family gatherings, I was always taking pictures on everyone’s phones. Without this experience right here creating a passion that would shape my future. In 2025, I started pursuing photography seriously, and it’s taken me to places I never imagined. Through this page, my goal is to build a team of photographers across California capturing people chasing dreams, exploring new places, and living life to the fullest."

const Main = () => {
    const [featuredPhotos, setFeaturedPhotos] = useState([]);
    const [recentPhotos, setRecentPhotos] = useState([]);

    useEffect(() => {
        // TESTING
        if (recentPhotos.length === 0 || featuredPhotos.length === 0) {
            handleDropboxFolders();
        } // ELSE: already loaded ;)
    }, [])

    const handleDropboxFolders = async () => {
        // These are the photos that will go in the horizontal gallery
        const _featuredPhotos = await fetchPhotos('FEATURED');
        const _filteredFeatured = _featuredPhotos.filter(p => p.url !== '' && !p.name.includes(".ARW"));
        // console.log(logger + 'Featured Photos: ', _featuredPhotos);
        // console.log(logger + '(filtered) Featured Photos: ', _filteredFeatured);
        setFeaturedPhotos(_filteredFeatured);

        // These are the photos that will go in the gallery / dump / recent work
        const _recentPhotos = await fetchPhotos('GALLERY');
        const _filteredRecents = _recentPhotos.filter(p => p.url !== '' && !p.name.includes(".ARW"));
        // console.log(logger + 'Recent Photos: ', _recentPhotos);
        // console.log(logger + '(filtered) Recent Photos: ', _filteredRecents);
        setRecentPhotos(_filteredRecents);

    }

    const fetchPhotos = async (folder) => {
        // const API_URL = process.env.REACT_APP_API_URL;
        // console.log(logger + "Fetching from: " + API_URL)
        const res = await fetch(`/api/photos/${folder}`);
        // console.log(logger + "res: ", res);

        if (!res.ok) {
            throw new Error(logger + "Failed to fetch photos: " + res.status);
        }

        const data = await res.json();
        // console.log(logger + "data: ", data);
        const data_randomized = data.sort(() => Math.random() - 0.5)
        return data_randomized;
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


            {(featuredPhotos.length > 0 && recentPhotos.length > 0) && ( 
                <HorizontalGallery 
                    photos={featuredPhotos} 
                    size={featuredPhotos.length < 8 ? featuredPhotos.length : 8} 
                    scrollTo={() => scrollToSection('about-section')} 
                /> 
            )}
            
            {featuredPhotos.length > 0 && recentPhotos.length > 0 ? (
                
                <div className="fade-in">

                    <Row className="about-section" id="about-section">
                        <Col md={5} lg={5} className="about-img-container d-none d-md-block">
                            <img 
                                src={aboutPhoto}
                                alt={"about-img"}
                                className="about-img no-pointer"
                            />
                        </Col>
                        <Col md={7} lg={7} className="px-5 px-lg-2" >
                            <Row className="h-100 d-flex justify-content-center align-items-center">
                                <Col lg={9} >
                                    <h2 className="mb-5">ABOUT</h2>

                                    <div className="mb-4">
                                        {carls_bio_text}
                                    </div>
                                    <div className="mb-4">
                                        Please enjoy more of my recent work below. <span className="contact-link" onClick={() => scrollToSection('contact-section')} >Contact me</span> directly for inquiries and pricing.
                                    </div>
                                    <div className="tagline mb-5">
                                        Turning moments into timeless visions
                                    </div>
                                    <div className="text-center">
                                        <ChevronsDown size={'2em'} className="nav-btn" onClick={() => scrollToSection('gallery-section')} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row id={"gallery-section"} className="text-center">
                        <Col>
                            <h2 className="my-5">RECENT WORK</h2>
                        </Col>
                    </Row>
                    <Gallery photos={recentPhotos} size={recentPhotos.length < 20 ? recentPhotos.length : 20} />


                    <Row className="contact-section" id="contact-section">
                        <Col lg={8} className="d-flex justify-content-center align-items-start px-5 px-lg-2">
                            <div className="contact-container d-flex">
                                <img 
                                    src={contactPhoto}
                                    alt="contact-img"
                                    className="contact-img d-none d-md-block no-pointer"
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
                                                    href="https://www.instagram.com/cdoez.flicks/" 
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
            ) : (
                <Row className="h-100">
                    <Col className="d-flex justify-content-center align-items-center">
                        <div className="text-center">
                            <Spinner animation="grow" />
                            <h5 className="mt-4">LOADING</h5>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default Main;
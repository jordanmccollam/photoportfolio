import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Row, Col, Button } from "react-bootstrap";

import './_carousel.scss';

const logger = "Components::Carousel: ";

const Carousel = (props) => {
  const [index, setIndex] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [center, setCenter] = useState(photos[index]);
    const [left, setLeft] = useState(photos[(index - 1 + photos.length) % photos.length]);
    const [right, setRight] = useState(photos[(index + 1) % photos.length]);
  
    useEffect(() => {
        fetchPhotos()
    }, [])
      
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
        setPhotos(data);

        setupCarousel(data)
    }

    const setupCarousel = (images) => {
        setCenter(images[index]);
        setLeft(images[(index - 1 + images.length) % images.length]);
        setRight(images[(index + 1) % images.length]);
    }

    const next = () => setIndex((prev) => (prev + 1) % photos.length);
    const prev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  // Auto-flip every 7 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       next();
//     }, 7000);
//     return () => clearInterval(timer);
//   }, [index]);

  return (
    <div className="carousel">
        <div className="carousel-container">
            <Row className="carousel-row">
                <Col xs="auto" className="d-none d-md-block side-image">
                    <img src={photos[(index - 1 + photos.length) % photos.length]?.url} alt="left" className="carousel-img side left" />
                </Col>


                <Col xs="auto">
                    <img src={photos[index]?.url} alt="center" className="carousel-img center" />
                </Col>


                <Col xs="auto" className="d-none d-md-block side-image">
                    <img src={photos[(index + 1) % photos.length]?.url} alt="right" className="carousel-img side right" />
                </Col>
            </Row>


            {/* Arrows */}
            <Button variant="light" onClick={prev} className="carousel-arrow left">
                <ChevronLeft size={24} />
            </Button>
            <Button variant="light" onClick={next} className="carousel-arrow right">
                <ChevronRight size={24} />
            </Button>
        </div>
    </div>
  );
}

export default Carousel;

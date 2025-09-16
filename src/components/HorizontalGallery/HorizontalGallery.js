import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Row, Col, Button } from "react-bootstrap";

import './_horizontalgallery.scss';

const logger = "Comp/HorizontalGallery:: ";

const HorizontalGallery = (props) => {
    const scrollRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const loadedCount = useRef(0);
    const totalImages = props.size ? props.size : 8; // number of images in gallery. 8 by default.


  
    useEffect(() => {
        handleHorizontalScrolling();
    }, [])

    // On initial load, scroll to center the second photo (CURRENTLY NOT WORKING!)
    // useEffect(() => { scrollToPhoto(4) }, [photos])

    // This sets up the gallery to scroll horizontally even when user scrolls up/down
    const handleHorizontalScrolling = () => {
        const el = scrollRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY; // reversed direction
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });

        // cleanup on unmount
        return () => {
            el.removeEventListener("wheel", handleWheel);
        };
    }

    // When user clicks on a photo -> scroll to center that photo
    const scrollToPhoto = (index) => {
        const targetPhoto = document.getElementById(`photo-${index}`);
        if (targetPhoto) {
            targetPhoto.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
    }

    const handleImageLoad = () => {
        loadedCount.current += 1;
        if (loadedCount.current === totalImages) {
            setLoaded(true); // all images finished loading
        }
    }

    return (
        <div className="horiz-gal-container">
            <div className={`horiz-gal ${loaded ? 'horiz-gal-loaded' : 'horiz-gal-loading'}`} ref={scrollRef}>

                {props?.photos?.slice(0, totalImages).map((photo, index) => (
                    <img
                        key={`photo-${index}`}
                        id={`photo-${index}`}
                        src={photo.url}
                        alt={photo.name}
                        className="horiz-gal-img"
                        onClick={() => scrollToPhoto(index)}
                        onLoad={handleImageLoad}
                    />
                ))}


                {/* <Row className="horiz-gal-row">
                    <Col xs="auto" className="d-none d-md-block side-image">
                        <img src={photos[(index - 1 + photos.length) % photos.length]?.url} alt="left" className="horiz-gal-img side left" />
                    </Col>


                    <Col xs="auto">
                        <img src={photos[index]?.url} alt="center" className="horiz-gal-img center" />
                    </Col>


                    <Col xs="auto" className="d-none d-md-block side-image">
                        <img src={photos[(index + 1) % photos.length]?.url} alt="right" className="horiz-gal-img side right" />
                    </Col>
                </Row>

                <Button variant="light" onClick={prev} className="horiz-gal-arrow left">
                    <ChevronLeft size={24} />
                </Button>
                <Button variant="light" onClick={next} className="horiz-gal-arrow right">
                    <ChevronRight size={24} />
                </Button> */}
            </div>
        </div>
    );
}

export default HorizontalGallery;

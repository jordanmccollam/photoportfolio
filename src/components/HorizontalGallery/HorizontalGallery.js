import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import logo from "../../assets/logo-banner.png";

import './_horizontalgallery.scss';

const logger = "Comp/HorizontalGallery:: ";

const HorizontalGallery = (props) => {
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const loadedCount = useRef(0);
    const totalImages = props.size ? props.size : 8; // number of images in gallery. 8 by default.


  
    useEffect(() => {
        // First scroll to top of the page on load...
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });

        // Then set up horizontal scrolling
        handleHorizontalScrolling();
    }, [])

    // On initial load, scroll to center the second photo (CURRENTLY NOT WORKING!)
    // useEffect(() => { scrollToPhoto(4) }, [photos])

    // This sets up the gallery to scroll horizontally even when user scrolls up/down
    const handleHorizontalScrolling = () => {
        const el = scrollRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            const rect = el.getBoundingClientRect();
            const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

            if (isFullyVisible && e.deltaY !== 0) {
                e.preventDefault();

                let scrollAmount = e.deltaY;

                // adjust for line-based mouse wheel
                if (e.deltaMode === 1) { // 1 = lines
                    scrollAmount *= 20; // tweak multiplier for sensitivity
                }

                el.scrollLeft += scrollAmount;
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
            // TRIGGER LOGO ANIMATION FADE OUT
            setFadeOut(true);
            setTimeout(() => setLoading(false), 600); // match fade-out duration
        }
    }

    return (
        <div className="horiz-gal-container">

            {/* LOGO FADE IN/OUT */}
            <div className={`horiz-gal-logo-container ${fadeOut ? 'fade-out' : ''}`} >
                <img src={logo} alt="logo" className="horiz-gal-logo" />
            </div>

            <div className={`horiz-gal ${!loading ? 'horiz-gal-loaded' : 'horiz-gal-loading'}`} ref={scrollRef}>

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
            </div>

            <ChevronsDown size={'3em'} className="horiz-gal-down-arrow" onClick={props?.scrollTo} />
        </div>
    );
}

export default HorizontalGallery;

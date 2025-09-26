import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Button, Form, Spinner } from 'react-bootstrap';

// Imported local images
import image_1 from '../../assets/local_gallery/DSC06509.jpeg';
import image_2 from '../../assets/local_gallery/DSC06828.jpeg';
import image_3 from '../../assets/local_gallery/DSC06834.jpeg';
import image_4 from '../../assets/local_gallery/DSC06865.jpeg';
import image_5 from '../../assets/local_gallery/DSCN1395.jpg';
import image_6 from '../../assets/local_gallery/DSCN1441.jpg';
import image_7 from '../../assets/local_gallery/DSCN1447.jpg';
import image_8 from '../../assets/local_gallery/DSCN1457.jpg';
import image_9 from '../../assets/local_gallery/DSCN1500.jpg';
import image_10 from '../../assets/local_gallery/DSCN2503.jpg';
import image_11 from '../../assets/local_gallery/DSCN2593.jpg';
import image_12 from '../../assets/local_gallery/DSCN2638.jpg';
import image_13 from '../../assets/local_gallery/DSCN2708.jpg';
import image_14 from '../../assets/local_gallery/DSCN2729.jpg';
import image_15 from '../../assets/local_gallery/DSCN2730.jpg';
import image_16 from '../../assets/local_gallery/DSCN1365.JPG';
import image_17 from '../../assets/local_gallery/DSCN1571.JPG';
import image_18 from '../../assets/local_gallery/DSCN1790.JPG';

import './_loading.scss';

const logger = "Comp/Loading:: ";

const preloaded_images = [
    {id: 1, src: image_1, alt: "local-1"},
    {id: 2, src: image_2, alt: "local-2"},
    {id: 3, src: image_3, alt: "local-3"},
    {id: 4, src: image_4, alt: "local-4"},
    {id: 5, src: image_5, alt: "local-5"},
    {id: 6, src: image_6, alt: "local-6"},
    {id: 7, src: image_7, alt: "local-7"},
    {id: 8, src: image_8, alt: "local-8"},
    {id: 9, src: image_9, alt: "local-9"},
    {id: 10, src: image_10, alt: "local-10"},
    {id: 11, src: image_11, alt: "local-11"},
    {id: 12, src: image_12, alt: "local-12"},
    {id: 13, src: image_13, alt: "local-13"},
    {id: 14, src: image_14, alt: "local-14"},
    {id: 15, src: image_15, alt: "local-15"},
    {id: 16, src: image_16, alt: "local-16"},
    {id: 17, src: image_17, alt: "local-17"},
    {id: 18, src: image_18, alt: "local-18"}
]

const preloaded_images_randomized = preloaded_images.sort(() => Math.random() - 0.5);

const Loading = () => {

    useEffect(() => {
        // First scroll to top of the page on load...
        // Sometimes when I'd refresh the page and I was already scrolled half way down, the loading screen would start half down too...
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [])

    return (
        <Row className="h-100">
            <div className="loading loading-gallery">
                {preloaded_images_randomized.map((photo, index) => (
                    <img
                        key={`preloaded-${index}`}
                        src={photo.src}
                        alt={photo.alt}
                        className="preloaded-gallery-item"
                        // onClick={() => onClickPhoto(photo)}
                        // onLoad={handleImageLoad}
                    />
                ))}

                <div className="loading-overlay">
                    <Spinner animation="grow" className="mb-2" />
                    <h5 className="ms-2">LOADING</h5>
                </div>
            </div>
        </Row>
    )
}


export default Loading;
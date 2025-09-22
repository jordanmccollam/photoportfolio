import React, { useState, useEffect, useRef } from "react";

import './_gallery.scss';

const logger = "Comp/Gallery:: ";

const Gallery = (props) => {
    const totalImages = props.size ? props.size : 20; // number of images in gallery. 8 by default.
    const [selected, setSelected] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const loadedCount = useRef(0);
    

    const onClickPhoto = (photo) => {
        setSelected(photo.url)
        document.body.style.overflow = "hidden"; // <- locks background scrolling
    }

    const onExitFullScreen = () => {
        setSelected(null)
        document.body.style.overflow = "auto"; // <- locks background scrolling
    }

    const handleImageLoad = () => {
        loadedCount.current += 1;
        if (loadedCount.current === totalImages) {
            setLoaded(true); // all images finished loading
        }
    }

    return (
        <div className={`gallery ${loaded ? 'gallery-loaded' : 'gallery-loading'}`} id="gallery">
            {props?.photos?.slice(0, totalImages).map((photo, index) => (
                <img
                    key={`photo-${index}`}
                    src={photo.url}
                    alt={photo.name}
                    className="gallery-item"
                    onClick={() => onClickPhoto(photo)}
                    onLoad={handleImageLoad}
                />
            ))}
            
            {selected && (
                <div className="gallery-fullscreen" onClick={onExitFullScreen}>
                    <img
                        key={`fullscreen-photo`}
                        src={selected}
                        alt={'fullscreen-photo'}
                        className="fullscreen-item"
                    />
                </div>
            )}
        </div>
    )
}


export default Gallery;
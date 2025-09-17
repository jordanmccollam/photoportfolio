import React, { useState, useEffect } from "react";

import './_gallery.scss';

const logger = "Comp/Gallery:: ";

const Gallery = (props) => {
    const totalImages = props.size ? props.size : 20; // number of images in gallery. 8 by default.
    const [selected, setSelected] = useState(null);

    const onClickPhoto = (photo) => {
        setSelected(photo.url)
        document.body.style.overflow = "hidden"; // <- locks background scrolling
    }

    const onExitFullScreen = () => {
        setSelected(null)
        document.body.style.overflow = "auto"; // <- locks background scrolling
    }

    return (
        <div className="gallery" id={props.id ? props.id : 'gallery'}>
            {props?.photos.slice(0, totalImages).map((photo, index) => (
                <img
                    key={`photo-${index}`}
                    src={photo.url}
                    alt={photo.name}
                    className="gallery-item"
                    onClick={() => onClickPhoto(photo)}
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
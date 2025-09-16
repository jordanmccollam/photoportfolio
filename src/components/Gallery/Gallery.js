import React, { useState, useEffect } from "react";

import './_gallery.scss';

const logger = "Comp/Gallery:: ";

const Gallery = (props) => {
    const totalImages = props.size ? props.size : 20; // number of images in gallery. 8 by default.

    return (
        <div className="gallery" id={props.id ? props.id : 'gallery'}>
            {props?.photos.slice(0, totalImages).map((photo, index) => (
                <img
                    key={`photo-${index}`}
                    src={photo.url}
                    alt={photo.name}
                    className="gallery-item"
                />
            ))}
        </div>
    )
}


export default Gallery;
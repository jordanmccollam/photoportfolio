import React, { useState, useEffect } from "react";

import './_gallery.scss';

const logger = "Comp/Gallery:: ";

const Gallery = (props) => {

    return (
        <div className="gallery" id={props.id ? props.id : 'gallery'}>
            {props?.photos.map((photo, index) => (
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
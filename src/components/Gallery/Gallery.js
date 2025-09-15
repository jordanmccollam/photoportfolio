import React, { useState, useEffect } from "react";

import './_gallery.scss';

const logger = "Comp/Gallery:: ";

const Gallery = () => {
    const [photos, setPhotos] = useState([]);

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
    }

    return (
        <div className="gallery">
            {photos.sort(() => Math.random() - 0.5).map((photo, index) => (
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
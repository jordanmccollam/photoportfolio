import React, { useState, useEffect } from "react";
import { Photo } from "../../components";

import './_main.scss';

const logger = "Screen/Main:: ";

const Main = (props) => {
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
        <div className="main gallery">
            {photos.map((photo, index) => (<Photo data={photo} key={`photo-${index}`} />))}
        </div>
    )
}

export default Main;
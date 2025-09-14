import React, { useState, useEffect } from "react";

import './_photo.scss';

const logger = "Comp/Photo:: ";

const Photo = ({
    data
}) => {



    return (
        // <div className="photo gallery-item">
            <img
                src={data.url}
                alt={data.name}
                className="gallery-item photo"
            />
        // </div>
    )
}

export default Photo;
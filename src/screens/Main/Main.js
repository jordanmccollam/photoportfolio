import React, { useState, useEffect } from "react";
import { Gallery } from "../../components";

import './_main.scss';

const logger = "Screen/Main:: ";

const Main = (props) => {


    return (
        <div className="main">
            <Gallery />
        </div>
    )
}

export default Main;
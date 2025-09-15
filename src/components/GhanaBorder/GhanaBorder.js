import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import './_ghanaborder.scss';

const logger = "Comp/GhanaBorder:: ";

const GhanaBorder = (props) => {


    return (
        <Row className={props?.full ? "px-0" : ""}>
            <Col className={props?.full ? "px-0" : ""}>
                <Col className="ghana-border-layer-1"></Col>
                <Col className="ghana-border-layer-2"></Col>
                <Col className="ghana-border-layer-3"></Col>
            </Col>
        </Row>
    )
}

export default GhanaBorder;
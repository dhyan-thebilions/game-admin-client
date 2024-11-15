import React from "react";
import { Col, Row } from "reactstrap";
import Barchart from "./Charts/Barchart";
import Piechat from "./Charts/Piechat";

export const Analytics = () => {
    return (
        <React.Fragment>
            <Row className="mt-3">
                <Col md={6}>
                    <Barchart />
                </Col>
                <Col md={6}>
                    <Piechat />
                </Col>
            </Row>
        </React.Fragment>
    );
};

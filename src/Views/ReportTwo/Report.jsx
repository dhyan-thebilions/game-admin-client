import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, CardBody } from "reactstrap";
import Parse from "parse";
import "bootstrap/dist/css/bootstrap.min.css";

export const ReportTwo = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            console.error("No file selected.");
            return;
        }

        // Read the file as a base64 string
        const reader = new FileReader();

        reader.onloadend = async () => {
            if (reader.result) {
                const base64data = reader.result.split(",")[1];

                // date formate
                const utcFormatted = new Date().toISOString().slice(0, 19) + "Z";
                try {
                    const response = await Parse.Cloud.run("uploadJsonToS3", {
                        fileName: utcFormatted + "_" + file.name,
                        folderName: file.name.split(".")[0],
                        fileType: file.type,
                        fileContent: base64data,
                    });
                    setFile(null);
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            } else {
                console.error("Error: FileReader result is null");
            }
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
    };

    return (
        <React.Fragment>
            <Card className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <Row>
                            <Col md={5}>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    required
                                />
                            </Col>
                            <Col md={2}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Form>
            </Card>
        </React.Fragment>
    );
};

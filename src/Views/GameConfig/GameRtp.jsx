import React, { useState } from "react";
import {
    Form,
    Input,
    FormGroup,
    Label,
    Button,
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";
import { FaPlusCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export const GameRtp = () => {
    const [gameName, setGameName] = useState("");
    const [reelOne, setReelOne] = useState({
        lowSymbols: [""],
        midSymbols: [""],
        heightSymbols: [""],
        scatter: "",
        wild: "",
    });
    const [reelTwo, setReelTwo] = useState({
        lowSymbols: [""],
        midSymbols: [""],
        heightSymbols: [""],
        scatter: "",
        wild: "",
    });

    const handleAddInput = (reelSetter, symbolsType) => {
        reelSetter((prev) => ({
            ...prev,
            [symbolsType]: [...prev[symbolsType], ""],
        }));
    };

    const handleChange = (reel, symbolsType, index, value) => {
        reel === "reelOne"
            ? setReelOne((prev) => {
                const updatedSymbols = [...prev[symbolsType]];
                updatedSymbols[index] = value;
                return { ...prev, [symbolsType]: updatedSymbols };
            })
            : setReelTwo((prev) => {
                const updatedSymbols = [...prev[symbolsType]];
                updatedSymbols[index] = value;
                return { ...prev, [symbolsType]: updatedSymbols };
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const structuredData = constructReelData(reelOne, reelTwo);
        console.log(structuredData);
        console.log("Game Name:", gameName);
    };

    const constructReelData = (reelOne, reelTwo) => {
        const createReelObject = (reel, reelNumber) => {
            const reelObject = {};
            reel.lowSymbols.forEach((value, index) => {
                reelObject[`L${index + 1}`] = parseInt(value, 10) || 0; // Parse string to int
            });
            reel.midSymbols.forEach((value, index) => {
                reelObject[`M${index + 1}`] = parseInt(value, 10) || 0; // Parse string to int
            });
            reel.heightSymbols.forEach((value, index) => {
                reelObject[`H${index + 1}`] = parseInt(value, 10) || 0; // Parse string to int
            });
            reelObject.Wild = parseInt(reel.wild, 10) || 0; // Parse string to int
            reelObject.Scatter = parseInt(reel.scatter, 10) || 0; // Parse string to int
            return reelObject;
        };

        return {
            reelOne: createReelObject(reelOne, 1),
            reelTwo: createReelObject(reelTwo, 2),
        };
    };

    return (
        <React.Fragment>
            <Card className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="gameName">Game Name</Label>
                                    <Input
                                        id="gameName"
                                        name="gameName"
                                        type="text"
                                        value={gameName}
                                        onChange={(e) => setGameName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            {/* Reel One */}
                            <Col md={2}>
                                <strong>Reel One</strong>
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small>Low Symbols</small>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => handleAddInput(setReelOne, "lowSymbols")}
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                    <Row>
                                        {reelOne.lowSymbols.map((value, index) => (
                                            <div
                                                key={`reelOneLow-${index}`}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <small>{`L ${index + 1}`}</small>
                                                <Col md={10}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "reelOne",
                                                                "lowSymbols",
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </Col>
                                            </div>
                                        ))}
                                    </Row>

                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <small>Mid Symbols</small>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => handleAddInput(setReelOne, "midSymbols")}
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                    <Row>
                                        {reelOne.midSymbols.map((value, index) => (
                                            <div
                                                key={`reelOneMid-${index}`}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <small>{`M ${index + 1}`}</small>
                                                <Col md={10}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "reelOne",
                                                                "midSymbols",
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </Col>
                                            </div>
                                        ))}
                                    </Row>

                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <small>Height Symbols</small>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() =>
                                                handleAddInput(setReelOne, "heightSymbols")
                                            }
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                    <Row>
                                        {reelOne.heightSymbols.map((value, index) => (
                                            <div
                                                key={`reelOneHeight-${index}`}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <small>{`H ${index + 1}`}</small>
                                                <Col md={10}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "reelOne",
                                                                "heightSymbols",
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </Col>
                                            </div>
                                        ))}
                                    </Row>
                                    <FormGroup>
                                        <Label for="wildOne">Wild</Label>
                                        <Input
                                            id="wildOne"
                                            name="wildOne"
                                            type="number"
                                            value={reelOne.wild}
                                            onChange={(e) =>
                                                setReelOne((prev) => ({
                                                    ...prev,
                                                    wild: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="scatterOne">Scatter</Label>
                                        <Input
                                            id="scatterOne"
                                            name="scatterOne"
                                            type="number"
                                            value={reelOne.scatter}
                                            onChange={(e) =>
                                                setReelOne((prev) => ({
                                                    ...prev,
                                                    scatter: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </FormGroup>
                                </FormGroup>
                            </Col>

                            {/* Reel Two */}
                            <Col md={2}>
                                <strong>Reel Two</strong>
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small>Low Symbols</small>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => handleAddInput(setReelTwo, "lowSymbols")}
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                    <Row>
                                        {reelTwo.lowSymbols.map((value, index) => (
                                            <div
                                                key={`reelTwoLow-${index}`}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <small>{`L ${index + 1}`}</small>
                                                <Col md={10}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "reelTwo",
                                                                "lowSymbols",
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </Col>
                                            </div>
                                        ))}
                                    </Row>

                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <small>Mid Symbols</small>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => handleAddInput(setReelTwo, "midSymbols")}
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                    <Row>
                                        {reelTwo.midSymbols.map((value, index) => (
                                            <div
                                                key={`reelTwoMid-${index}`}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <small>{`M ${index + 1}`}</small>
                                                <Col md={10}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "reelTwo",
                                                                "midSymbols",
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </Col>
                                            </div>
                                        ))}
                                    </Row>

                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <small>Height Symbols</small>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() =>
                                                handleAddInput(setReelTwo, "heightSymbols")
                                            }
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                    <Row>
                                        {reelTwo.heightSymbols.map((value, index) => (
                                            <div
                                                key={`reelTwoHeight-${index}`}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <small>{`H ${index + 1}`}</small>
                                                <Col md={10}>
                                                    <Input
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "reelTwo",
                                                                "heightSymbols",
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </Col>
                                            </div>
                                        ))}
                                    </Row>
                                    <FormGroup>
                                        <Label for="wildTwo">Wild</Label>
                                        <Input
                                            id="wildTwo"
                                            name="wildTwo"
                                            type="number"
                                            value={reelTwo.wild}
                                            onChange={(e) =>
                                                setReelTwo((prev) => ({
                                                    ...prev,
                                                    wild: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="scatterTwo">Scatter</Label>
                                        <Input
                                            id="scatterTwo"
                                            name="scatterTwo"
                                            type="number"
                                            value={reelTwo.scatter}
                                            onChange={(e) =>
                                                setReelTwo((prev) => ({
                                                    ...prev,
                                                    scatter: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </FormGroup>
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Form>
            </Card>
        </React.Fragment>
    );
};

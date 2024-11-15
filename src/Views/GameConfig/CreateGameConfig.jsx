import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Parse } from "parse";

// Initialize Parse
Parse.initialize("myAppId", "");
Parse.serverURL = "http://localhost:1337/parse";

export const CreateGameConfig = () => {
    const navigate = useNavigate();

    const [gameNameOptions, setGameNameOptions] = useState([]);
    const [gameName, setGameName] = useState("");
    const [gameRtp, setGameRtp] = useState("");

    // State to handle multiple reels, each with an array of fields
    const [reels, setReels] = useState([
        { text: "reelOne", name: "Reel One", fields: [{ symbol: "", value: "" }] },
        { text: "reelTwo", name: "Reel Two", fields: [{ symbol: "", value: "" }] },
        {
            text: "reelThree",
            name: "Reel Three",
            fields: [{ symbol: "", value: "" }],
        },
        {
            text: "reelFour",
            name: "Reel Four",
            fields: [{ symbol: "", value: "" }],
        },
        {
            text: "reelFive",
            name: "Reel Five",
            fields: [{ symbol: "", value: "" }],
        },
    ]);

    // fetch game name from 'GameCatalogue' table
    const fetchGameCatalogue = async () => {
        try {
            const GameCatalogue = Parse.Object.extend("GameCatalogue");
            const query = new Parse.Query(GameCatalogue);
            const results = await query.find();

            const gameData = results.map((ele) => ({
                id: ele.id,
                name: ele.get("name"),
            }));
            setGameNameOptions(gameData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchGameCatalogue();
    }, []);

    // Function to handle adding a new field to a specific reel
    const addField = (reelIndex) => {
        const updatedReels = reels.map((reel, index) =>
            index === reelIndex
                ? { ...reel, fields: [...reel.fields, { symbol: "", value: "" }] }
                : reel
        );
        setReels(updatedReels);
    };

    // Function to handle input change for a specific reel and field
    const handleInputChange = (reelIndex, fieldIndex, field, value) => {
        const updatedReels = reels.map((reel, rIndex) =>
            rIndex === reelIndex
                ? {
                    ...reel,
                    fields: reel.fields.map((item, fIndex) =>
                        fIndex === fieldIndex ? { ...item, [field]: value } : item
                    ),
                }
                : reel
        );
        setReels(updatedReels);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Structure the reel data into the desired format
        const reelData = reels.map((ele) => {
            const reelFields = {};
            ele.fields.forEach((field) => {
                reelFields[field.symbol] = field.value;
            });
            return { [ele.text]: reelFields };
        });

        try {
            await Parse.Cloud.run("createGameRtpData", {
                gameName: gameName,
                gameRtp: gameRtp,
                reelName: reelData,
            });
            navigate("/GameRtp");

            // Reset form fields
            setGameName("");
            setGameRtp("");
            setReels([
                {
                    text: "reelOne",
                    name: "Reel One",
                    fields: [{ symbol: "", value: "" }],
                },
                {
                    text: "reelTwo",
                    name: "Reel Two",
                    fields: [{ symbol: "", value: "" }],
                },
                {
                    text: "reelThree",
                    name: "Reel Three",
                    fields: [{ symbol: "", value: "" }],
                },
                {
                    text: "reelFour",
                    name: "Reel Four",
                    fields: [{ symbol: "", value: "" }],
                },
                {
                    text: "reelFive",
                    name: "Reel Five",
                    fields: [{ symbol: "", value: "" }],
                },
            ]);
        } catch (error) {
            console.error("Error creating game details:", error);
        }
    };

    return (
        <React.Fragment>
            <Card className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                {/* <FormGroup>
                                    <Label for="gameName">Game Name</Label>
                                    <Input
                                        id="gameName"
                                        name="gameName"
                                        type="text"
                                        autoComplete="off"
                                        value={gameName}
                                        onChange={(e) => setGameName(e.target.value)}
                                        required
                                    />
                                </FormGroup> */}
                                <FormGroup>
                                    <Label for="gameName">Game Name</Label>
                                    <Input
                                        id="gameName"
                                        name="gameName"
                                        type="select"
                                        value={gameName}
                                        onChange={(e) => setGameName(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Game</option>
                                        {gameNameOptions.map((option) => (
                                            <option key={option.id} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="gameRtp">Game RTP</Label>
                                    <Input
                                        id="gameRtp"
                                        name="gameRtp"
                                        type="number"
                                        autoComplete="off"
                                        value={gameRtp}
                                        onChange={(e) => setGameRtp(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            {/* Render each reel */}
                            {reels.map((ele, reelIndex) => (
                                <Col key={reelIndex}>
                                    <strong>{ele.name}</strong>
                                    {ele.fields.map((field, fieldIndex) => (
                                        <div
                                            key={fieldIndex}
                                            className="d-flex justify-content-between align-items-center mt-2"
                                        >
                                            <span className="border p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="mx-2">
                                                        <small>Symbol</small>
                                                        <Input
                                                            id={`gameSymbol-${reelIndex}-${fieldIndex}`}
                                                            name="gameSymbol"
                                                            type="text"
                                                            autoComplete="off"
                                                            value={field.symbol}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    reelIndex,
                                                                    fieldIndex,
                                                                    "symbol",
                                                                    e.target.value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </span>

                                                    <span className="mx-2">
                                                        <small>Value</small>
                                                        <Input
                                                            id={`gameSymbolValue-${reelIndex}-${fieldIndex}`}
                                                            name="gameSymbolValue"
                                                            // type="number"
                                                            autoComplete="off"
                                                            value={field.value}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    reelIndex,
                                                                    fieldIndex,
                                                                    "value",
                                                                    e.target.value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-end mt-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => addField(reelIndex)}
                                        >
                                            <FaPlusCircle />
                                        </Button>
                                    </div>
                                </Col>
                            ))}

                            <Col md={12}>
                                <Button type="submit" color="success">
                                    Create Game
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Form>
            </Card>
        </React.Fragment>
    );
};

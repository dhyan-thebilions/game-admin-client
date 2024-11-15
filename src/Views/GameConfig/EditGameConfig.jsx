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
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { Parse } from "parse";

// Initialize Parse
Parse.initialize("myAppId", "");
Parse.serverURL = "http://localhost:1337/parse";

export const EditGameConfig = () => {
    const navigate = useNavigate();
    // Get dynamic parameters
    const { id } = useParams();

    // State to store fetched data
    const [data, setData] = useState(null);
    const [gameNameOptions, setGameNameOptions] = useState([]);

    // State for form fields (initially empty)
    const [gameName, setGameName] = useState("");
    const [gameRtp, setGameRtp] = useState("");
    const [reels, setReels] = useState([
        { reelOne: {} },
        { reelTwo: {} },
        { reelThree: {} },
        { reelFour: {} },
        { reelFive: {} },
    ]);

    // Fetch data by ID
    const getById = async () => {
        try {
            const MyClass = Parse.Object.extend("GameRtp");
            const query = new Parse.Query(MyClass);
            const result = await query.get(id);
            setData(result.toJSON());
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

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

    // Load data on component mount and when `id` changes
    useEffect(() => {
        if (id) {
            getById();
            fetchGameCatalogue();
        }
    }, [id]);

    // Update form fields when data is loaded
    useEffect(() => {
        if (data) {
            setGameName(data.gameName || "");
            setGameRtp(data.gameRtp || "");
            setReels(
                data.reelName || [
                    { reelOne: {} },
                    { reelTwo: {} },
                    { reelThree: {} },
                    { reelFour: {} },
                    { reelFive: {} },
                ]
            );
        }
    }, [data]);

    // Handle change for symbols and values in each reel
    const handleReelChange = (reelIndex, symbolKey, newValue) => {
        setReels((prevReels) => {
            const updatedReels = [...prevReels];
            // Get the reel name
            const reelName = Object.keys(updatedReels[reelIndex])[0];
            updatedReels[reelIndex] = {
                [reelName]: {
                    ...updatedReels[reelIndex][reelName],
                    // Update the symbol's value
                    [symbolKey]: newValue,
                },
            };
            return updatedReels;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Parse.Cloud.run("updateGameRtpData", {
                objectId: id,
                gameName,
                gameRtp,
                reelName: reels.map((reel) => {
                    const reelName = Object.keys(reel)[0];
                    const symbols = reel[reelName];
                    return { [reelName]: symbols };
                }),
            });
            navigate("/GameRtp");
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

                            {reels.map((reel, reelIndex) => {
                                // Get the reel name (e.g., reelOne)
                                const reelName = Object.keys(reel)[0];
                                // Get the symbols (e.g., L1, L2, etc.)
                                const symbols = reel[reelName];

                                return (
                                    <Col key={reelIndex}>
                                        <strong className="text-capitalize">{reelName}</strong>
                                        {Object.keys(symbols).map((symbolKey) => (
                                            <div
                                                key={symbolKey}
                                                className="d-flex justify-content-between align-items-center mt-2"
                                            >
                                                <span className="border p-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="mx-2">
                                                            <small>Symbol</small>
                                                            <Input
                                                                name="gameSymbol"
                                                                type="text"
                                                                autoComplete="off"
                                                                value={symbolKey}
                                                                disabled
                                                            />
                                                        </span>

                                                        <span className="mx-2">
                                                            <small>Value</small>
                                                            <Input
                                                                // type="number"
                                                                autoComplete="off"
                                                                value={symbols[symbolKey]}
                                                                onChange={(e) =>
                                                                    handleReelChange(
                                                                        reelIndex,
                                                                        symbolKey,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </span>
                                            </div>
                                        ))}
                                    </Col>
                                );
                            })}
                            <Col md={12}>
                                <Button type="submit" color="success" className="mt-2">
                                    Update Game
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Form>
            </Card>
        </React.Fragment>
    );
};

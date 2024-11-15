import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormFeedback,
} from "reactstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export const Report = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const [editingGameId, setEditingGameId] = useState(null); // Track which game is being edited
    const [updatedGameName, setUpdatedGameName] = useState(""); // Store the updated game name
    const [updatedFile, setUpdatedFile] = useState(null); // Store the updated file

    // Modal State
    const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
    const [previewGame, setPreviewGame] = useState(null); // Store game data for preview
    const [spinCount, setSpinCount] = useState(""); // Store the user input for number of spins
    const [totalSpinData, setTotalSpinData] = useState({}); // Store the calculated total winning amount

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use FormData to collect form data
        const formData = new FormData(e.target);
        const gameName = formData.get("gameName");
        const file = formData.get("file");

        // Generate a unique ID for the submission
        const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

        // Check if a file is selected and it's a JSON file
        if (file && file.type === "application/json") {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    // Parse the JSON content
                    const jsonData = JSON.parse(event.target.result);

                    // Get the current games from localStorage
                    const storedGames =
                        JSON.parse(localStorage.getItem("gamesData")) || [];

                    // You can store the gameName, file data, and unique ID if needed
                    const dataToStore = {
                        id: uniqueId, // Add unique ID here
                        fileName: file.name,
                        gameName,
                        jsonData,
                    };

                    // Add the new game to the existing list of games
                    storedGames.push(dataToStore);

                    // Save the updated games list back to localStorage
                    localStorage.setItem("gamesData", JSON.stringify(storedGames));

                    // Update the state
                    setGames(storedGames);

                    // Reset the form fields after submission
                    e.target.reset();
                } catch (error) {
                    console.error("Error parsing JSON file:", error);
                }
            };

            // Read the file content as text
            reader.readAsText(file);
        } else {
            console.error("Please upload a valid JSON file.");
        }
    };

    useEffect(() => {
        const storedGames = JSON.parse(localStorage.getItem("gamesData")) || [];
        setGames(storedGames); // Load games from localStorage when component mounts
    }, []);

    const deleteGame = (id) => {
        const updatedGames = games.filter((game) => game.id !== id);
        setGames(updatedGames);
        localStorage.setItem("gamesData", JSON.stringify(updatedGames));
    };

    const startEditing = (game) => {
        setEditingGameId(game.id);
        setUpdatedGameName(game.gameName);
        setUpdatedFile(null); // Reset the updated file
    };

    const saveEdit = (id) => {
        const updatedGames = games.map((game) => {
            if (game.id === id) {
                const updatedGame = {
                    ...game,
                    gameName: updatedGameName,
                    fileName: updatedFile ? updatedFile.name : game.fileName, // Update file name if a new file is uploaded
                };

                // If there's an updated file, read its contents and update the jsonData
                if (updatedFile) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const newJsonData = JSON.parse(event.target.result);
                            updatedGame.jsonData = newJsonData; // Update the jsonData with new content
                            const finalUpdatedGames = games.map((g) =>
                                g.id === id ? updatedGame : g
                            );
                            setGames(finalUpdatedGames);
                            localStorage.setItem(
                                "gamesData",
                                JSON.stringify(finalUpdatedGames)
                            );
                        } catch (error) {
                            console.error("Error parsing new JSON file:", error);
                        }
                    };
                    reader.readAsText(updatedFile);
                }

                return updatedGame;
            }
            return game;
        });

        if (!updatedFile) {
            setGames(updatedGames); // Update state immediately if no new file is uploaded
            localStorage.setItem("gamesData", JSON.stringify(updatedGames));
        }

        setEditingGameId(null); // Reset editing state to show the edit button again
        setUpdatedGameName(""); // Clear the updated game name
        setUpdatedFile(null); // Clear the updated file
    };

    // Handle file change
    const handleFileChange = (e) => {
        setUpdatedFile(e.target.files[0]);
    };

    // Preview Game Function
    const previewGameData = (game) => {
        setPreviewGame(game);
        setModalOpen(true); // Open the modal
        setSpinCount(""); // Reset spin count
        setTotalSpinData({}); // Reset total spin data
    };

    // Close Modal
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    // Calculate total winning amount for the entered spin count
    const calculateTotalWinning = () => {
        // Filter the data based on user input
        const filteredData =
            previewGame && previewGame.jsonData.winDataListObj.slice(0, spinCount);

        const countWinDetails = (data) => {
            let totalWin = 0;
            let totalLoss = 0;
            let totalFreeSpin = 0;
            let endBalance = previewGame?.jsonData?.scoringDetails?.startBalance;

            data.forEach((spin) => {
                if (
                    spin.winDetails.length !== 0 ||
                    spin.scatterDetails.scaterWinAmount > 0.0
                ) {
                    totalWin++;

                    spin.winDetails.forEach((winDetail) => {
                        endBalance += winDetail.winningAmount;
                    });

                    endBalance += spin.scatterDetails.scaterWinAmount;
                } else if (
                    spin.winDetails.length === 0 &&
                    spin.scatterDetails.scaterWinAmount === 0.0
                ) {
                    totalLoss++;
                }
            });

            data.forEach((spin) => {
                if (
                    spin.freeSpins === "1" ||
                    spin.freeSpins === "2" ||
                    spin.freeSpins === "3"
                ) {
                    totalFreeSpin++
                } else {
                    endBalance -= previewGame?.jsonData?.scoringDetails?.betAmount;
                }
            });

            return {
                totalWin,
                totalLoss,
                totalFreeSpin,
                endBalance,
            };
        };

        const result = countWinDetails(filteredData);

        setTotalSpinData(result); // Update total winning amount
    };

    // const calculateTotalWinning = () => {
    //     // Safeguard checks for data
    //     if (!previewGame || !previewGame.jsonData) return;

    //     const { winDataListObj, scoringDetails } = previewGame.jsonData;
    //     const { startBalance, betAmount } = scoringDetails;

    //     // Filter the data based on user input (spinCount)
    //     const filteredData = winDataListObj.slice(0, spinCount);

    //     let totalWin = 0;
    //     let totalLoss = 0;
    //     let totalFreeSpin = 0;
    //     let endBalance = startBalance;

    //     filteredData.forEach((spin) => {
    //         const hasWin = spin.winDetails.length > 0 || spin.scatterDetails.scaterWinAmount > 0.0;

    //         // Update win/loss counts
    //         if (hasWin) {
    //             totalWin++;
    //         } else {
    //             totalLoss++;
    //         }

    //         // Add winnings from winDetails and scatterDetails
    //         spin.winDetails.forEach((winDetail) => {
    //             endBalance += winDetail.winningAmount;
    //         });
    //         endBalance += spin.scatterDetails.scaterWinAmount;

    // Count free spins and adjust balance for non-free spins
    // if (["1", "2", "3"].includes(spin.freeSpins)) {
    //     totalFreeSpin++;
    // } else {
    //     endBalance -= betAmount;
    // }
    //     });

    //     // Update state with the computed result
    //     setTotalSpinData({
    //         totalWin,
    //         totalLoss,
    //         endBalance,
    //     });
    // };


    // Pagination Logic
    const indexOfLastGame = currentPage * itemsPerPage;
    const indexOfFirstGame = indexOfLastGame - itemsPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    const totalPages = Math.ceil(games.length / itemsPerPage);

    return (
        <React.Fragment>
            <Card className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <Row>
                            <Col md={5}>
                                <Input
                                    id="gameName"
                                    name="gameName"
                                    placeholder="Game Name"
                                    type="text"
                                    required
                                />
                            </Col>
                            <Col md={5}>
                                <Input id="exampleFile" name="file" type="file" required />
                            </Col>
                            <Col md={2}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Form>
            </Card>

            <Card className="mt-3">
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Game Name</th>
                                <th>File Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentGames.map((game) => (
                                <tr key={game.id}>
                                    <td>{game.id}</td>
                                    <td>
                                        {editingGameId === game.id ? (
                                            <Input
                                                value={updatedGameName}
                                                onChange={(e) => setUpdatedGameName(e.target.value)}
                                            />
                                        ) : (
                                            game.gameName
                                        )}
                                    </td>
                                    <td>
                                        {editingGameId === game.id ? (
                                            <Input
                                                type="file"
                                                accept=".json"
                                                onChange={handleFileChange}
                                            />
                                        ) : (
                                            game.fileName
                                        )}
                                    </td>
                                    <td>
                                        {editingGameId === game.id ? (
                                            <Button
                                                color="success"
                                                onClick={() => saveEdit(game.id)}
                                                className="me-2"
                                            >
                                                Save
                                            </Button>
                                        ) : (
                                            <Button
                                                color="info"
                                                onClick={() => startEditing(game)}
                                                className="me-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                        )}
                                        <Button
                                            color="warning"
                                            onClick={() => previewGameData(game)} // Open preview modal
                                            className="me-2"
                                        >
                                            <FaEye />
                                        </Button>
                                        <Button color="danger" onClick={() => deleteGame(game.id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination Controls */}
                    <Pagination>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                                Previous
                            </PaginationLink>
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem active={index + 1 === currentPage} key={index}>
                                <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                                Next
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </CardBody>
            </Card>

            {/* Modal for Preview */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Game Preview</ModalHeader>
                <ModalBody>
                    {previewGame && (
                        <div>
                            <div className="d-flex justify-content-between">
                                <h6>Game Name:</h6>
                                <h6>File Name:</h6>
                            </div>

                            <div className="d-flex justify-content-between small mb-3">
                                <div>{previewGame.gameName}</div>
                                <div>{previewGame.fileName}</div>
                            </div>

                            {/* <pre>{JSON.stringify(previewGame.jsonData, null, 2)}</pre> */}
                        </div>
                    )}

                    <Row>
                        <Col lg={9}>
                            <Input
                                id="totalSpin"
                                name="totalSpin"
                                placeholder="Total Spin"
                                type="number"
                                value={spinCount}
                                onChange={(e) => setSpinCount(e.target.value)}
                                invalid={
                                    previewGame &&
                                    previewGame.jsonData.winDataListObj.length < spinCount
                                }
                            />
                            <FormFeedback>
                                Spins Less then{" "}
                                {previewGame && previewGame.jsonData.winDataListObj.length + 1}
                            </FormFeedback>
                        </Col>
                        <Col lg={3}>
                            <Button
                                color="success w-100"
                                onClick={calculateTotalWinning}
                                disabled={
                                    previewGame &&
                                    previewGame.jsonData.winDataListObj.length < spinCount
                                }
                            >
                                Spins
                            </Button>
                        </Col>
                    </Row>

                    {Object.keys(totalSpinData).length !== 0 && (
                        <Table bordered className="mt-3">
                            <thead>
                                <tr>
                                    <th>Total Win</th>
                                    <th>Total Loss</th>
                                    <th>Total Free Spin</th>
                                    <th>Start Balance</th>
                                    <th>End Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{totalSpinData?.totalWin}</td>
                                    <td>{totalSpinData?.totalLoss}</td>
                                    <td>{totalSpinData?.totalFreeSpin}</td>
                                    <td>{previewGame?.jsonData?.scoringDetails?.startBalance}</td>
                                    <td>{totalSpinData?.endBalance.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

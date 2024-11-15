import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Card, CardBody, CardTitle, Spinner } from "reactstrap";
import { parseConfig } from "../../parseConfig";

// Initialize Parse
Parse.initialize(parseConfig.APP_ID, parseConfig.MASTER_KEY);
Parse.serverURL = parseConfig.URL;

const Piechat = () => {
    const [gameData, setGameData] = useState([]);
    const fetchData = async () => {
        try {
            // Query to get all GameSession objects
            const query = new Parse.Query("GameSession");
            const gameSessions = await query.find();

            // Loop through each GameSession object and fetch related GameCatalogue data
            const results = await Promise.all(
                gameSessions.map(async (gameSession) => {
                    // Get the Relation for gameCatalogueId
                    const gameCatalogueRelation = gameSession.relation("gameCatalogueId");
                    const gameCatalogueQuery = gameCatalogueRelation.query();
                    const gameCatalogueResults = await gameCatalogueQuery.find();

                    // Combine GameSession and related GameCatalogue data
                    return {
                        gameSession: gameSession.toJSON(),
                        gameCatalogue: gameCatalogueResults.map((catalogue) =>
                            catalogue.toJSON()
                        ),
                    };
                })
            );

            // Count the occurrences of each game name
            const gameCount = results.reduce((acc, item) => {
                const gameName = item.gameCatalogue[0].name; // Get the game name
                acc[gameName] = (acc[gameName] || 0) + 1; // Increment the count
                return acc;
            }, {});

            // Get the names and counts separately
            const result = Object.entries(gameCount).map(([name, value]) => ({
                name,
                value
            }));

            // Return both arrays as an object
            setGameData(result);
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const option = {
        tooltip: {
            trigger: "item",
        },
        series: [
            {
                name: "Users",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                labelLine: {
                    show: false,
                },
                data: gameData || [],
            },
        ],
    };

    return (
        <React.Fragment>
            <Card className="h-100">
                {gameData.length !== 0 ? (
                    <CardBody>
                        <CardTitle tag="h5">Most Played Games</CardTitle>
                        <ReactECharts
                            option={option}
                            style={{ height: "400px", width: "100%" }}
                        />
                    </CardBody>
                ) : (
                    <CardBody>
                        <div className="d-flex justify-content-center align-items-center">
                            <Spinner />
                        </div>
                    </CardBody>
                )}
            </Card>
        </React.Fragment>
    );
};

export default Piechat;

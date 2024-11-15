import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Card, CardBody, CardTitle, Spinner } from "reactstrap";
import axios from "axios";
import { Parse } from "parse";

// Initialize Parse
Parse.initialize("myAppId", "");
Parse.serverURL = "http://localhost:1337/parse";

const Barchart = () => {
  // const [gameData, setGameData] = useState([]);
  // const gameDataFun = async () => {
  //     const apiUrl = "http://localhost:1337/api/test";
  //     try {
  //         const response = await axios.get(apiUrl);
  //         setGameData(response?.data);
  //     } catch (err) {
  //         console.error("Unexpected error:", err);
  //     }
  // };

  // useEffect(() => {
  //     gameDataFun();
  // }, []);

  // const gameNames = gameData.map((item) => {
  //     return item?._id;
  // });

  // const gameCount = gameData.map((item) => {
  //     return item?.count;
  // });

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
      const gameNames = Object.keys(gameCount);
      const gameCounts = Object.values(gameCount);

      // Return both arrays as an object
      setGameData({ gameNames, gameCounts });
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      data: gameData?.gameNames || [],
    },
    yAxis: {},
    series: [
      {
        name: "Users",
        type: "bar",
        data: gameData?.gameCounts || [],
      },
    ],
  };
  return (
    <React.Fragment>
      <Card>
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
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner />
            </div>
          </CardBody>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Barchart;

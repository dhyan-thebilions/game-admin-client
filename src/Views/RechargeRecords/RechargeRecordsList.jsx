import React, { useEffect, useState } from "react";
import {
    Datagrid,
    List,
    TextField,
    SearchInput,
    DateField,
    NumberField,
} from "react-admin";
import { Parse } from "parse";
// Initialize Parse
Parse.initialize(process.env.REACT_APP_APPID, process.env.REACT_APP_MASTER_KEY);
Parse.serverURL = process.env.REACT_APP_URL;

export const RechargeRecordsList = () => {
    const [gameData, setGameData] = useState([]);

    const fetchData = async () => {
        try {
            const TransactionRecords = Parse.Object.extend("TransactionRecords");
            const query = new Parse.Query(TransactionRecords);

            // Add a constraint to filter by type
            query.equalTo("type", "recharge");

            // Order by a field
            query.descending("createdAt");

            // Execute the query
            const results = await query.find();

            // Map the results to extract data
            const transactions = results.map((record) => ({
                gameId: record.get("gameId"),
                username: record.get("username"),
                transactionDate: record.get("transactionDate"),
                beforeTransaction: record.get("beforeTransaction"),
                afterTransaction: record.get("afterTransaction"),
                transactionAmount: record.get("transactionAmount"),
                ipaddress: record.get("ipaddress"),
                remark: record.get("remark"),
            }));
            setGameData(transactions);
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const dataFilters = [
        <SearchInput source="q" alwaysOn resettable variant="outlined" />,
    ];

    return (
        <List title="Recharge Records" filters={dataFilters} sx={{ pt: 1 }}>
            <Datagrid size="small" data={gameData}>
                <TextField source="gameId" label="GameId" />
                <TextField source="username" label="Account" />
                <DateField source="transactionDate" label="RechargeDate" showTime />
                <NumberField
                    source="beforeTransaction"
                    label="BeforeRecharge"
                    textAlign="left"
                />
                <NumberField
                    source="afterTransaction"
                    label="AfterRecharge"
                    textAlign="left"
                />
                <NumberField
                    source="transactionAmount"
                    label="Rechargeed"
                    textAlign="left"
                />
                <TextField source="ipaddress" label="IpAddress" />
                <TextField source="remark" label="Remark" />
            </Datagrid>
        </List>
    );
};

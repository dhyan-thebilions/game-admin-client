import React from "react";
import {
    Datagrid,
    List,
    TextField,
    SearchInput,
    CreateButton,
    TopToolbar,
    DateField,
    NumberField,
} from "react-admin";

export const RedeemRecordsList = () => {
    const dataFilters = [
        <SearchInput source="q" alwaysOn resettable variant="outlined" />,
    ];

    const PostListActions = () => (
        <TopToolbar>
            <CreateButton />
        </TopToolbar>
    );

    const userData = [
        {
            gameId: "bhsrre",
            account: "user",
            redeemDate: "2017-04-23",
            beforeRedeem: 120,
            afterRedeem: 110,
            redeemed: 10,
            ipaddress: "",
            cashier: "rahul",
            manager: "tejas",
            remark: "no comment",
        },
        {
            gameId: "mcjdur",
            account: "guest",
            redeemDate: "2012-02-20",
            beforeRedeem: 150,
            afterRedeem: 100,
            redeemed: 50,
            ipaddress: "",
            cashier: "shivam",
            manager: "tejas",
            remark: "delay payment",
        },
    ];
    return (
        <List
            title="Redeem Records"
            filters={dataFilters}
            sx={{ pt: 1 }}
            actions={<PostListActions />}
        >
            <Datagrid size="small" data={userData}>
                <TextField source="gameId" label="GameId" />
                <TextField source="account" label="Account" />
                <DateField source="redeemDate" label="RedeemDate" locales="fr-FR" />
                <NumberField
                    source="beforeRedeem"
                    label="BeforeRedeem"
                    textAlign="left"
                />
                <NumberField
                    source="afterRedeem"
                    label="AfterRedeem"
                    textAlign="left"
                />
                <NumberField source="redeemed" label="Redeemed" textAlign="left" />
                <TextField source="ipaddress" label="IpAddress" />
                <TextField source="cashier" label="Cashier" />
                <TextField source="manager" label="Manager" />
                <TextField source="remark" label="Remark" />
            </Datagrid>
        </List>
    );
};

import { useState } from "react";
import {
    Datagrid,
    DateField,
    List,
    NumberField,
    ReferenceField,
    TextField,
    TextInput,
    SearchInput,
    DateInput,
    EditButton,
    DeleteButton,
    usePermissions
} from "react-admin";
import { Button, Box, Typography, Alert } from "@mui/material";
import { NewGameFormDialog } from "./forms/NewGameForm";
import WithPermission from '../../Provider/WithPermission';

const dataFilters = [
    <DateInput source="createdAt" label="Start Date" alwaysOn resettable />,
    <DateInput source="createdAt" label="End Date" alwaysOn resettable />,
    <TextInput
        source="name"
        label="Account"
        placeholder="Search by Account"
        alwaysOn
        resettable
        variant="outlined"
    />,
    <SearchInput
        source="q"
        placeholder="Please enter your search content"
        alwaysOn
        resettable
        variant="outlined"
    />,
];

export const GameRecordList = () => {
    const { permissions } = usePermissions();

    const [openNewGameForm, setOpenNewGameForm] = useState(false);
    const handleOpenNewGameForm = () => setOpenNewGameForm(true);
    const handleCloseNewGameForm = () => setOpenNewGameForm(false);
    return (
        <>
            {/* <Box display="flex" sx={{justifyContent:"space-between", p: 2}}>
            <Typography variant="h4">Game Records</Typography>
        </Box> */}
            <Box
                display="flex"
                sx={{ justifyContent: "flex-end", p: 1, mt: 2, pr: 3 }}
            >
                {/* <Typography variant="h4">User Management</Typography> */}
                <Button
                    variant="contained"
                    color="primary"
                    name="newgame"
                    onClick={handleOpenNewGameForm}
                >
                    New game
                </Button>
                <NewGameFormDialog
                    open={openNewGameForm}
                    handleClose={handleCloseNewGameForm}
                />
            </Box>
            <List title="Game Records" filters={dataFilters} sx={{ pt: 1 }}>
                <Datagrid
                // rowClick="edit"
                >
                    <TextField source="actor" label="Actor" />
                    <TextField source="id" label="Game ID" />
                    <TextField source="account" label="Account" />
                    <TextField source="name" label="Game Title" />
                    <NumberField source="balanceBeforeGame" label="Balance Before Game" />
                    <NumberField source="totalPlayed" label="Total Played" />
                    <NumberField source="totalWin" label="Total Win" />
                    <NumberField source="balanceNow" label="Balance Now" />
                    <DateField source="createdAt" label="Recording Time" />
                    <TextField source="manager" label="Manager" />
                    {/* <WithPermission allowedRoles={['Admin']}>
                        <EditButton label="" />
                    </WithPermission>
                    <WithPermission allowedRoles={['Admin']}>
                        <DeleteButton label="" />
                    </WithPermission> */}
                </Datagrid>
            </List>
        </>
    );
};

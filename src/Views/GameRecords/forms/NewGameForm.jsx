import * as React from "react";
import Grid from '@mui/material/Grid';
import InputLabel from "@mui/material/InputLabel";
import Dialog from '@mui/material/Dialog';
import { TextInput } from "react-admin";
import { CreateForm } from "../../../Layout/CreateForm";

const CreateGameForm = ({handleClose}) => {
    return (
    <CreateForm title="Create New Game" handleClose={handleClose}>
            <Grid item xs={12}>
            <InputLabel htmlFor="name" 
            >Name</InputLabel>
            <TextInput
                id="name"
                name="name"
                label="name"
            />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextInput
                required
                id="description"
                name="description"
                label="description"
                multiline
                maxRows={5}
            />
            </Grid>
            
    </CreateForm>
    );
};

export const NewGameFormDialog = ({open, handleClose}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <CreateGameForm handleClose={handleClose}/>
        </Dialog>
    );
}
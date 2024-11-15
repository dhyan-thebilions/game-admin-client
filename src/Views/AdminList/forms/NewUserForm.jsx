import * as React from "react";
import Grid from '@mui/material/Grid';
import InputLabel from "@mui/material/InputLabel";
import Dialog from '@mui/material/Dialog';
import { TextInput } from "react-admin";
import { CreateForm } from "../../../Layout/CreateForm";

const CreateUserForm = ({handleClose}) => {
    return (
    <CreateForm title="Create New Agent" handleClose={handleClose}>
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
            <InputLabel htmlFor="username">Display Name</InputLabel>
            <TextInput
                id="username"
                name="username"
                label="username"
            />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInput
                id="email"
                name="email"
                label="email"
            />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
                required
                id="password"
                name="password"
                label="password"
            />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <TextInput
                required
                id="confirmpassword"
                name="confirmpassword"
                label="confirmpassword"
            />
            </Grid>
    </CreateForm>
    );
};

export const NewUserFormDialog = ({open, handleClose}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <CreateUserForm handleClose={handleClose}/>
        </Dialog>
    );
}
import React from "react";
import { EditBase, SimpleForm, TextInput, required } from "react-admin";
import { Card, Grid } from "@mui/material";

export const EditGameCatalogue = () => {
    return (
        <EditBase>
            <Card
                sx={{
                    mt: 2,
                }}
            >
                <SimpleForm>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextInput
                                source="name"
                                label="Game Name"
                                validate={[required()]}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                source="description"
                                label="Description"
                                validate={[required()]}
                                rows={4}
                                multiline
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </SimpleForm>
            </Card>
        </EditBase>
    );
};

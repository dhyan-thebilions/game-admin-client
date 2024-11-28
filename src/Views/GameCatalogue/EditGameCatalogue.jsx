import React from "react";
import { EditBase, SimpleForm, TextInput, required } from "react-admin";
import { Card } from "@mui/material";

export const EditGameCatalogue = () => {
    return (
        <EditBase>
            <Card
                sx={{
                    mt: 2,
                }}
            >
                <SimpleForm>
                    <TextInput source="name" label="Game Name" validate={[required()]} />
                </SimpleForm>
            </Card>
        </EditBase>
    )
};

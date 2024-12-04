import React from "react";
import {
  CreateBase,
  SimpleForm,
  TextInput,
  required,
  useNotify,
  useRedirect,
} from "react-admin";
import { Card, Grid } from "@mui/material";

export const CreateGameCatalogue = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify(`Element created successfully`);
    redirect("list", "GameCatalogue");
  };

  return (
    <CreateBase mutationOptions={{ onSuccess }}>
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
    </CreateBase>
  );
};

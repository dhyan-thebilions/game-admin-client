import React from "react";
import { CreateBase, SimpleForm, TextInput, required, useNotify, useRedirect } from "react-admin";
import { Card } from "@mui/material";

export const CreateGameCatalogue = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify(`Element created successfully`);
    redirect('list', 'GameCatalogue');
  };

  return (
    <CreateBase mutationOptions={{ onSuccess }}>
      <Card
        sx={{
          mt: 2,
        }}
      >
        <SimpleForm>
          <TextInput source="name" label="Game Name" validate={[required()]} />
        </SimpleForm>
      </Card>
    </CreateBase>
  );
};

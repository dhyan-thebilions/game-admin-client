import React from "react";
import { CreateBase, SimpleForm, TextInput, required } from "react-admin";
import { Card, Grid } from "@mui/material";

export const SettingForm = () => {
  return (
    <CreateBase>
      <Card
        sx={{
          mt: 2,
        }}
      >
        <SimpleForm>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput
                source="agentName"
                label="Agent Name"
                validate={[required()]}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                source="account"
                label="Account"
                validate={[required()]}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                source="agentLevel"
                label="Agent Level"
                validate={[required()]}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                source="loginTimes"
                label="Login Times"
                validate={[required()]}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                source="originalPassword"
                label="Original Password"
                validate={[required()]}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                source="newPassword"
                label="New Password"
                validate={[required()]}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                source="confirmPassword"
                label="Confirm Password"
                validate={[required()]}
                fullWidth
              />
            </Grid>
          </Grid>
        </SimpleForm>
      </Card>
    </CreateBase>
  );
};

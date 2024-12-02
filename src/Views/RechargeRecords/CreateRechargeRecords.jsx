import React from "react";
import {
  CreateBase,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  required,
} from "react-admin";
import { Card, Grid } from "@mui/material";

export const CreateRechargeRecords = () => {
  return (
    <CreateBase>
      <Card
        sx={{
          mt: 2,
        }}
      >
        <SimpleForm>
          <Grid container>
            <Grid item xs={4}>
              <TextInput
                source="gameId"
                label="GameId"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                source="account"
                label="Account"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                source="cashier"
                label="Cashier"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                source="manager"
                label="Manager"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                source="remark"
                label="Remark"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <TextInput
                source="ipaddress"
                label="IpAddress"
                validate={[required()]}
              />
            </Grid>

            <Grid item xs={4}>
              <NumberInput
                source="beforeRedeem"
                label="BeforeRedeem"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                source="afterRedeem"
                label="AfterRedeem"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                source="redeemed"
                label="Redeemed"
                validate={[required()]}
              />
            </Grid>
            <Grid item xs={4}>
              <DateInput
                source="redeemDate"
                label="RedeemDate"
                validate={[required()]}
              />
            </Grid>
          </Grid>
        </SimpleForm>
      </Card>
    </CreateBase>
  );
};

import React, { useEffect, useState } from "react";
import {
  Datagrid,
  List,
  TextField,
  DeleteButton,
  EditButton,
  SearchInput,
  CreateButton,
  TopToolbar,
  WrapperField,
  // Button,
  useRecordContext
} from "react-admin";
import { Menu, MenuItem, Button } from "@mui/material";

import { Parse } from "parse";
import { parseConfig } from "../../parseConfig";


// Initialize Parse
Parse.initialize(parseConfig.APP_ID, parseConfig.MASTER_KEY);
Parse.serverURL = parseConfig.URL;

const CustomButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const record = useRecordContext();
  if (!record) return null;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log("+++", event.currentTarget);
    console.log("$$$", record);

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>

      <Button variant="outlined" id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>Action</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Redeem</MenuItem>
        <MenuItem onClick={handleClose}>Recharge</MenuItem>
      </Menu>
    </React.Fragment>

  )
}

export const UserList = () => {
  const [userData, setUserData] = useState();

  const fetchAllUsers = async () => {
    try {
      const response = await Parse.Cloud.run("fetchAllUsers");
      setUserData(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const dataFilters = [
    <SearchInput source="q" alwaysOn resettable variant="outlined" />,
  ];

  const PostListActions = () => (
    <TopToolbar>
      <CreateButton />
    </TopToolbar>
  );



  return (
    <>

      <List
        title="Users"
        filters={dataFilters}
        sx={{ pt: 1 }}
        actions={<PostListActions />}
      >
        <Datagrid size="small" data={userData} rowClick={false}>
          <TextField source="username" label="User Name" />
          <TextField source="name" label="Name" />
          <TextField source="email" label="Email" />
          <TextField source="lastLoginIp" label="Last LoginIp" />
          <TextField source="balance" label="Balance" />
          <WrapperField label="Actions">
            {/* <DeleteButton />
            <EditButton /> */}
            <CustomButton />

          </WrapperField>
        </Datagrid>
      </List>

    </>

  );
};

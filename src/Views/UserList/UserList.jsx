import * as React from 'react';
import { 
    Datagrid, 
    NumberField, 
    List,
    DateField,
    BooleanField, 
    TextField,
    EditButton,
    TextInput,
    SearchInput,
    NullableBooleanInput,
    TopToolbar,
    ExportButton,
    useListContext,
    Title,
    useDataProvider,
    Loading,
    Error
} from 'react-admin';
import {useForm, FormProvider} from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {DatagridBody, RecordContextProvider} from 'react-admin';
import { Button, TableCell, TableRow, Checkbox, TableHead, InputAdornment } from '@mui/material';
import Box from "@mui/material/Box";
import Alert from "@mui/material//Alert";
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ContentFilter from "@mui/icons-material/FilterList";
import { NewUserFormDialog } from '../AdminList/forms/NewUserForm';

const UserDatagrid = ({props}) => {
    const { filterValues, page, perPage, sort } = useListContext();
    const dataProvider = useDataProvider();
    const params = {
        filter: filterValues,
        pagination: {page: page, perPage: perPage},
        sort: sort
    }
    const {data, isPending, error} = useQuery({
        queryKey: ['users', 'getList', params],
        queryFn: ({signal}) => dataProvider.getListUsers(params)
    });

    if (isPending) return <Loading />;
    if (error) return <Error />;
    if (!data) return null;

    return (
        <RecordContextProvider value={data}>
            <Datagrid {...props}>
                <TextField source="id" label="User ID"/>
                <TextField source="username" label="Username"/>
                <TextField source="name" label="name"/>
                <TextField source="email" label="email"/>
                <NumberField source="balance" />
                <DateField source="createdAt" label="register date" />
                <TextField source="registerIp" label="register IP"/>
                <NumberField source="loginTimes" label="Login times"/>
                <DateField source="updatedAt" label="Last Login"/>
                <TextField source="lastLoginAddress" label="Last Login Address"/>
                {/* <TextField source="manager" /> */}
                <BooleanField source="activeStatus" TrueIcon={ToggleOnIcon} FalseIcon={ToggleOffIcon} sx={{fontSize: "large"}}/>
                <EditButton label=""/>
            </Datagrid>
        </RecordContextProvider>
    );
};

const userFilters = [
    <TextInput source='account' label="Account" placeholder="Search by Account" alwaysOn resettable variant="outlined"/>,
    <SearchInput source="q" placeholder="Please enter your search content" alwaysOn resettable variant="outlined"/>

];

export const UserList = () => {
    const [ openNewUserForm, setOpenNewUserForm ] = React.useState(false);
    const handleOpenNewUserForm = () => setOpenNewUserForm(true);
    const handleCloseNewUserForm = () => setOpenNewUserForm(false);
    
    return (
    <Box sx={{mt:2}}>
        <Box display="flex" sx={{justifyContent:"flex-end", p: 2}}>
        {/* <Typography variant="h4">User Management</Typography> */}
            <Button variant="contained" color="primary" name="newuser" onClick={handleOpenNewUserForm}>New account</Button>
            <NewUserFormDialog open={openNewUserForm} handleClose={handleCloseNewUserForm} />
        </Box>
        <Alert icon={false} variant="outlined" severity="error" sx={{
            width:"60%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "15px",
            letterSpacing: "0.012em",
            color: "#D21D0F",
            borderRadius: "0px" 
        }}>
            Note: Recharge and redeem require the player to not be in the game (can be in the lobby)
        </Alert>
        <List 
            filters={userFilters}
            // actions= {<ListActions />}
            title="User Management"
        >
            {/* <Button variant="contained" color="secondary" sx={{mr:1}}>search</Button>
            <Button variant="outlined" color="primary">reset</Button> */}
            {/* <Title title="User Management" /> */}
            <Datagrid 
                bulkActionButtons={false} 
                size="small" 
                sx={{Width: 650}}
                rowClick="edit"
            >
                {/* <TextField source="id" label="User ID"/> */}
                <TextField source="username" label="Username"/>
                <TextField source="name" label="name"/>
                <TextField source="email" label="email"/>
                <NumberField source="balance" />
                <DateField source="createdAt" label="register date" />
                <TextField source="registerIp" label="register IP"/>
                <NumberField source="loginTimes" label="Login times"/>
                <DateField source="updatedAt" label="Last Login"/>
                <TextField source="lastLoginAddress" label="Last Login Address"/>
                {/* <TextField source="manager" /> */}
                <BooleanField source="activeStatus" TrueIcon={ToggleOnIcon} FalseIcon={ToggleOffIcon} sx={{fontSize: "large"}}/>
                <EditButton label=""/>
            </Datagrid>
        </List>
    </Box>
    );
};



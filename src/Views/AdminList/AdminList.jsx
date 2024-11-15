import { useState } from 'react';
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
    EditBase,
    useListContext,
    Title
} from 'react-admin';
import { Button, Box, Typography } from '@mui/material';
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import { RedeemFormDialog } from './RedeemForm';
import { RechargeFormDialog } from './RechargeForm';
import { UpdateInfoDialog } from './UpdateInfo';

const adminFilters = [
    <TextInput source='agentName' label="Agent Name" placeholder="Search by Agent" alwaysOn resettable variant="outlined"/>,
    <SearchInput source="q" placeholder="Please enter your search content" alwaysOn resettable variant="outlined"/>
];

const ListActions = () => { return <></>};


export const AdminList = () => {
    // const [open, setOpen] = useState({redeemRecords: false, rechargeRecords: false});
    
    // const handleOpen = (evt) => {
    //     setOpen(currData=> {return {...currData, [evt.target.name]: true} }); 
    // };

    // const handleClose = ({name}) => {
    //     setOpen(currData=> {return {...currData, [name]: false} }); 
    // };

    const [openRedeem, setOpenRedeem] = useState(false);
    const handleOpenRedeem = () => (setOpenRedeem(true));
    const handleCloseRedeem = () => (setOpenRedeem(false));

    const [openRecharge, setOpenRecharge] = useState(false);
    const handleOpenRecharge = () => (setOpenRecharge(true));
    const handleCloseRecharge = () => (setOpenRecharge(false));

    const [openUpdateInfo, setOpenUpdateInfo] = useState(false);
    const handleOpenUpdateInfo = () => (setOpenUpdateInfo(true));
    const handleCloseUpdateInfo = () => (setOpenUpdateInfo(false));
    
    return (
        <>
            <List 
                title="Admin Management" 
                actions={<ListActions />}
                sx={{
                    '& .RaList-content': {
                        backgroundColor: "rgba(0,0,0,0)",
                        boxShadow: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        pt:3
                    },
                }}
            >
                {/* <Title title="Admin management"/> */}
                {/* <Box sx={{p: 2}}>
                <Typography variant="h4" component="h1">Admin Management</Typography>
                </Box> */}
                <Datagrid>
                    <TextField source="account"  label="Account"/>
                    <NumberField source="Balance" label="Balance"/>
                    <TextField source="Manager" label="Manager"/>
                    <BooleanField source="Action" TrueIcon={ToggleOnIcon} FalseIcon={ToggleOffIcon} sx={{fontSize: "large"}}/>
                </Datagrid>
                <Box sx={{display: "flex", justifyContent: "center", gap:"20px", mb: 2}}>
                    <Button variant="contained" color="warning" name="redeemRecords" onClick={handleOpenRedeem}>redeem</Button>
                    <RedeemFormDialog handleClose={handleCloseRedeem} open={openRedeem} resource={"redeemrecords"} id={0} />
                    <Button variant="contained" color="error" name="rechargeRecords" onClick={handleOpenRecharge}>recharge</Button>
                    <RechargeFormDialog handleClose={handleCloseRecharge} open={openRecharge} resource={"rechargerecords"} id={0} />
                    <Button variant="contained" color="success" name="updateInfo" onClick={handleOpenUpdateInfo}>update info</Button>
                    <UpdateInfoDialog handleClose={handleCloseUpdateInfo} open={openUpdateInfo} resource={"admins"} id={0} />
                    <Button variant="contained" color="info">reset password</Button>
                    <Button variant="contained" color="secondary">transaction record</Button>
                </Box>
            
                <Datagrid>
                    <TextField source="agentName" label="Agent Name"/>
                    <TextField source="account"  label="Account"/>
                    <NumberField source="loginTimes" label="Login Times"/>
                    <DateField source="loginTime" label="Login Time"/>
                    <TextField source="LoginAddress" label="Login Address"/>
                    <DateField source="LastLoginTime" label="Last Login Time"/>
                    <TextField source="LastLoginAddress" label="Last Login Address"/>
                    <NumberField source="Balance" label="Balance"/>
                    <TextField source="Manager" label="Manager"/>
                    <BooleanField source="Action" TrueIcon={ToggleOnIcon} FalseIcon={ToggleOffIcon} sx={{fontSize: "large"}}/>
                    <EditButton label=""/>
                </Datagrid>
            </List>
        </>
    );
}
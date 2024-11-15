import React from "react";
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
} from "react-admin";

export const GameConfig = () => {
    const dataFilters = [
        <SearchInput source="q" alwaysOn resettable variant="outlined" />,
    ];

    const PostListActions = () => (
        <TopToolbar>
            <CreateButton />
        </TopToolbar>
    );

    return (
        <List
            title="Game Config"
            filters={dataFilters}
            sx={{ pt: 1 }}
            actions={<PostListActions />}

        >
            <Datagrid size="small" >
                <TextField source="gameName" label="Game Name" />
                <TextField source="gameRtp" label="Game RTP" />
                <WrapperField label="Actions">
                    <DeleteButton />
                    <EditButton />
                </WrapperField>
            </Datagrid>
        </List>
    );
};

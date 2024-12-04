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

export const GameCatalogue = () => {
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
            title="Game Catalogue "
            filters={dataFilters}
            sx={{ pt: 1 }}
            actions={<PostListActions />}
        >
            <Datagrid size="small" optimized>
                <TextField source="name" label="Game Name" />
                <WrapperField label="Actions">
                    <DeleteButton />
                    <EditButton />
                </WrapperField>
            </Datagrid>
        </List>
    );
};

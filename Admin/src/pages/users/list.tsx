// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const UsersList = () => {
//   return <MuiListInferencer />;
// };

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
    EmailField,
    MarkdownField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Checkbox } from "@mui/material";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("User ID"),
                minWidth: 50,
            },
            {
                field: "username",
                flex: 1,
                headerName: translate("Username"),
                minWidth: 200,
            },
            // {
            //     field: "password",
            //     flex: 1,
            //     headerName: translate("Password"),
            //     minWidth: 200,
            // },
            {
                field: "avatarUrl",
                flex: 1,
                headerName: translate("avatarUrl"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return (
                        <img
                            src={value}
                            style={{ height: "50px", maxWidth: "100px" }}
                        />
                    );
                },
            },
            {
                field: "role",
                flex: 1,
                headerName: translate("Role"),
                minWidth: 200,
            },
            {
                field: "reputation",
                flex: 1,
                headerName: translate("Reputation"),
                type: "number",
                minWidth: 200,
            },

            {
                field: "lastLogin",
                flex: 1,
                headerName: translate("Last Login"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "email",
                flex: 1,
                headerName: translate("Email"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: "emailVerified",
                headerName: translate("Email Verified"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "country",
                flex: 1,
                headerName: translate("Country"),
                minWidth: 200,
            },
            {
                field: "city",
                flex: 1,
                headerName: translate("City"),
                minWidth: 200,
            },
            {
                field: "phone",
                flex: 1,
                headerName: translate("Phone"),
                minWidth: 200,
            },
            {
                field: "website",
                flex: 1,
                headerName: translate("Website"),
                minWidth: 200,
            },
            {
                field: "aboutMe",
                flex: 1,
                headerName: translate("About Me"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return (
                        <MarkdownField
                            value={(value ?? "").slice(0, 80) + "..."}
                        />
                    );
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("createdAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("updatedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "PostCount",
                flex: 1,
                headerName: translate("Post Count"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "CommentCount",
                flex: 1,
                headerName: translate("Comment Count"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "followersCount",
                flex: 1,
                headerName: translate("Followers Count"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "followingCount",
                flex: 1,
                headerName: translate("Following Count"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "subscribedForumsCount",
                flex: 1,
                headerName: translate("Subscribed Forums Count"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "ownedForumsCount",
                flex: 1,
                headerName: translate("Owned Forums Count"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "actions",
                headerName: translate("Actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

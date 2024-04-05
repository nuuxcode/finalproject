import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    useTranslate,
    useMany,
} from "@refinedev/core";
import { Checkbox } from "@mui/material";

export const CommentList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const { data: userData, isLoading: userIsLoading } = useMany({
        resource: "users",
        ids: dataGridProps?.rows?.map((item: any) => item?.userId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const { data: postData, isLoading: postIsLoading } = useMany({
        resource: "posts",
        ids: dataGridProps?.rows?.map((item: any) => item?.postId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("ID"),
                minWidth: 50,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "content",
                flex: 1,
                headerName: translate("Content"),
                minWidth: 250,
            },
            {
                field: "userId",
                flex: 1,
                headerName: translate("User"),
                minWidth: 20,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ value }) {
                    return userIsLoading ? (
                        <>Loading...</>
                    ) : (
                        userData?.data?.find((item) => item.id === value)
                            ?.username
                    );
                },
            },
            {
                field: "postId",
                flex: 1,
                headerName: translate("PostId"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "isVisible",
                headerName: translate("isVisible"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("CreatedAt"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("UpdatedAt"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },

            },
            // {
            //     field: "votesCount",
            //     flex: 1,
            //     headerName: translate("comments.fields.votesCount"),
            //     type: "number",
            //     minWidth: 80,
            // },
            {
                field: "upvotesCount",
                flex: 1,
                headerName: translate("Upvotes"),
                type: "number",
                minWidth: 40,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "downvotesCount",
                flex: 1,
                headerName: translate("Downvotes"),
                type: "number",
                minWidth: 40,
                align: "center",
                headerAlign: "center",
            },
            // {
            //     field: "isAccepted",
            //     headerName: translate("comments.fields.isAccepted"),
            //     minWidth: 100,
            //     renderCell: function render({ value }) {
            //         return <Checkbox checked={!!value} />;
            //     },
            // },
            {
                field: "actions",
                headerName: translate("table.actions"),
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
        [translate, userData?.data, postData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

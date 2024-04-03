// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const CommentList = () => {
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
                headerName: translate("comments.fields.id"),
                minWidth: 50,
            },
            {
                field: "content",
                flex: 1,
                headerName: translate("comments.fields.content"),
                minWidth: 200,
            },
            {
                field: "userId",
                flex: 1,
                headerName: translate("comments.fields.userId"),
                minWidth: 300,
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
                headerName: translate("comments.fields.postId"),
                minWidth: 300,
            },
            {
                field: "isVisible",
                headerName: translate("comments.fields.isVisible"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("comments.fields.createdAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("comments.fields.updatedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "votesCount",
                flex: 1,
                headerName: translate("comments.fields.votesCount"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "upvotesCount",
                flex: 1,
                headerName: translate("comments.fields.upvotesCount"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "downvotesCount",
                flex: 1,
                headerName: translate("comments.fields.downvotesCount"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "isAccepted",
                headerName: translate("comments.fields.isAccepted"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
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

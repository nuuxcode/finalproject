import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    MarkdownField,
    DateField,
    TagField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    useTranslate,
    useMany,
} from "@refinedev/core";
import { Checkbox } from "@mui/material";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const { data: userData, isLoading: userIsLoading } = useMany({
        resource: "users",
        ids: dataGridProps?.rows?.map((item: any) => item?.userId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const { data: forumData, isLoading: forumIsLoading } = useMany({
        resource: "forums",
        ids: dataGridProps?.rows?.map((item: any) => item?.forumId) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("Post ID"),
                minWidth: 50,
            },
            {
                field: "title",
                flex: 1,
                headerName: translate("Title"),
                minWidth: 200,
            },
            {
                field: "content",
                flex: 1,
                headerName: translate("Content"),
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
                field: "userId",
                flex: 1,
                headerName: translate("Author"),
                minWidth: 100,
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
                field: "forumId",
                flex: 1,
                headerName: translate("Forum"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return forumIsLoading ? (
                        <>Loading...</>
                    ) : (
                        forumData?.data?.find((item) => item.id === value)?.name
                    );
                },
            },
            {
                field: "isPinned",
                headerName: translate("isPinned"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "isVisible",
                headerName: translate("isVisible"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "slug",
                flex: 1,
                headerName: translate("slug"),
                minWidth: 200,
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("createdAt"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("updatedAt"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "commentsCount",
                flex: 1,
                headerName: translate("commentsCount"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "viewsCount",
                flex: 1,
                headerName: translate("viewsCount"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "votesCount",
                flex: 1,
                headerName: translate("votesCount"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "upvotesCount",
                flex: 1,
                headerName: translate("upvotesCount"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "downvotesCount",
                flex: 1,
                headerName: translate("downvotesCount"),
                type: "number",
                minWidth: 50,
            },
            // {
            //     field: "user",
            //     flex: 1,
            //     headerName: translate("user"),
            //     valueGetter: ({ row }) => {
            //         const value = row?.user?.username;

            //         return value;
            //     },
            //     minWidth: 200,
            // },
            // {
            //     field: "attachments",
            //     flex: 1,
            //     headerName: translate("attachments"),
            //     minWidth: 100,
            //     renderCell: function render({ value }) {
            //         return (
            //             <>
            //                 {value?.map((item: any, index: number) => (
            //                     <img
            //                         src={item?.name}
            //                         key={index}
            //                         style={{
            //                             height: "50px",
            //                             maxWidth: "100px",
            //                         }}
            //                     />
            //                 ))}
            //             </>
            //         );
            //     },
            // },
            // {
            //     field: "comments",
            //     flex: 1,
            //     headerName: translate("comments"),
            //     minWidth: 200,
            //     renderCell: function render({ row }) {
            //         return (
            //             <>
            //                 {row?.comments?.map((item: any) => (
            //                     <TagField
            //                         value={item?.content}
            //                         key={item?.content}
            //                     />
            //                 ))}
            //             </>
            //         );
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
        [translate, userData?.data, forumData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

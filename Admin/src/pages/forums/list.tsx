// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const ForumList = () => {
//   return <MuiListInferencer />;
// };
import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    UrlField,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const ForumList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("forums.fields.id"),
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("forums.fields.name"),
                minWidth: 200,
            },
            {
                field: "slug",
                flex: 1,
                headerName: translate("forums.fields.slug"),
                minWidth: 200,
            },
            {
                field: "description",
                flex: 1,
                headerName: translate("forums.fields.description"),
                minWidth: 200,
            },
            {
                field: "logo",
                flex: 1,
                headerName: translate("forums.fields.logo"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <UrlField value={value} />;
                },
                // to show image
              //   renderCell: function render({ value }) {
              //     return (
              //         <img
              //             src={value}
              //             style={{ height: "50px", maxWidth: "100px" }}
              //         />
              //     );
              // },
            },
            {
                field: "banner",
                flex: 1,
                headerName: translate("forums.fields.banner"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <UrlField value={value} />;
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("forums.fields.createdAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("forums.fields.updatedAt"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "postsCount",
                flex: 1,
                headerName: translate("forums.fields.postsCount"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "viewsCount",
                flex: 1,
                headerName: translate("forums.fields.viewsCount"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "subscribersCount",
                flex: 1,
                headerName: translate("forums.fields.subscribersCount"),
                type: "number",
                minWidth: 200,
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
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

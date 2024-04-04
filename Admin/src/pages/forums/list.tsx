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
                headerName: translate("ID"),
                minWidth: 50,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("Name"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "slug",
                flex: 1,
                headerName: translate("Slug"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "description",
                flex: 1,
                headerName: translate("Description"),
                minWidth: 300,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "logo",
                flex: 1,
                headerName: translate("Logo"),
                minWidth: 150,
                align: "center",
                headerAlign: "center",
                // renderCell: function render({ value }) {
                //     return <UrlField value={value} />;
                // },
                // to show image
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
                field: "banner",
                flex: 1,
                headerName: translate("Banner"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ value }) {
                    return <UrlField value={value} />;
                },
            },
            {
                field: "createdAt",
                flex: 1,
                headerName: translate("Created"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "updatedAt",
                flex: 1,
                headerName: translate("Updated"),
                minWidth: 100,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "postsCount",
                flex: 1,
                headerName: translate("PostsCount"),
                type: "number",
                minWidth: 40,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "viewsCount",
                flex: 1,
                headerName: translate("ViewsCount"),
                type: "number",
                minWidth: 40,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "subscribersCount",
                flex: 1,
                headerName: translate("SubscribersCount"),
                type: "number",
                minWidth: 40,
                align: "center",
                headerAlign: "center",
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

// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const ForumShow = () => {
//   return <MuiShowInferencer />;
// };


import { useShow, useTranslate } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    MarkdownField,
    UrlField,
    DateField,
    NumberField,
    TagField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ForumShow = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {translate("Id")}
                </Typography>
                <TextField value={record?.id} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Name")}
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Slug")}
                </Typography>
                <TextField value={record?.slug} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Description")}
                </Typography>
                <MarkdownField value={record?.description} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Logo")}
                </Typography>
                <UrlField value={record?.logo} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Banner")}
                </Typography>
                <UrlField value={record?.banner} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("CreatedAt")}
                </Typography>
                <DateField value={record?.createdAt} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Updated")}
                </Typography>
                <DateField value={record?.updatedAt} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Posts Count")}
                </Typography>
                <NumberField value={record?.postsCount ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Views Count")}
                </Typography>
                <NumberField value={record?.viewsCount ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Subscribers Count")}
                </Typography>
                <NumberField value={record?.subscribersCount ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {translate("Owner")}
                </Typography>
                <TextField value={record?.owner?.username} />
            </Stack>
        </Show>
    );
};

import { useShow, useTranslate } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const CommentShow = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}></Stack>
        </Show>
    );
};

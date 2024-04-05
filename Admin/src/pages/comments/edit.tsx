// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const CommentEdit = () => {
//   return <MuiEditInferencer />;
// };
import { Edit, useAutocomplete } from "@refinedev/mui";
import {
    Box,
    TextField,
    Autocomplete,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const CommentEdit = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const commentsData = queryResult?.data?.data;

    const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
        resource: "users",
        defaultValue: commentsData?.userId,
    });

    const { autocompleteProps: postAutocompleteProps } = useAutocomplete({
        resource: "posts",
        defaultValue: commentsData?.postId,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("id")}
                    name="id"
                    disabled
                />
                <TextField
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.content}
                    helperText={(errors as any)?.content?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label={translate("content")}
                    name="content"
                />
                <Controller
                    control={control}
                    name="userId"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...userAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    userAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.username ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("userId")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.userId}
                                    helperText={
                                        (errors as any)?.userId?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="postId"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...postAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    postAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("postId")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.postId}
                                    helperText={
                                        (errors as any)?.postId?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("isVisible")}
                      defaultChecked={false}
                      color="primary"
                    />
                  }
                  label={translate("isVisible")}
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("createdAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.createdAt}
                    helperText={(errors as any)?.createdAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("createdAt")}
                    name="createdAt"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("updatedAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.updatedAt}
                    helperText={(errors as any)?.updatedAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("updatedAt")}
                    name="updatedAt"
                />
                <TextField
                    {...register("votesCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.votesCount}
                    helperText={(errors as any)?.votesCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("votesCount")}
                    name="votesCount"
                />
                <TextField
                    {...register("upvotesCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.upvotesCount}
                    helperText={(errors as any)?.upvotesCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("upvotesCount")}
                    name="upvotesCount"
                />
                <TextField
                    {...register("downvotesCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.downvotesCount}
                    helperText={(errors as any)?.downvotesCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("downvotesCount")}
                    name="downvotesCount"
                />
                <Controller
                    control={control}
                    name="isAccepted"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("isAccepted")}
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            }
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};

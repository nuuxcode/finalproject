// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const BlogPostCreate = () => {
//   return <MuiCreateInferencer />;
// };
import { Create, useAutocomplete } from "@refinedev/mui";
import {
    Box,
    TextField,
    Autocomplete,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
        resource: "users",
    });

    const { autocompleteProps: forumAutocompleteProps } = useAutocomplete({
        resource: "forums",
    });

    const { autocompleteProps: commentsAutocompleteProps } = useAutocomplete({
        resource: "comments",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("posts.fields.title")}
                    name="title"
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
                    label={translate("posts.fields.content")}
                    name="content"
                />
                <Controller
                    control={control}
                    name="userId"
                    rules={{ required: "This field is required" }}
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
                                    label={translate("posts.fields.userId")}
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
                    name="forumId"
                    rules={{ required: "This field is required" }}
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...forumAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value?.id ?? value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    forumAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            (item?.id ?? item)?.toString(),
                                    )?.name ?? ""
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
                                    label={translate("posts.fields.forumId")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.forumId}
                                    helperText={
                                        (errors as any)?.forumId?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="isPinned"
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("posts.fields.isPinned")}
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
                <Controller
                    control={control}
                    name="isVisible"
                   
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("posts.fields.isVisible")}
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
                <TextField
                    {...register("slug", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.slug}
                    helperText={(errors as any)?.slug?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("posts.fields.slug")}
                    name="slug"
                />

                <TextField
                    {...register("createdAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.createdAt}
                    helperText={(errors as any)?.createdAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("posts.fields.createdAt")}
                    name="createdAt"
                />
                <TextField
                    {...register("updatedAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.updatedAt}
                    helperText={(errors as any)?.updatedAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("posts.fields.updatedAt")}
                    name="updatedAt"
                />
                <TextField
                    {...register("commentsCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.commentsCount}
                    helperText={(errors as any)?.commentsCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("posts.fields.commentsCount")}
                    name="commentsCount"
                />
                <TextField
                    {...register("viewsCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.viewsCount}
                    helperText={(errors as any)?.viewsCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("posts.fields.viewsCount")}
                    name="viewsCount"
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
                    label={translate("posts.fields.votesCount")}
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
                    label={translate("posts.fields.upvotesCount")}
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
                    label={translate("posts.fields.downvotesCount")}
                    name="downvotesCount"
                />
                <Controller
                    control={control}
                    name="comments"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[] as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...commentsAutocompleteProps}
                            {...field}
                            multiple
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    commentsAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.content ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("posts.fields.comments")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.comments?.id}
                                    helperText={
                                        (errors as any)?.comments?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};

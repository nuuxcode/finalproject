// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const ForumEdit = () => {
//   return <MuiEditInferencer />;
// };
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const ForumEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const forumsData = queryResult?.data?.data;

    const { autocompleteProps: postsAutocompleteProps } = useAutocomplete({
        resource: "posts",
        defaultValue: forumsData?.posts?.map((item: any) => item?.id),
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
                    label={translate("forums.fields.id")}
                    name="id"
                    disabled
                />
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("forums.fields.name")}
                    name="name"
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
                    label={translate("forums.fields.slug")}
                    name="slug"
                />
                <TextField
                    {...register("description", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.description}
                    helperText={(errors as any)?.description?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("forums.fields.description")}
                    name="description"
                />
                <TextField
                    {...register("logo", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.logo}
                    helperText={(errors as any)?.logo?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="url"
                    label={translate("forums.fields.logo")}
                    name="logo"
                />
                <TextField
                    {...register("banner", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.banner}
                    helperText={(errors as any)?.banner?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="url"
                    label={translate("forums.fields.banner")}
                    name="banner"
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
                    label={translate("forums.fields.createdAt")}
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
                    label={translate("forums.fields.updatedAt")}
                    name="updatedAt"
                />
                <TextField
                    {...register("postsCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.postsCount}
                    helperText={(errors as any)?.postsCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("forums.fields.postsCount")}
                    name="postsCount"
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
                    label={translate("forums.fields.viewsCount")}
                    name="viewsCount"
                />
                <TextField
                    {...register("subscribersCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.subscribersCount}
                    helperText={(errors as any)?.subscribersCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("forums.fields.subscribersCount")}
                    name="subscribersCount"
                />
                <Controller
                    control={control}
                    name="posts"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={[] as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...postsAutocompleteProps}
                            {...field}
                            multiple
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    postsAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={translate("forums.fields.posts")}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.posts?.id}
                                    helperText={
                                        (errors as any)?.posts?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};

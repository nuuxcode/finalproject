// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const ForumCreate = () => {
//   return <MuiCreateInferencer />;
// };

import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslate } from "@refinedev/core";

export const ForumCreate = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
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
                    label={translate("name")}
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
                    label={translate("slug")}
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
                    multiline
                    label={translate("description")}
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
                    label={translate("logo")}
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
                    label={translate("banner")}
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
                    label={translate("postsCount")}
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
                    label={translate("viewsCount")}
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
                    label={translate("subscribersCount")}
                    name="subscribersCount"
                />
                <TextField
                    {...register("owner.id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.owner?.id}
                    helperText={(errors as any)?.owner?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("owner")}
                    name="owner.id"
                />
            </Box>
        </Create>
    );
};

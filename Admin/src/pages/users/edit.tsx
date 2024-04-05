// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const UsersEdit = () => {
//   return <MuiEditInferencer />;
// };

import { Edit } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const UsersEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const usersData = queryResult?.data?.data;

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
                    {...register("username", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.username}
                    helperText={(errors as any)?.username?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("username")}
                    name="username"
                />
                <TextField
                    {...register("password", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.password}
                    helperText={(errors as any)?.password?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("password")}
                    name="password"
                />
                <TextField
                    {...register("reputation", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.reputation}
                    helperText={(errors as any)?.reputation?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("reputation")}
                    name="reputation"
                />
                <TextField
                    {...register("role", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.role}
                    helperText={(errors as any)?.role?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("role")}
                    name="role"
                />
                <TextField
                    {...register("lastLogin", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.lastLogin}
                    helperText={(errors as any)?.lastLogin?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("lastLogin")}
                    name="lastLogin"
                />
                <TextField
                    {...register("email", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.email}
                    helperText={(errors as any)?.email?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    label={translate("email")}
                    name="email"
                />
                <Controller
                    control={control}
                    name="emailVerified"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <FormControlLabel
                            label={translate("emailVerified")}
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
                    {...register("country", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.country}
                    helperText={(errors as any)?.country?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("country")}
                    name="country"
                />
                <TextField
                    {...register("city", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.city}
                    helperText={(errors as any)?.city?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("city")}
                    name="city"
                />
                <TextField
                    {...register("phone", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.phone}
                    helperText={(errors as any)?.phone?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("phone")}
                    name="phone"
                />
                <TextField
                    {...register("website", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.website}
                    helperText={(errors as any)?.website?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("website")}
                    name="website"
                />
                <TextField
                    {...register("aboutMe", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.aboutMe}
                    helperText={(errors as any)?.aboutMe?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label={translate("aboutMe")}
                    name="aboutMe"
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
                    label={translate("createdAt")}
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
                    label={translate("updatedAt")}
                    name="updatedAt"
                />
                <TextField
                    {...register("PostCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.PostCount}
                    helperText={(errors as any)?.PostCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("PostCount")}
                    name="PostCount"
                />
                <TextField
                    {...register("CommentCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.CommentCount}
                    helperText={(errors as any)?.CommentCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("CommentCount")}
                    name="CommentCount"
                />
                <TextField
                    {...register("followersCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.followersCount}
                    helperText={(errors as any)?.followersCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("followersCount")}
                    name="followersCount"
                />
                <TextField
                    {...register("followingCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.followingCount}
                    helperText={(errors as any)?.followingCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("followingCount")}
                    name="followingCount"
                />
                <TextField
                    {...register("subscribedForumsCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.subscribedForumsCount}
                    helperText={(errors as any)?.subscribedForumsCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("subscribedForumsCount")}
                    name="subscribedForumsCount"
                />
                <TextField
                    {...register("ownedForumsCount", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.ownedForumsCount}
                    helperText={(errors as any)?.ownedForumsCount?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("ownedForumsCount")}
                    name="ownedForumsCount"
                />
            </Box>
        </Edit>
    );
};

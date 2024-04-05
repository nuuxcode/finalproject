// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const PostEdit = () => {
//   return <MuiEditInferencer />;
// };
// // 
// import { Edit } from "@refinedev/mui";
// import { Box } from "@mui/material";
// import { useForm } from "@refinedev/react-hook-form";
// import { useTranslate } from "@refinedev/core";

// export const PostEdit = () => {
//     const translate = useTranslate();
//     const {
//         saveButtonProps,
//         refineCore: { queryResult },
//         register,
//         control,
//         formState: { errors },
//     } = useForm();

//     const postsData = queryResult?.data?.data;

//     return (
//         <Edit saveButtonProps={saveButtonProps}>
//             <Box
//                 component="form"
//                 sx={{ display: "flex", flexDirection: "column" }}
//                 autoComplete="off"
//             ></Box>
//         </Edit>
//     );
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

export const PostEdit = () => {
    const translate = useTranslate();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const postsData = queryResult?.data?.data;

    const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
        resource: "users",
        defaultValue: postsData?.userId,
    });

    const { autocompleteProps: forumAutocompleteProps } = useAutocomplete({
        resource: "forums",
        defaultValue: postsData?.forumId,
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
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={translate("title")}
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
                    label={translate("content")}
                    name="content"
                />
                <TextField
                    {...register("forumId", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.forumId}
                    helperText={(errors as any)?.forumId?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label={translate("forumId")}
                    name="forumId"
                />
                <TextField
                    {...register("userId", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.userId}
                    helperText={(errors as any)?.userId?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label={translate("userId")}
                    name="userId"
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
                    label={translate("commentsCount")}
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
                    label={translate("viewsCount")}
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
            </Box>
        </Edit>
    );
};

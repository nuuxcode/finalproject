// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const PostShow = () => {
//   return <MuiShowInferencer />;
// };

// import { MuiShowInferencer } from "@refinedev/inferencer/mui";
// import { useShow, useParsed } from "@refinedev/core";  


// type MyParams = {
//   post: string;
// };

// export const PostShow = () => {
//   const { id } = useParsed();

//   useShow({  
//     resource: "posts/post",  
//     id,  
//   });  

//   return <MuiShowInferencer />;
// };

// import { useShow, useParsed } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const PostShow = () => {
//   const { data, isLoading } = useParsed<MyParams>();
//   const id = data?.post;

//   useShow({
//     resource: "posts",
//     id,
//   });

//   if (isLoading) return <div>Loading...</div>;

//   return <MuiShowInferencer />;
// };

// type MyParams = {
//   post: string;
// };



// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const UsersShow = () => {
//   return <MuiShowInferencer />;
// };
// import {
//   useShow,
//   IResourceComponentsProps,
//   useTranslate,
// } from "@refinedev/core";
// import {
//   Show,
//   TextFieldComponent as TextField,
//   NumberField,
//   DateField,
//   EmailField,
//   BooleanField,
//   MarkdownField,
// } from "@refinedev/mui";
// import { Typography, Stack } from "@mui/material";

// export const PostShow: React.FC<IResourceComponentsProps> = () => {
//   const translate = useTranslate();

//   useShow({
//     resource: "posts",
//     id,
//   });
//   const { queryResult } = useShow();
//   const { data, isLoading } = queryResult;

//   const record = data?.data;

//   return (
//       <Show isLoading={isLoading}>
//           <Stack gap={1}>
//               <DateField value={record?.createdAt} />
//               <Typography variant="body1" fontWeight="bold">
//                   {translate("users.fields.updatedAt")}
//               </Typography>
//               <DateField value={record?.updatedAt} />
//               <Typography variant="body1" fontWeight="bold">
//                   {translate("users.fields.PostCount")}
//               </Typography>

//           </Stack>
//       </Show>
//   );
// };

// import { useShow, useParsed } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// type MyParams = {
//   id: string;
// };

// export const PostShow: React.FC = () => {
//   const { id } = useParsed<MyParams>();

//   useParse({
//     resource: "posts/post",
//     id,
//   });

//   return <MuiShowInferencer />;
// };

// export default PostShow;
import React from "react";
import { useParsed } from "@refinedev/core";
import { useShow, useParse } from "@refinedev/core";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";

type MyParams = {
  id: string;
};

export const PostShow: React.FC = () => {
  const {
    id,
  } = useParsed<MyParams>();

  // Use useParse to fetch data from the desired API endpoint
  useShow({
    resource: "posts/post", // Specify the resource endpoint
    id, // Pass the extracted id
  });

  return <MuiShowInferencer />; // Render your component with fetched data
};

// export default PostShow;

// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const PostShow = () => {
//   // return <MuiShowInferencer />;
//   return <MuiShowInferencer />;
// };

// import { useParsed, useShow, useTranslate } from "@refinedev/core";
// // import { Show } from "@refinedev/mui";
// import { Typography, Stack } from "@mui/material";
// import {
//   Show,
//   TextFieldComponent as TextField,
//   NumberField,
//   DateField,
//   EmailField,
//   BooleanField,
//   MarkdownField,
// } from "@refinedev/mui";
// export const PostShow = () => {
//     const translate = useTranslate();
//     // const { queryResult } = useShow({ resource: "posts/post" });
//     const { id } = useParsed(); // Extract the id parameter from the URL
//     const { queryResult } = useShow({ resource: `posts/post`, id }); // Use the extracted id parameter in the resource
//     const { data, isLoading } = queryResult;

//     const record = data?.data;
//     console.log(record)

//     return (
//         <Show isLoading={isLoading}>
//             <Stack gap={1}>
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("createdAt")}
//                 </Typography>
//                 <DateField value={record?.createdAt} />
    
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("updatedAt")}
//                 </Typography>
//                 <DateField value={record?.updatedAt} />
    
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("title")}
//                 </Typography>
//                 <TextField value={record?.title} />
    
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("body")}
//                 </Typography>
//                 <TextField value={record?.body} />
    
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("Author")}
//                 </Typography>
//                 <TextField value={record?.userId} />
    
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("Forum")}
//                 </Typography>
//                 <TextField value={record?.forumId} />
    
//                 <Typography variant="body1" fontWeight="bold">
//                     {translate("isPinned")}
//                 </Typography>
//                 <BooleanField value={record?.isPinned} />
//                 {/* <Checkbox checked={!!record?.isPinned} /> */}
//             </Stack>
//         </Show>
//     );
// };

import { useShow, useTranslate, useParsed,  useOne } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    MarkdownField,
    BooleanField,
    DateField,
    NumberField,
    TagField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const PostShow = () => {
    const translate = useTranslate();
    // const { queryResult } = useShow();
    const { id } = useParsed();
    const { queryResult } = useShow({ resource: `posts/post`, id });
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: userData, isLoading: userIsLoading } = useOne({
        resource: "users",
        id: record?.userId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: forumData, isLoading: forumIsLoading } = useOne({
        resource: "forums",
        id: record?.forumId || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
      <Show isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {translate("id")}
          </Typography>
          <TextField value={record?.id} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("title")}
          </Typography>
          <TextField value={record?.title} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("content")}
          </Typography>
          <MarkdownField value={record?.content} />
          <Typography variant="body1" fontWeight="bold">
            {translate("userId")}
          </Typography>

          {userIsLoading ? (
            <>Loading...</>
          ) : (
            <>{userData?.data?.username}</>
          )}
          <Typography variant="body1" fontWeight="bold">
            {translate("forumId")}
          </Typography>

          {forumIsLoading ? (
            <>Loading...</>
          ) : (
            <>{forumData?.data?.name}</>
          )}
          <Typography variant="body1" fontWeight="bold">
            {translate("isPinned")}
          </Typography>
          <BooleanField value={record?.isPinned} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("isVisible")}
          </Typography>
          <BooleanField value={record?.isVisible} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("slug")}
          </Typography>
          <TextField value={record?.slug} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("createdAt")}
          </Typography>
          <DateField value={record?.createdAt} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("updatedAt")}
          </Typography>
          <DateField value={record?.updatedAt} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("commentsCount")}
          </Typography>
          <NumberField value={record?.commentsCount ?? ""} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("viewsCount")}
          </Typography>
          <NumberField value={record?.viewsCount ?? ""} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("votesCount")}
          </Typography>
          <NumberField value={record?.votesCount ?? ""} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("upvotesCount")}
          </Typography>
          <NumberField value={record?.upvotesCount ?? ""} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("downvotesCount")}
          </Typography>
          <NumberField value={record?.downvotesCount ?? ""} sx={{ margin: '0.5rem' }} />
          <Typography variant="body1" fontWeight="bold">
            {translate("attachments")}
          </Typography>
          <Stack direction="row" spacing={1}>
            {record?.attachments?.map((item: any) => (
              <img
                style={{
                  maxWidth: 200,
                  width: "100%",
                  height: 200,
                }}
                src={item?.name}
                key={item?.name}
              />
            ))}
          </Stack>
          <Typography variant="body1" fontWeight="bold">
            {translate("comments")}
          </Typography>

        </Stack>
      </Show>
    );
};

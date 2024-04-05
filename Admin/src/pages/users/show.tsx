import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
  } from "@refinedev/core";
  import {
    Show,
    TextFieldComponent as TextField,
    NumberField,
    DateField,
    EmailField,
    BooleanField,
    MarkdownField,
  } from "@refinedev/mui";
  import { Typography, Stack } from "@mui/material";
  
  export const UsersShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
  
    const record = data?.data;
  
  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Stack direction="column" alignItems="center">
              <Typography variant="body1" fontWeight="bold">
                  {translate("id")}
              </Typography>
              <TextField value={record?.id} sx={{ margin: '0.5rem' }} />
                  <Typography variant="body1">{translate("username")}: </Typography>
                  <TextField value={record?.username} />
              
              {/* <Typography variant="body1" fontWeight="bold">
                      {translate("password")}
              </Typography> */}
              {/* <TextField value={record?.password} /> */}
              
                  <Typography variant="body1">{translate("avatar")}: </Typography>
                  <img
                      style={{ maxWidth: 200, width: "100%", height: 200 }}
                      src={record?.avatarUrl}
                  />
              
              
                  <Typography variant="body1">{translate("reputation")}: </Typography>
                  <NumberField value={record?.reputation ?? ""} />
              
              
                  <Typography variant="body1">{translate("role")}: </Typography>
                  <TextField value={record?.role} />
              
              
                  <Typography variant="body1">{translate("lastLogin")}: </Typography>
                  <DateField value={record?.lastLogin} />
              
              
                  <Typography variant="body1">{translate("email")}: </Typography>
                  <EmailField value={record?.email} />
              
              
                  <Typography variant="body1">{translate("emailVerified")}: </Typography>
                  <BooleanField value={record?.emailVerified} />
              
              
                  <Typography variant="body1">{translate("country")}: </Typography>
                  <TextField value={record?.country} />
              
              
                  <Typography variant="body1">{translate("city")}: </Typography>
                  <TextField value={record?.city} />
              
              
                  <Typography variant="body1">{translate("phone")}: </Typography>
                  <TextField value={record?.phone} />
              
              
                  <Typography variant="body1">{translate("website")}: </Typography>
                  <TextField value={record?.website} />
              
              
                  <Typography variant="body1">{translate("aboutMe")}: </Typography>
                  <MarkdownField value={record?.aboutMe} />
              
              
                  <Typography variant="body1">{translate("createdAt")}: </Typography>
                  <DateField value={record?.createdAt} />
              
              
                  <Typography variant="body1">{translate("updatedAt")}: </Typography>
                  <DateField value={record?.updatedAt} />
              
              
                  <Typography variant="body1">{translate("PostCount")}: </Typography>
                  <NumberField value={record?.PostCount ?? ""} />
              
              
                  <Typography variant="body1">{translate("CommentCount")}: </Typography>
                  <NumberField value={record?.CommentCount ?? ""} />
              
              
                  <Typography variant="body1">{translate("followersCount")}: </Typography>
                  <NumberField value={record?.followersCount ?? ""} />
              
              
                  <Typography variant="body1">{translate("followingCount")}: </Typography>
                  <NumberField value={record?.followingCount ?? ""} />
              
              
                  <Typography variant="body1">{translate("subscribedForumsCount")}: </Typography>
                  <NumberField value={record?.subscribedForumsCount ?? ""} />
              
              
                  <Typography variant="body1">{translate("ownedForumsCount")}: </Typography>
                  <NumberField value={record?.ownedForumsCount ?? ""} />
              
          </Stack>
          </Stack>
      </Show>
  )};
  
  
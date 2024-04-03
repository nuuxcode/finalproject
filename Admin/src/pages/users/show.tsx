// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const UsersShow = () => {
//   return <MuiShowInferencer />;
// };
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
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.id")}
              </Typography>
              <TextField value={record?.id} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.username")}
              </Typography>
              <TextField value={record?.username} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.password")}
              </Typography>
              <TextField value={record?.password} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.avatarUrl")}
              </Typography>
              <img
                  style={{ maxWidth: 200, width: "100%", height: 200 }}
                  src={record?.avatarUrl}
              />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.reputation")}
              </Typography>
              <NumberField value={record?.reputation ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.role")}
              </Typography>
              <TextField value={record?.role} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.lastLogin")}
              </Typography>
              <DateField value={record?.lastLogin} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.email")}
              </Typography>
              <EmailField value={record?.email} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.emailVerified")}
              </Typography>
              <BooleanField value={record?.emailVerified} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.country")}
              </Typography>
              <TextField value={record?.country} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.city")}
              </Typography>
              <TextField value={record?.city} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.phone")}
              </Typography>
              <TextField value={record?.phone} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.website")}
              </Typography>
              <TextField value={record?.website} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.aboutMe")}
              </Typography>
              <MarkdownField value={record?.aboutMe} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.createdAt")}
              </Typography>
              <DateField value={record?.createdAt} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.updatedAt")}
              </Typography>
              <DateField value={record?.updatedAt} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.PostCount")}
              </Typography>
              <NumberField value={record?.PostCount ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.CommentCount")}
              </Typography>
              <NumberField value={record?.CommentCount ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.followersCount")}
              </Typography>
              <NumberField value={record?.followersCount ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.followingCount")}
              </Typography>
              <NumberField value={record?.followingCount ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.subscribedForumsCount")}
              </Typography>
              <NumberField value={record?.subscribedForumsCount ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  {translate("users.fields.ownedForumsCount")}
              </Typography>
              <NumberField value={record?.ownedForumsCount ?? ""} />
          </Stack>
      </Show>
  );
};

import { AuthPage } from "@refinedev/mui";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: {
          email: "admin@wgt.live",
          password: "adminadmin",
        },
      }}
    />
  );
};

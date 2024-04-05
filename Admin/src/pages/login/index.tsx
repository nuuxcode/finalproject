import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          text="Admin"
          icon={<img src="./logo.png" />} collapsed={false}        />
      }
      formProps={{
        defaultValues: {
          email: "admin@wgt.live",
          password: "adminadmin",
        },
      }}
    />
  );
};

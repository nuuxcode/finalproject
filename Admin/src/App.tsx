import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  RefineThemes,
} from "@refinedev/mui";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import Dashboard from "@mui/icons-material/Dashboard";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";
import { UsersCreate, UsersEdit, UsersShow, UsersList } from "./pages/users";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import {
  CommentList,
  CommentCreate,
  CommentEdit,
  CommentShow,
} from "./pages/comments";
import { ForumList, ForumCreate, ForumEdit, ForumShow } from "./pages/forums";
import { DashboardOutlined } from "@mui/icons-material";
// import { Dashboard } from "./pages/dashboard";
// import { ReportList, ReportCreate, ReportEdit, ReportShow } from "./pages/reports";
import jsonServerDataProvider from "@refinedev/simple-rest";
import DashboardPage from "./pages/dashboard";
function App() {
  // const API_URL = "https://api.finefoods.refine.dev";
  const API_URL = "http://104.248.142.226:4000/api/v1";
  const dataProvider = jsonServerDataProvider(API_URL);
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <ThemeProvider theme={RefineThemes.YellowDark}>
              <Refine
                // dataProvider={dataProvider("http://104.248.142.226:4000/api/v1")}
                dataProvider={dataProvider}
                // dataProvider={customDataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      icon: <Dashboard />,
                    },
                  },
                  {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    show: PostShow,
                    meta: {
                      canDelete: true,
                    },
                    // showPath: (id: string) => `/posts/post/${id}`,
                  },
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "comments",
                    list: "/comments",
                    create: "/comments/create",
                    edit: "/comments/edit/:id",
                    show: "/comments/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "forums",
                    list: "/forums",
                    create: "/forums/create",
                    edit: "/forums/edit/:id",
                    show: "/forums/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  // {
                  //   name: "reports",
                  //   list: "/reports",
                  //   create: "/reports/create",
                  //   edit: "/reports/edit/:id",
                  //   show: "/reports/show/:id",
                  //   meta: {
                  //     canDelete: true,
                  //   },
                  // },
                  // {
                  //   name: "tags",
                  //   list: "/tags",
                  //   create: "/tags/create",
                  //   edit: "/tags/edit/:id",
                  //   show: "/tags/show/:id",
                  //   meta: {
                  //     canDelete: true,
                  //   },
                  // },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-routes"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="/">
                      <Route index element={<DashboardPage />} />
                    </Route>

                    <Route path="/posts">
                      <Route index element={<PostList />} />
                      <Route path="create" element={<PostCreate />} />
                      <Route path="edit/:id" element={<PostEdit />} />
                      <Route path="show/:id" element={<PostShow />} />
                    </Route>
                    <Route path="/users">
                      <Route index element={<UsersList />} />
                      <Route path="create" element={<UsersCreate />} />
                      <Route path="edit/:id" element={<UsersEdit />} />
                      <Route path="show/:id" element={<UsersShow />} />
                    </Route>
                    {/* <Route path="/reports">
                    <Route index element={< ReportList />} />
                    <Route path="create" element={< ReportCreate />} />
                    <Route path="edit/:id" element={< ReportEdit />} />
                    <Route path="show/:id" element={< ReportShow />} />
                  </Route> */}

                    <Route path="/comments">
                      <Route index element={<CommentList />} />
                      <Route path="create" element={<CommentCreate />} />
                      <Route path="edit/:id" element={<CommentEdit />} />
                      <Route path="post/:id" element={<CommentShow />} />
                    </Route>
                    <Route path="/forums">
                      <Route index element={<ForumList />} />
                      <Route path="create" element={<ForumCreate />} />
                      <Route path="edit/:id" element={<ForumEdit />} />
                      <Route path="show/:id" element={<ForumShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </ThemeProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

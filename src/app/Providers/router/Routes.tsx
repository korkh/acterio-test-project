import App from "app/App";
import { ErrorPage, NotFoundPage } from "pages/ErrorsPages";
import LoginPage from "pages/LoginPage/ui/LoginPage";
import PostDetailsPage from "pages/PostsPage/ui/PostDetailsPage/PostDetailsPage";


import SignUpPage from "pages/SignUpPage/ui/SignUpPage";

import { Navigate, createBrowserRouter } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import PostPage from "pages/PostsPage/ui/PostPage/PostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // authenticated routes
      {
        element: <RequireAuth />,
        children: [{ path: "profile", element: <ProfilePage /> }],
      },
      { path: "posts", element: <PostPage /> },
      { path: "posts/:id", element: <PostDetailsPage /> },
      { path: "server-error", element: <ErrorPage /> },
      { path: "not-found", element: <NotFoundPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signUp", element: <SignUpPage /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);

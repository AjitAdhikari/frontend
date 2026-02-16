import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy, Suspense } from "react";
import Error from "./common/error";
import Loading from "./common/loading";
import NotFound from "./common/not-found";
import { AuthProvider } from "./context/authcontext";
import AuthLayout from "./layout/authlayout";
import AdminProtectedRoute from "./routes/adminProtected.route";
import GlobalProtectedRoute from "./routes/globalProtected.route";
import PublicRoute from "./routes/public.route";
import { assignmentRoutes, caregiverRoutes, consumerRoutes, insuranceProviderRoutes, locationRoutes, reportRoutes, userRoutes, workLogRoutes } from "./routes/routes";

const LoginForm = lazy(() => import("./auth/login"));
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const ForgetPassword = lazy(() => import("./auth/forgetPassword"));
const ResetPassword = lazy(() => import("./auth/resetPassword"));

const withSuspense = (Component: any) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const authRoutes: any[] = [
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: withSuspense(LoginForm),
      },
      {
        path: "/forget-password",
        element: withSuspense(ForgetPassword),
      },
    ],
  },
  {
    element: <NotFound />,
    path: "*",
  },
];

const adminOnlyRoutes: any[] = [
  {
    element: <AdminProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: withSuspense(Dashboard),
      },
      ...userRoutes,
      ...locationRoutes,
      ...caregiverRoutes,
      ...insuranceProviderRoutes,
      ...workLogRoutes,
      ...consumerRoutes,
      ...assignmentRoutes,
      ...reportRoutes
    ],
  },
];

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <GlobalProtectedRoute />
      </AuthProvider>
    ),
    errorElement: <Error />,
    children: adminOnlyRoutes,
  },
  {
    element: (
      <AuthProvider>
        <PublicRoute />
      </AuthProvider>
    ),
    errorElement: <Error />,
    children: authRoutes,
  },
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/reset-password",
        element: withSuspense(ResetPassword),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

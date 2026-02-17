import Loading from "@/common/loading";
import path from "path";

// import path from "path";
import { lazy, Suspense } from "react";

const ChangePassword = lazy(() => import("@/auth/changePassword"));
const CreateUser = lazy(() => import("@/pages/users/create"));
const UpdateUser = lazy(() => import("@/pages/users/update"));
const ReadUser = lazy(() => import("@/pages/users/read"));
const Users = lazy(() => import("@/pages/users/users"));
// const Location = lazy(() => import("@/pages/location/location"));
// const UpdateLocation = lazy(() => import("@/pages/location/update"));
// const CreateLocation = lazy(() => import("@/pages/location/create"));
// const LocationDetail = lazy(() => import("@/pages/location/read"));
const Caregivers = lazy(() => import("@/pages/caregivers/caregivers"));
const CityManagement = lazy(() => import("@/pages/city-management/city-management"));


const WorkLogs = lazy(() => import("@/pages/work-log/work-log"));
const CreateWorkLog = lazy(() => import("@/pages/work-log/create"));
const UpdateWorkLog = lazy(() => import("@/pages/work-log/update"));
const ReadWorkLog = lazy(() => import("@/pages/work-log/read"));

const Consumers = lazy(() => import("@/pages/consumers/consumer"));



const Report = lazy(() => import("@/pages/reports/report"));

const withSuspense = (Component: any) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const userRoutes = [
  {
    path: "/users",
    element: withSuspense(Users),
  },
  {
    path: "/users/create",
    element: withSuspense(CreateUser),
  },
  {
    path: "/users/update/:id",
    element: withSuspense(UpdateUser),
  },
  {
    path: "/users/read/:id",
    element: withSuspense(ReadUser),
  },
  {
    path: "/changePassword",
    element: withSuspense(ChangePassword),
  },
];

// export const locationRoutes = [
//   {
//     path: "/location",
//     element: withSuspense(Location),
//   },
//   {
//     path: "/location/create",
//     element: withSuspense(CreateLocation),
//   },
//   {
//     path: "/location/update/:id",
//     element: withSuspense(UpdateLocation),
//   },
//   {
//     path: "/location/read/:id",
//     element: withSuspense(LocationDetail),
//   },
// ];

export const caregiverRoutes = [
  {
    path: "/caregivers",
    element: withSuspense(Caregivers),
  },
  // {
  //   path: "/caregivers/create",
  //   element: withSuspense(CreateCaregiver),
  // },
  // {
  //   path: "/caregivers/update/:id",
  //   element: withSuspense(UpdateCaregiver),
  // },
  // {
  //   path: "/caregivers/read/:id",
  //   element: withSuspense(ReadCaregiver),
  // },
];


export const workLogRoutes = [
  {
    path: "work-log",
    element: withSuspense(WorkLogs),
  },
  {
    path: "/work-log/create",
    element: withSuspense(CreateWorkLog),
  },
  {
    path: "/work-log/update/:id",
    element: withSuspense(UpdateWorkLog),
  },
  {
    path: "/work-log/read/:id",
    element: withSuspense(ReadWorkLog),
  },
];
export const consumerRoutes = [
  {
    path: "/consumers",
    element: withSuspense(Consumers),
  },
  // {
  //   path: "/consumers/create",
  //   element: withSuspense(CreateConsumer),
  // },
  // {
  //   path: "/consumers/update/:id",
  //   element: withSuspense(UpdateConsumer),
  // },
  // {
  //   path: "/consumers/read/:id",
  //   element: withSuspense(ReadConsumer),
  // },
];

export const cityManagementRoutes = [
  {
    path: "/city-management",
    element: withSuspense(CityManagement),
  },
  // {
  //   path: "/city-management/edit/:id",
  //   element: withSuspense(EditCity),
  // },
];

export const reportRoutes = [
  {
    path: "/report",
    element: withSuspense(Report),
  },
];

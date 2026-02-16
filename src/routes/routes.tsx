import Loading from "@/common/loading";

// import path from "path";
import { lazy, Suspense } from "react";

const ChangePassword = lazy(() => import("@/auth/changePassword"));
const CreateUser = lazy(() => import("@/pages/users/create"));
const UpdateUser = lazy(() => import("@/pages/users/update"));
const ReadUser = lazy(() => import("@/pages/users/read"));
const Users = lazy(() => import("@/pages/users/users"));
const Location = lazy(() => import("@/pages/location/location"));
const UpdateLocation = lazy(() => import("@/pages/location/update"));
const CreateLocation = lazy(() => import("@/pages/location/create"));
const LocationDetail = lazy(() => import("@/pages/location/read"));
const Caregivers = lazy(() => import("@/pages/caregivers/caregivers"));
const CreateCaregiver = lazy(() => import("@/pages/caregivers/create"));
const UpdateCaregiver = lazy(() => import("@/pages/caregivers/update"));
const ReadCaregiver = lazy(() => import("@/pages/caregivers/read"));

const InsuranceProviderList = lazy(
  () => import("@/pages/insurance_provider/insurance_provider"),
);
const CreateInsuranceProvider = lazy(
  () => import("@/pages/insurance_provider/create"),
);
const UpdateInsuranceProvider = lazy(
  () => import("@/pages/insurance_provider/update"),
);
const ReadInsuranceProvider = lazy(
  () => import("@/pages/insurance_provider/read"),
);

const WorkLogs = lazy(() => import("@/pages/work-log/work-log"));
const CreateWorkLog = lazy(() => import("@/pages/work-log/create"));
const UpdateWorkLog = lazy(() => import("@/pages/work-log/update"));
const ReadWorkLog = lazy(() => import("@/pages/work-log/read"));

const Consumers = lazy(() => import("@/pages/consumers/consumer"));
// const CreateConsumer = lazy(() => import("@/pages/consumers/create"));
// const UpdateConsumer = lazy(() => import("@/pages/consumers/update"));
// const ReadConsumer = lazy(() => import("@/pages/consumers/read"));

const Assignments = lazy(() => import("@/pages/assignment/assignment"));
const CreateAssignment = lazy(() => import("@/pages/assignment/create"));
const UpdateAssignment = lazy(() => import("@/pages/assignment/update"));
const ReadAssignment = lazy(() => import("@/pages/assignment/read"));

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

export const locationRoutes = [
  {
    path: "/location",
    element: withSuspense(Location),
  },
  {
    path: "/location/create",
    element: withSuspense(CreateLocation),
  },
  {
    path: "/location/update/:id",
    element: withSuspense(UpdateLocation),
  },
  {
    path: "/location/read/:id",
    element: withSuspense(LocationDetail),
  },
];

export const caregiverRoutes = [
  {
    path: "/caregivers",
    element: withSuspense(Caregivers),
  },
  {
    path: "/caregivers/create",
    element: withSuspense(CreateCaregiver),
  },
  {
    path: "/caregivers/update/:id",
    element: withSuspense(UpdateCaregiver),
  },
  {
    path: "/caregivers/read/:id",
    element: withSuspense(ReadCaregiver),
  },
];

export const insuranceProviderRoutes = [
  {
    path: "/insurance-providers",
    element: withSuspense(InsuranceProviderList),
  },
  {
    path: "/insurance-providers/create",
    element: withSuspense(CreateInsuranceProvider),
  },
  {
    path: "/insurance-providers/update/:id",
    element: withSuspense(UpdateInsuranceProvider),
  },
  {
    path: "/insurance-providers/read/:id",
    element: withSuspense(ReadInsuranceProvider),
  },
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
export const assignmentRoutes = [
  {
    path: "/assignments",
    element: withSuspense(Assignments),
  },
  {
    path: "/assignments/create",
    element: withSuspense(CreateAssignment),
  },
  {
    path: "/assignments/update/:id",
    element: withSuspense(UpdateAssignment),
  },
  {
    path: "/assignments/read/:id",
    element: withSuspense(ReadAssignment),
  },
];

export const reportRoutes = [
  {
    path: "/report",
    element: withSuspense(Report),
  },
];

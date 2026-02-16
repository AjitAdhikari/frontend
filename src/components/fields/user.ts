import { Role, Status } from "@/enum/enum";

export const userFields = [
   {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { value: Role.CITYADMIN, label: "CityAdmin" },
      { value: Role.SUPERADMIN, label: "Superadmin" },
    ],
    defaultValue: Role.USER, // Default to USER role
  },
  {
    name: "locationId",
    label: "Location",
    type: "select",
    options: [],
    required: false,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    name: "image",
    label: "Image",
    type: "file",
    hint: "Upload a profile picture of 1080x1080 px for best quality.",
  },
 
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: Status.ACTIVE, label: "Active" },
      { value: Status.INACTIVE, label: "Inactive" },
    ],
    defaultValue: Status.ACTIVE, 
  },
];

export const userField = [
   {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { value: Role.CITYADMIN, label: "CityAdmin" },
      { value: Role.SUPERADMIN, label: "Superadmin" },
    ],
    disable: true
  },
  {
    name: "locationId",
    label: "Location",
    type: "select",
    options: [], // Options to be populated dynamically
    required: true,
    disable: true,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
 
   {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: Status.ACTIVE, label: "Active" },
      { value: Status.INACTIVE, label: "Inactive" },
    ],
  },
];

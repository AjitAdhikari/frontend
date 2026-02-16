import { Status } from "@/enum/enum";

export const consumerFields = [

  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "locationId",
    label: "Location",
    type: "select",
    options: [],
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "ssn",
    label: "SSN",
    type: "text",
    required: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
  },
  {
    name: "zip_code",
    label: "Zip Code",
    type: "text",
    required: true,
  },
  {
    name: "home_address",
    label: "Home Address",
    type: "text",
    required: true,
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
  {
    name: "insurances",
    label: "Insurance Details",
    type: "objectlist",
    fields: [
      {
        key: "insuranceId",
        label: "Insurance Provider",
        placeholder: "Insurance Provider",
        type: "select",
        options: []
      },
      {
        key: "hours_allocated",
        label: "Hours Allocated",
          placeholder: "Hours Allocated",
        type: "number",
      },
      {
        key: "period_start",
        label: "Start Period",
          placeholder: "Start Period",
        type: "date",
      },
      {
        key: "period_end",
        label: "End Period",
        placeholder: "End Period",  
        type: "date"
      },
      {
        key: "status",
        label: "Status",
        placeholder: "Status",
        type:"select",
        options: [
          { value: Status.ACTIVE, label: "Active" },
          { value: Status.INACTIVE, label: "Inactive" },
        ],
        defaultValue: Status.ACTIVE,

      }
    ],
  },
   {
    name: "document",
    label: "Documents",
    type: "file",
    hint: "Upload your document.",
  },

];

export const consumerField = [
  {
    name: "ssn",
    label: "SSN",
    type: "text",
    required: true,
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    disable: true,
  },

  {
    name: "locationId",
    label: "Location",
    type: "select",
    options: [],
    required: true,
    disable: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
  },
  {
    name: "zip_code",
    label: "Zip Code",
    type: "text",
    required: true,
  },
  {
    name: "home_address",
    label: "Home Address",
    type: "text",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    defaultValue: "active",
  },
   {
    name: "insurances",
    label: "Insurance Details",
    type: "objectlist",
    fields: [
      {
        key: "insuranceId",
        label: "Insurance Provider",
        placeholder: "Insurance Provider",
        type: "select",
        options: []
      },
      {
        key: "hours_allocated",
        label: "Hours Allocated",
          placeholder: "Hours Allocated",
        type: "number",
      },
      {
        key: "period_start",
        label: "Start Period",
        placeholder: "Start Period",
        type: "date",
      },
      {
        key: "period_end",
        label: "End Period",
        placeholder: "End Period",  
        type: "date"
      },
      {
        key: "status",
        label: "Status",
        placeholder: "Status",
        type:"select",
        options: [
          { value: Status.ACTIVE, label: "Active" },
          { value: Status.INACTIVE, label: "Inactive" },
        ],
        defaultValue: Status.ACTIVE,

      }
    ],
  }
  
];
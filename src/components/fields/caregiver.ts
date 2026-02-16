export const caregiverFields = [
	{
		name: "locationId",
		label: "Location",
		type: "select",
		options: [],
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
		name: "certification",
		label: "Certification",
		type: "text",
		required: false,
	},
	{
		name: "status",
		label: "Status",
		type: "select",
		options: [
			{ value: "active", label: "Active" },
			{ value: "inactive", label: "Inactive" },
		],
		required: true,
		defaultValue: "",
	},
];

export const caregiverField = [
	{
		name: "locationId",
		label: "Location",
		type: "select",
		options: [],
		required: true,
		disable: true,
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
		name: "certification",
		label: "Certification",
		type: "text",
		required: false,
	},
	{
		name: "status",
		label: "Status",
		type: "select",
		options: [
			{ value: "active", label: "Active" },
			{ value: "inactive", label: "Inactive" },
		],
		required: true,
		defaultValue: "",
	},
];

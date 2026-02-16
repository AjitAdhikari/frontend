import { DeleteModal } from "@/components/model/delete";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { queryKey } from "@/lib/types/query-keys";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

export type ColumnType = {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  status: string;
  email: string;
  phone_number: string;
  city: string;
  home_address: string;
  insurance_provider: string;
  location: { name: string, state: string, city: string };
  authorizedHours: [{
    hours_allocated: number,
    id: string,
    insurance: {
          id: string,
          name: string
    }
  }];
  document?: {
    file: '';
    fileType: '';
  };
};

export const consumerColumns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }) => {
      const consumer = row.original;
      return (
        <Link to={`/consumers/read/${consumer?.id}`} className="text-primary">
          {`${consumer?.first_name} ${consumer?.last_name}` || "N/A"}
        </Link>
      );
    },
  },
    {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const consumer = row.original;
      return <span>{consumer?.email || "N/A"}</span>;
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => {
      const consumer = row.original;
      return <span>{consumer?.phone_number || "N/A"}</span>;
    },
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => {
      const consumer = row.original;
      return <span>{new Date(consumer?.dob).toLocaleDateString() || "N/A"}</span>;
    },
  },
 
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const consumer = row.original;
      return <span>{consumer?.location?.state  +"-"+ consumer?.location?.city || "N/A"}</span>;
    },
  },


  {
    accessorKey: "insurance_provider",
    header: "Insurance Provider",
    cell: ({ row }) => {
      const consumer = row.original;
      return <span>
    <ul className="text-sm">
  {consumer?.authorizedHours?.map((h) => (
    <li key={h.id}>
      {h.insurance?.name} — {h.hours_allocated} hrs
    </li>
  )) || <li>—</li>
  }
</ul>
      </span>
    },
  },
  {
    accessorKey: "authorized_hours",
    header: "Authorized Hours",
    cell: ({ row }) => {
      const consumer = row.original;
      const totalAuthorizedHours =
        consumer?.authorizedHours?.reduce(
         (sum, item) => sum + (item.hours_allocated || 0),
    0
  ) || 0;

return <span>{totalAuthorizedHours}</span>;
    },
  },
   {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;
      const getStatusBadge = (status: string) => {
        switch (status) {
          case 'active':
            return <Badge variant="default">ACTIVE</Badge>;
          default:
            return <Badge variant="destructive">{status.toUpperCase()}</Badge>;
        }
      };
      return getStatusBadge(item.status);
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const consumer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <div className="space-y-1 w-full ">
              <Link
                to={`/consumers/update/${consumer.id}`}
                className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm"
              >
                <Edit className="h-4 w-4" /> Update
              </Link>

              <div className="flex gap-2 capitalize">
                <DeleteModal
                  path={`${queryKey.CONSUMER}/${consumer.id}`}
                  Key={queryKey.CONSUMER}
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
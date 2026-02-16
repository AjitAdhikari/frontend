import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { DeleteModal } from "@/components/model/delete";
import { queryKey } from "@/lib/types/query-keys";
import { Badge } from "../ui/badge";

export type CaregiverColumnType = {
  id: string;
  first_name: string;
  last_name: string;
  certification?: string;
  status: string;
  location?: { id: string; name: string, state: string, city: string };
};

export const caregiverColumns: ColumnDef<CaregiverColumnType>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => {
      const caregiver = row.original;
      return (
        <Link to={`/caregivers/read/${caregiver?.id}`} className="text-primary">
          {caregiver?.first_name  +' '+ caregiver?.last_name|| "N/A"}
        </Link>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
    {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const caregiver = row.original;
      return <span>{caregiver?.location?.state  +"-"+ caregiver?.location?.city || "N/A"}</span>;
    },
  },
  {
    accessorKey: "certification",
    header: "Certification",
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
      const caregiver = row.original;
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
                to={`/caregivers/update/${caregiver.id}`}
                className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm"
              >
                <Edit className="h-4 w-4" /> Update
              </Link>
              <div className="flex gap-2 capitalize">
                <DeleteModal path={`${queryKey.CAREGIVER}/${caregiver.id}`} Key={queryKey.CAREGIVER} />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

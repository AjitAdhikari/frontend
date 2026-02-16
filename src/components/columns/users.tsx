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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnType = {
  id: string;
  name: string;
  password: string;
  email: string;
  status: string;
  location: { name: string, state: string, city: string};
};

export const userColumns: ColumnDef<ColumnType>[] = [

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link to={`/users/read/${user?.id}`} className="text-primary">
          {user?.name || "N/A"}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const user = row.original;
      return <span>{(user?.location?.state) ? user?.location?.state+" - " + user?.location?.city : "N/A"}</span>;
    }
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
      const user = row.original;

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
                to={`/users/update/${user.id}`}
                className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm"
              >
                <Edit className="h-4 w-4" /> Update
              </Link>

              <div className="flex gap-2 capitalize">
                <DeleteModal path={`${queryKey.USERS}/${user.id}`} Key={queryKey.USERS} />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

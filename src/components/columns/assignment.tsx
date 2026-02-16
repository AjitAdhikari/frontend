import { DeleteModal } from "@/components/model/delete";
import { Badge } from "@/components/ui/badge";
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
import { AssignmentStatus } from "@/enum/enum";

export type AssignmentColumnType = {
  id: string;
  status: string;
  consumer: {
    id: string;
    first_name: string;
    last_name: string;
  };
  caregiver: {
    id: string;
    first_name: string;
    last_name: string;
  };
  start_date: string;
  end_date: string;
};

export const assignmentColumns: ColumnDef<AssignmentColumnType>[] = [
  {
    accessorKey: "consumer",
    header: "Consumer",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <Link to={`/consumers/read/${assignment?.consumer?.id}`} className="text-primary">
          {`${assignment?.consumer?.first_name} ${assignment?.consumer?.last_name}` || "N/A"}
        </Link>
      );
    },
  },
  {
    accessorKey: "caregiver",
    header: "Caregiver",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <Link to={`/caregivers/read/${assignment?.caregiver?.id}`} className="text-primary">
          {`${assignment?.caregiver?.first_name} ${assignment?.caregiver?.last_name}` || "N/A"}
        </Link>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const assignment = row.original;
      return <span>{new Date(assignment?.start_date).toLocaleDateString() || "N/A"}</span>;
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const assignment = row.original;
      return <span>{assignment?.end_date ? new Date(assignment?.end_date).toLocaleDateString() : "N/A"}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const assignment = row.original;
      const getStatusBadge = (status: string) => {
        switch (status) {
          case AssignmentStatus.PENDING:
            return <Badge variant="secondary">{AssignmentStatus.PENDING.toUpperCase()}</Badge>;
          case AssignmentStatus.INACTIVE:
            return <Badge variant="destructive">{AssignmentStatus.INACTIVE.toUpperCase()}</Badge>;
          default:
            return <Badge variant="default">{status.toUpperCase()}</Badge>;
        }
      };
      return getStatusBadge(assignment.status);
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const assignment = row.original;

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
                to={`/assignments/update/${assignment.id}`}
                className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm"
              >
                <Edit className="h-4 w-4" /> Update
              </Link>

              <div className="flex gap-2 capitalize">
                <DeleteModal
                  path={`${queryKey.ASSIGNMENT}/${assignment.id}`}
                  Key={queryKey.ASSIGNMENT}
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
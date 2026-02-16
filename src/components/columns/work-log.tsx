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
import { formatDateIntoYMDFormat } from "@/lib/utils/date-format";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnType = {
  id: string;
  name: string;
  address: string;
  contact_info: string;
  verification_status: string;
  caregiver: any,
  insurance: any,
  consumer: any,
  date: string;
};

export const workLogColumns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "caregiver",
    header: "Caregiver",
    cell: ({ row }) => {
      const caregiver = row.original.caregiver;
      return (
        <Link to={`/caregivers/read/${caregiver.id}`} className="text-primary">
          {`${caregiver.first_name +' '+caregiver.last_name}` || "N/A"}
        </Link>
      );
    },
  },
  {
    accessorKey: "consumer",
    header: "Consumer",
    cell: ({ row }) => {
      const consumer = row.original.consumer;
      return (
        <Link to={`/consumers/read/${consumer.id}`} className="text-primary">
           {`${consumer.first_name +' '+consumer.last_name}` || "N/A"}
        </Link>
      );
    },
  },
    {
    accessorKey: "insurance",
    header: "Insurance",
    cell: ({ row }) => {
      const insurance = row.original.insurance;
      return (
        <Link to={`/insurance-providers/read/${insurance.id}`} className="text-primary">
          {insurance.name || "N/A"}
        </Link>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row})=>{
      const item = row.original;
      return (
        <>
        {formatDateIntoYMDFormat(item.date)}
        </>
      )
    },
  },
  {
    accessorKey: "hours_worked",
    header: "Hours Worked",
  },
  {
    accessorKey: "verification_status",
    header: "Status",
     cell: ({ row }) => {
      const item = row.original;
      const getStatusBadge = (verification_status: string) => {
        switch (verification_status) {
          case 'completed':
            return <Badge variant="default">COMPLETED</Badge>;
          default:
            return <Badge variant="destructive">{verification_status.toUpperCase()}</Badge>;
        }
      };
      return getStatusBadge(item.verification_status);
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const worklog = row.original;

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
                to={`/work-log/update/${worklog.id}`}
                className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm"
              >
                <Edit className="h-4 w-4" /> Update
              </Link>

              <div className="flex gap-2 capitalize">
                <DeleteModal
                  path={`${queryKey.WORK_LOG}/${worklog.id}`}
                  Key={queryKey.WORK_LOG}
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

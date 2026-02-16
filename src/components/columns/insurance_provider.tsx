import { DeleteModal } from "@/components/model/delete";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { queryKey } from "@/lib/types/query-keys";
// import type { InsuranceProvider } from "@/insurance_provider";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export type ColumnType = {
  id: string;
  name: string;
  contact_info: string;
  billing_code: string;
  plan_type: string;
  location?: { name: string; state: string; city: string }; 
};


export const insuranceProviderColumns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const provider = row.original;
      return (
        <Link to={`/insurance-providers/read/${provider?.id}`} className="text-primary">
          {provider?.name || "N/A"}
        </Link>
      );
    },
  },
  {
    accessorKey: "billing_code",
    header: "Billing Code",
  },
  {
    accessorKey: "contact_info",
    header: "Contact Info",
  },
  {
    accessorKey: "plan_type",
    header: "Plan Type",
    cell: ({ getValue }) => <span>{(getValue() as string) || "N/A"}</span>,
  },
    {
    accessorKey: "location",
    header: "Location",
    cell: ({ getValue }) => {
      const loc = getValue() as { state: string; city: string } | undefined;
      return loc ? `${loc.state} - ${loc.city}` : "N/A";
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const provider = row.original;
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
                to={`/insurance-providers/update/${provider.id}`}
                className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm"
              >
                <Edit className="h-4 w-4" /> Update
              </Link>
              <div className="flex gap-2 capitalize">
                <DeleteModal path={`${queryKey.INSURANCE_PROVIDER}/${provider.id}`} Key={queryKey.INSURANCE_PROVIDER} />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

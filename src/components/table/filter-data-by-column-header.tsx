import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Column, Table } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  table: Table<TData>;
  title: string;
  options: string[];
  placeholder?: string;
}

export function FilterDataByColumnHeader<TData, TValue>({
  column,
  title,
  className,
  options,
  placeholder,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [searchParam, setSearchParams] = useSearchParams();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center justify-center space-x-2 ", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button
            variant="default"
            size="sm"
            className="-ml-3 h-8 capitalize  "
          >
            <span className="capitalize">{placeholder || title}</span>
            <ArrowDownUp className="ml-2 h-4 w-4" />
            
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="max-h-[50vh] overflow-y-auto"
        >
          {options?.map((option) => {
            return (
              <DropdownMenuItem
                key={option}
                onClick={() => {
                  searchParam.set(title, option);
                  setSearchParams(searchParam);
                }}
                className="capitalize"
              >
                {option}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

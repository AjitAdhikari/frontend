import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface DataTableProps {
  columns: ColumnDef<any>[];
  data: any[];
  createPath: string;
  titleLink?: string;
  sortingName?: any;
  pageSize?: number; // Optional prop to set default page size
  dialogTitle?: string;
  dialogDescription?: string;
  searchHide?: boolean; // Optional prop to hide the search input
  paginationHide?: boolean; // Optional prop to hide the search input
}

export function DataTable({
  searchHide = false,
  columns,
  data,
  createPath,
  sortingName,
  pageSize, // Default page size
  paginationHide = false, // Optional prop to hide pagination
}: DataTableProps) {
  const [sorting, setSorting] = useState([
    {
      id: sortingName,
      desc: true,
    },
  ]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize || 10, // Use the provided page size or default to 10
    // default page size
  });

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, value): boolean => {
      // Custom filter function to handle nested objects
      if (!value) return true;

      const search = String(value).toLowerCase();

      // Function to recursively search through nested objects
      const searchInValue = (val: any): boolean => {
        if (val === null || val === undefined) return false;

        if (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean"
        ) {
          return String(val).toLowerCase().includes(search);
        }

        if (typeof val === "object" && !Array.isArray(val)) {
          return Object.values(val).some(searchInValue);
        }

        if (Array.isArray(val)) {
          return val.some(searchInValue);
        }

        return false;
      };

      // Search through the entire row original data
      return searchInValue(row.original);
    },

    onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleGlobalFilterChange = (event: any) => {
    setGlobalFilter(event.target.value);
    table.setGlobalFilter(event.target.value);
  };

  return (
    <div className="w-full space-y-1">
      <div
        className={`flex items-center py-2 w-full gap-4 ${
          searchHide ? "hidden" : ""
        }`}
      >
        <div className="w-full flex justify-between items-baseline">
          <Input
            placeholder="Filter data..."
            value={globalFilter ?? ""}
            onChange={handleGlobalFilterChange}
            className={`max-w-sm ${searchHide ? "hidden" : ""} `}
          />
          <Link to={createPath} className={`${createPath ? "" : "hidden"}`}>
            <Button size="sm" className="cursor-pointer">Create</Button>
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto capitalize" size="sm">
              <Settings2 />
              views
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="uppercase"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="bg-primary text-primary-foreground "
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={`flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700 ${
          paginationHide ? "hidden" : ""
        }`}
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Users per page</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAnglesLeft />
          </button>
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleLeft />
          </button>
          <span>
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FaAngleRight />
          </button>
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <FaAnglesRight />
          </button>
        </div>
      </div>
    </div>
  );
}

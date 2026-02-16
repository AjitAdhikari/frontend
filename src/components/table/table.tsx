import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
// import { CSVLink } from "react-csv";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useReactToPrint } from "react-to-print";
import { Printer, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// import { CreateVehicleDialog } from "@/dialog/vehicle/create";
import { useAuth } from "@/context/authcontext";
import { Role } from "@/enum/enum";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps {
  columns: ColumnDef<any>[];
  data: any[];
  createPath: string;
  createLabel?: string; // Optional label for create button
  titleLink?: string;
  showExport?: boolean;
  sortingName?: any;
  heads?: any[];
  tableHeading?: string;
  refetch?: () => Promise<any>;
  meta?: TQueryMeta;
  pageSize?: number; // Optional prop to set default page size
  dialogTitle?: string;
  dialogDescription?: string;
  searchOnlyHide?: boolean; // Optional prop to hide the search input
  searchHide?: boolean; // Optional prop to hide the search input
  paginationHide?: boolean; // Optional prop to hide the search input
  message? : string;
}

export type TQueryMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export function DataTables({
  searchHide = false,
  searchOnlyHide = false,
  columns,
  data,
  createPath,
  createLabel = "Create", 
  sortingName,
  meta,
  // heads,
  message,
  showExport,
  tableHeading = "Data Table",
}: // pageSize,
// dialogTitle,
// dialogDescription,
// refetch,
// paginationHide = false,
DataTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const { user } = useAuth();

  const [sorting, setSorting] = useState([
    {
      id: sortingName,
      desc: true,
    },
  ]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );

  const tableRef = useRef<HTMLDivElement>(null);

  // const handlePrint = useReactToPrint({
  //   contentRef: tableRef,
  // });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: meta?.take || 10, // Use the provided page size or default to 10
    // default page size
  });

  const [rowSelection, setRowSelection] = useState({});

  // Debounced search function
  const debounceDelay = 500; // 500ms delay

  const debouncedUpdateSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setGlobalFilter(value);

          // Update URL search params
          const newSearchParams = new URLSearchParams(searchParams);
          if (value) {
            newSearchParams.set("search", value);
          } else {
            newSearchParams.delete("search");
          }
          setSearchParams(newSearchParams);
        }, debounceDelay);
      };
    })(),
    [searchParams, setSearchParams]
  );

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedUpdateSearch(value);
  };

  // Initialize global filter from URL params on component mount
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setGlobalFilter(searchParam);
      setInputValue(searchParam);
    }
  }, [searchParams]);

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

  // const filteredData = data?.map((item) => {
  //   const {
  //     // @ts-ignore
  //     // updatedAt,
  //     // @ts-ignore
  //     // createdAt
  //     // @ts-ignore,
  //     deletedAt,
  //     // @ts-ignore
  //     id,
  //     // @ts-ignore
  //     address,
  //     // @ts-ignore
  //     organization,
  //     // @ts-ignore
  //     donor,
  //     // @ts-ignore
  //     donation,

  //     ...rest
  //   } = item;
  //   return rest;
  // });

  return (
    <div className="w-full">
      <div
        className={`flex items-center w-full gap-4 ${
          searchHide ? "hidden" : ""
        }`}
      >
        <div
          className={`w-full flex py-2 items-end ${
            searchOnlyHide ? "justify-end" : " justify-between "
          }`}
        >
          <Input
            placeholder="Filter data..."
            value={inputValue}
            onChange={handleInputChange}
            className={`max-w-sm ${searchHide ? "hidden" : ""} ${
              searchOnlyHide ? "hidden" : ""
            }`}
          />
          {/* <Button variant="outline">Export</Button> */}
          <div className="flex items-center gap-2">
            <label className="text-sm">{message}</label>
            {showExport && (
              <div className="flex items-center gap-2">
                <Button
                  // onClick={handlePrint}
                  variant="outline"
                  size="sm"
                  className="flex h-8 items-center gap-2"
                >
                  <Printer className="size-4" /> Print
                </Button>
                {/* <CSVLink
                  data={filteredData}
                  headers={heads}
                  filename={"data.csv"}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "flex h-8 items-center gap-2"
                  )}
                >
                  <Download className="size-4" /> Export
                </CSVLink> */}
              </div>
            )}

            {(user?.role === Role.CITYADMIN || user?.role === Role.SUPERADMIN) && (
              <Link to={createPath} className={`${createPath ? "" : "hidden"}`}>
                <Button size="sm" variant="outline">
                  {createLabel}
                </Button>
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="capitalize">
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
        </div>
      </div>
      <div className="rounded-md border" ref={tableRef}>
        <div className="hidden print:block text-primary text-center py-4 font-bold text-lg">
          <h2>{tableHeading}</h2>
          <span>Table Export - {new Date().toLocaleDateString()}</span>
        </div>
        <Table className="">
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="bg-primary text-primary-foreground text-center max-w-[200px] place-items-center">
                  S.N
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="bg-primary text-primary-foreground max-w-[200px] text-center
                      "
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell className="text-center font-medium">
                    {meta
                      ? (meta.page - 1) * meta.take + index + 1
                      : row.index + 1}
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="overflow-hidden text-ellipsis whitespace-nowrap  h-10 place-items-center "
                    >
                      <div className=" truncate max-w-[200px] overflow-hidden text-ellipsis">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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
      <DataTablePagination table={table} meta={meta} />
    </div>
  );
}

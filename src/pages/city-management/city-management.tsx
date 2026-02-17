import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { City } from "@/schemas/city";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const cityFormSchema = z.object({
  state: z.string().min(1, "State is required"),
  cityName: z.string().min(1, "City name is required"),
  active: z.boolean().default(true),
});

type CityFormData = z.infer<typeof cityFormSchema>;

const STATES = [
  "Ohio",
  "Pennsylvania",
  "New York",
  "California",
  "Texas",
  "Florida",
  "Illinois",
  "Georgia",
];

// Mock data - replace with API call
const MOCK_CITIES: City[] = [
  { id: "1", cityName: "Cincinnati", state: "Ohio", active: true },
  { id: "2", cityName: "Columbus", state: "Ohio", active: true },
  { id: "3", cityName: "Akron", state: "Ohio", active: true },
  { id: "4", cityName: "Scranton", state: "Pennsylvania", active: true },
  { id: "5", cityName: "Pitsburg", state: "Pennsylvania", active: true },
];

export default function CityManagement() {
  const [cities, setCities] = useState<City[]>(MOCK_CITIES);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm<CityFormData>({
    resolver: zodResolver(cityFormSchema) as any,
    defaultValues: {
      state: "",
      cityName: "",
      active: true,
    },
  });

  const handleEdit = (city: City) => {
    setEditingCity(city);
    form.reset({
      state: city.state,
      cityName: city.cityName,
      active: city.active,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      setCities(cities.filter((city) => city.id !== deleteId));
      setDeleteId(null);
    }
  };

  const onSubmit = (data: CityFormData) => {
    if (editingCity) {
      // Update existing city
      setCities(
        cities.map((city) =>
          city.id === editingCity.id
            ? { ...city, ...data }
            : city
        )
      );
    }
    setIsEditDialogOpen(false);
    form.reset();
    setEditingCity(null);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    form.reset();
    setEditingCity(null);
  };

  return (
    <div className="absolute top-16 inset-x-0 bottom-0 flex flex-col bg-white z-10">
      {/* Breadcrumb and Header Section */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
        {/* Breadcrumb */}
        {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-4"> */}
        {/* <span className="hover:text-gray-700 cursor-pointer">🏠</span> */}
        {/* <span>/</span> */}
        {/* <span className="hover:text-gray-700 cursor-pointer">Dashboard</span> */}
        {/* <span>/</span> */}
        {/* <span className="text-gray-900 font-medium">City Management</span> */}
        {/* </div> */}

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          City Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage cities for geographic data isolation
        </p>
      </div>

      {/* Main Content - Full Page Table */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Table Section Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900">Cities</h2>
          <Button
            onClick={() => setIsEditDialogOpen(true)}
            className="bg-[#0ea5e9] text-white hover:bg-[#0284c7] flex items-center gap-2 rounded-lg shadow-sm border-none transition-colors"
          >
            <span className="text-lg">+</span> Add City
          </Button>
        </div>

        {/* Table - Takes full remaining space */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border-b border-gray-200 hover:bg-transparent">
                <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-white">
                  City Name
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-white">
                  State
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700 bg-white">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-sm font-medium text-gray-700 bg-white">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow
                  key={city.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">
                    {city.cityName}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {city.state}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    {/* Empty for status - can add badge if needed */}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex gap-3 justify-end items-center">
                      <button
                        onClick={() => handleEdit(city)}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(city.id!)}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {cities.length === 0 && (
            <div className="flex items-center justify-center h-full px-6 py-16">
              <div className="text-center">
                <p className="text-gray-600 text-base">No cities found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Add a new city to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {editingCity ? "Edit City" : "Add City"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-900">State</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl border-gray-300">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-gray-900">City Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Columbus"
                        {...field}
                        className="h-11 rounded-xl border-gray-300 bg-gray-50/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-bold text-gray-900 cursor-pointer">
                      Active
                    </FormLabel>
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#0ea5e9] text-white hover:bg-[#0284c7] rounded-xl font-medium text-lg leading-none border-none transition-colors"
                >
                  {editingCity ? "Update City" : "Create City"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Delete City</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this city? This action cannot be
            undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end pt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
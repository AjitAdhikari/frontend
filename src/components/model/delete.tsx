import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSingleDelete } from "@/hooks/queryFn";
import type { queryKey } from "@/lib/types/query-keys";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteModalProps {
  path: string;
  Key: queryKey;
}

export function DeleteModal({ path, Key }: DeleteModalProps) {
  const { deleteHandler } = useSingleDelete();
  const handleDelete = async () => {
    try {
      await deleteHandler(path, Key);
    } catch (error) {
      toast.error("Failed to delete data: " + (error as Error).message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <span className="flex gap-2 capitalize hover:bg-accent hover:text-secondary place-items-center p-1 px-2 rounded-sm w-full">
          <Trash className="h-4 w-4" />
          <span className="">Delete</span>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete or remove
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

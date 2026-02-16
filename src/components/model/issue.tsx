import { CheckWithPost } from "@/api/methods";
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
import { Button } from "@/components/ui/button";
import { queryClient } from "@/main";
import { CircleDot, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface IssueModalProps {
  path: string;
  Key: string;
  title: string;
  message: string;
  table?: boolean;
  toastMsg?: string;
}

export function IssueModal({
  path,
  Key,
  title,
  message,
  table,
  toastMsg = "book has been",
}: IssueModalProps) {
  const handleIssue = async () => {
    try {
      await CheckWithPost(path);
      queryClient.invalidateQueries({ queryKey: [`${Key}`] });
      toast.success(`${toastMsg} Issued successfully!`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "Something went wrong!"
      );
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="">
        {table ? (
          <Button
            variant="ghost"
            size="icon"
            className=" capitalize cursor-pointer"
          >
            <CircleDot
              className={`h-4 w-4 ${
                title === "active" ? "text-green-500" : "text-red-500"
              }`}
            />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className=" capitalize cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleIssue}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

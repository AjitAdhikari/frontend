import { postData } from "@/api/methods";
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
import { useAuth } from "@/context/authcontext";
import { queryClient } from "@/main";
import { CheckCheck, CircleDot } from "lucide-react";
import toast from "react-hot-toast";

interface ReserveModalProps {
  id: string | undefined;
  path: string;
  Key: string;
  title: string;
  message: string;
  table?: boolean;
  toastMsg?: string;
}

export function ReserveModal({
  id,
  path,
  Key,
  title,
  message,
  table,
  toastMsg = "book has been",
}: ReserveModalProps) {
  const { user } = useAuth();
  const handleReserve = async () => {
    try {
      await postData(path, {
        book: id,
        user: user?.id,
      });
      queryClient.invalidateQueries({ queryKey: [`${Key}`] });
      toast.success(`${toastMsg} reserve successfully!`);
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
            <CheckCheck className="h-4 w-4" />
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
          <AlertDialogAction onClick={handleReserve}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

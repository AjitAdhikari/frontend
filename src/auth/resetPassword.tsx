import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { postData } from "@/query/query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { postData } from "@/api/methods";
import { cn } from "@/lib/utils";
import { ResetPasswordSchema } from "@/schemas/auth";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      if (!token) {
        toast.error("Invalid token or email.");
        return;
      }
      data.token = token; // Add the token to the data object

      const response = await postData("/api/auth/resetpassword", data);

      if (response.status === 200) {
        toast.success("Password reset successfully !", {
          position: "top-center",
        });
        reset(); // Reset the form fields
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while resetting the password."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px] border-[1px] shadow-sm bg-white text-black">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              id="token"
              {...register("token")}
              className="hidden"
            />
            <div>
              <label htmlFor="password">New Password:</label>
              <input
                type="text"
                id="password"
                {...register("password")}
                className={cn(
                  "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                )}
              />
              <p className="text-destructive">{errors?.password?.message}</p>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="text"
                id="confirmPassword"
                {...register("confirmPassword")}
                className={cn(
                  "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                )}
              />
              <p className="text-destructive">
                {errors?.confirmPassword?.message}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="space-x-2 flex flex-col items-end gap-2 w-full">
              <Button type="submit" variant="ghost" className="w-full">
                Reset Password
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ResetPassword;

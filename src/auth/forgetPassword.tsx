import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
import { ForgetPasswordSchema } from "@/schemas/auth";
import { useState } from "react"; // Added for loading state
import { FaSpinner } from "react-icons/fa"; // Added for spinner

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Added for loading state

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await postData("/api/auth/forgetPassword", data);
      toast.success(" If an account exists, we sent an email with password reset instructions.", {
        position: "top-center",
      });
      navigate("/login");
      return response;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while sending the email."
      );
    } finally {
      setIsLoading(false);
      reset(); // Reset form after submission
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px] border-[1px] shadow-sm bg-white text-black">
          <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                {...register("email")}
                className={cn(
                  "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                )}
              />
              <p className="text-destructive">{errors?.email?.message}</p>
            </div>
          </CardContent>
          <CardFooter>
              <div className="space-x-2 flex flex-col items-end gap-2 w-full">
    <Link to="/login" className="text-sm text-blue-600 hover:underline">Back to Login</Link> {/* Updated text */}
    <Button type="submit" variant="ghost" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send"
      )}
    </Button>
  </div>
</CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ForgetPassword;
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { editDataa } from "@/api/methods";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangePasswordSchema } from "@/schemas/auth";
import { useAuth } from "@/context/authcontext";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    //   const { id } = useParams();
    const navigate = useNavigate();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: any) => {
      try {
        await editDataa(`/api/users/change-password`, data);
        toast.success("Password changed successfully !!", {
          position: "top-center",
        });
        reset(); // Hide loading state
        navigate(-1);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };

    return (
      <>
        <div className="flex flex-col px-10 h-[90vh] w-full">
          <div>
            <Button variant="ghost" onClick={() => navigate(-1)} size="sm">
              <MoveLeft className="" />
              Back
            </Button>
          </div>
          <div className="w-full flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="lg:w-[500px] bg-white text-black shadow-lg">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Change your password here.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* currentPassword */}
                  <div className="relative">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      {...register("currentPassword")}
                      className={cn(
                        "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      )}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-11 flex items-center px-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <FaEye className="text-primary " />
                      ) : (
                        <FaEyeSlash className="text-primary font-bold" />
                      )}
                    </button>
                    <p className="text-destructive">
                      {errors?.currentPassword?.message || " "}
                    </p>
                  </div>
                  {/* New Password */}
                  <div className="relative">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      {...register("newPassword")}
                      className={cn(
                        "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      )}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-11 flex items-center px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <FaEye className="text-primary " />
                      ) : (
                        <FaEyeSlash className="text-primary font-bold" />
                      )}
                    </button>
                    <p className="text-destructive">
                      {errors.newPassword?.message}
                    </p>
                  </div>
                  {/* Confirm Password */}
                  <div className="relative">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      className={cn(
                        "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      )}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-11 flex items-center px-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEye className="text-primary " />
                      ) : (
                        <FaEyeSlash className="text-primary font-bold" />
                      )}
                    </button>
                    <p className="text-destructive">
                      {errors.confirmPassword?.message}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="space-x-2 flex flex-col items-end gap-2 w-full">
                    <Button type="submit" variant="ghost" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default ChangePassword;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa"; // Import eye icons
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; 
import { Label } from "@/components/ui/label"; 
import { useAuth } from "@/context/authcontext";
import { postData } from "@/api/methods";
import { LogInSchema } from "@/schemas/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth(); // Use `checkAuth` to validate and update auth state
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const [rememberMe, setRememberMe] = useState(false); // Added for "Remember me"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LogInSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await postData("/api/auth/login", { ...data, rememberMe }); // Pass rememberMe to API if needed
      if (response?.access_token) {
        const access_token = response.access_token;
        storeToken(access_token); // Sync auth state with backend
        navigate("/");
        toast.success("Login successful!");
        // Redirect to dashboard
      } else {
        toast.error(
          response.message || "Invalid credentials, please try again."
        );
      }
    } catch (error: any) {
      // Show error only in popup
      toast.error("User name or password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/"); // Redirect to home if user is already logged in
  //   }
  // }, [user, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px] border-[1px] shadow-sm bg-white text-black">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center"> {/* Added logo placeholder */}
              <span className="text-white font-bold text-xl">
                {(() => {
                  const appName = "International Home Care"; // Change this to update both title and short form
                  return appName.split(' ').map(word => word[0]).join('').toUpperCase();
                })()}
              </span>
            </div>
          <CardTitle>
            {(() => {
              const appName = "International Home Care"; // Same variable for consistency
              return appName;
              })()}
              </CardTitle>
            <CardDescription>
              Welcome back! Please login to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-black" // Removed red border
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-accent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-4"> {/* Added for "Remember me" */}
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 w-full">
            <Button type="submit" variant="ghost" className="w-full" disabled={isLoading}> {/* Added disabled and loading text */}
              {isLoading ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <Link to="/forget-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;

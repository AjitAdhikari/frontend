import { AppSidebar } from "@/components/app-sidebar";
import { Container } from "@/components/custom/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/constant/constant";
import { useAuth } from "@/context/authcontext";
import { Bell, Globe, User as UserIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const { user, logoutUser } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col min-h-screen w-full bg-gray-50/50 relative">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
          {/* Role Badge - Moved to Left */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 shadow-sm">
            <Globe className="h-3.5 w-3.5" />
            <span>{user?.role === 'SUPERADMIN' ? 'Super Admin' : (user?.role || 'User')} - All Locations Access</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            {!user ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center cursor-pointer gap-2 outline-none">
                  <Avatar className="h-9 w-9 border cursor-pointer hover:ring-2 hover:ring-blue-100 transition-all">
                    <AvatarImage
                      src={`${API_URL}/public/${user?.image}`}
                      alt={user?.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {user?.name ? (
                        <span>
                          {user?.name.split(" ")[0][0]?.toUpperCase() || "U"}
                          {user?.name.split(" ")[1]?.[0]?.toUpperCase() || ""}
                        </span>
                      ) : (
                        <UserIcon className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/change-password`}>Change Password</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logoutUser}
                    className="text-red-600 cursor-pointer focus:text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        <Container className="p-6 flex-1">
          <Outlet />
        </Container>
      </main>
    </SidebarProvider>
  );
}

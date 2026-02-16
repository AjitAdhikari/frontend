import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/constant/constant";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { formatDate, formatDateTime } from "@/lib/utils/date-format";
import { ArrowLeft, Calendar, Edit, Mail, MapPin, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReadUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFetch({
    path: `/api/${queryKey.USERS}/${id}/`,
    queryKey: queryKey.USERS,
    queryKeyID: id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full space-y-4">
          <div className="animate-pulse">
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-secondary rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-secondary rounded w-32"></div>
                  <div className="h-4 bg-secondary rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }


  const getRoleBadge = (role: string) => {
    switch (role) {
      case "cityadmin":
        return (
          <Badge variant="destructive" className="bg-purple-500 hover:bg-purple-600">
            <User className="w-3 h-3" /> City Admin
          </Badge>
        );
      case "superadmin":
        return (
          <Badge variant="destructive" className="bg-blue-500 hover:bg-blue-600">
            <User className="w-3 h-3" /> Superadmin
          </Badge>
        );
      case "user":
      default:
        
    }
  };


  return (
    <div className="min-h-screen bg-background px-6">
      {/* Header */}
      <div className="bg-card z-10">
        <div className="container mx-auto px-2 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col w-full">
              <div>
                <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              </div>
              <div className="flex items-center justify-between w-full">
                <section>
                  <h1 className="text-2xl font-bold text-foreground">
                    User Profile
                  </h1>
                  <p className="text-sm text-secondary-foreground">
                    Comprehensive user information and activity overview
                  </p>
                </section>
                <Link
                  to={`/users/update/${id}`}
                  className="flex items-center space-x-2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex items-center cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden py-0">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-muted  to-primary"></div>
                <div className="absolute -bottom-16 left-6">
                  <Avatar className="w-24 h-24 border-4 border-card shadow-lg">
                    {/* Show user image if available, else fallback */}
                    {data?.image ? (
                      <img
                        src={`${API_URL}/public/${data.image}`}
                        alt={data.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="text-2xl font-bold bg-background text-primary">
                        {data?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
              </div>
              <CardContent className="pt-20">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {data?.name}
                      </h2>
                      <div className="flex items-center space-x-3 mt-2">
                        {getRoleBadge(data?.role)}
                        <span className="text-sm text-secondary-foreground flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Joined {formatDate(data?.createdAt)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-foreground">
                          Email
                        </p>
                        <p className="text-foreground font-medium truncate">
                          {data?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-foreground">
                          Location
                        </p>
                        <p className="text-foreground font-medium truncate">
                          {data?.location?.name} <br />
                          <span className="text-xs text-muted-foreground">{data?.location?.address}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar - Metadata */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <span>Account Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-secondary-foreground">User ID</span>
                  <p className="font-mono text-sm bg-secondary px-2 py-1 rounded">
                    {data?.id?.slice(0, 8)}...
                  </p>
                </div>
                <div>
                  <span className="text-sm text-secondary-foreground">Role</span>
                  <div className="mt-1">{getRoleBadge(data?.role)}</div>
                </div>
                <div>
                  <span className="text-sm text-secondary-foreground">Last Updated</span>
                  <p className="text-sm">{formatDateTime(data?.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadUser;

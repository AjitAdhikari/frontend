import { DataTables } from "@/components/table/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { formatDate, formatDateTime } from "@/lib/utils/date-format";
import { ArrowLeft, Calendar, Edit, MapPin, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReadCaregiver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading } = useFetch({
    path: `/api/${queryKey.CAREGIVER}/${id}/`,
    queryKey: queryKey.CAREGIVER,
    queryKeyID: id,
  });

  const { data: assignmentsData } = useFetch({
    path: `/api/${queryKey.ASSIGNMENT}?caregiverId=${id}`,
    queryKey: `${queryKey.ASSIGNMENT}-${id}-assigned-consumers`,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 w-full max-w-md">
          <div className="flex items-center space-x-4 mb-6 animate-pulse">
            <div className="w-16 h-16 bg-secondary rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-secondary rounded w-32"></div>
              <div className="h-4 bg-secondary rounded w-20"></div>
            </div>
          </div>
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-secondary rounded w-full"></div>
            <div className="h-4 bg-secondary rounded w-3/4"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
          </div>
        </Card>
      </div>
    );
  }

  const consumerRows =
    assignmentsData?.data?.map((a: any) => {
      const consumer = a.consumer || a.consumer_profile || {};
      const name = `${consumer?.first_name || consumer?.name || ""} ${consumer?.last_name || ""}`.trim() || "—";
      return {
        id: a.id,
        name,
        start_date: a.start_date ? formatDateTime(a.start_date) : "--",
        end_date: a.end_date ? formatDateTime(a.end_date) : "--",
        status: a.status || "pending",
      };
    }) || [];

  const columns = [
    { header: "Consumer Name", accessorKey: "name" },
    { header: "Start Date", accessorKey: "start_date" },
    { header: "End Date", accessorKey: "end_date" },
    { header: "Status", accessorKey: "status" },
  ];

  return (
    <div className="min-h-screen bg-background px-6">
      <div className="bg-card z-10">
        <div className="container mx-auto px-2 py-4">
          <div className="flex flex-col w-full">
            {/* Back button aligned to the left */}
            <div className="mb-2">
              <Button variant="link" size="link" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <section>
                <h1 className="text-2xl font-bold text-foreground">Caregiver Details</h1>
                <p className="text-sm text-secondary-foreground">Comprehensive caregiver information</p>
              </section>
              <Link to={`/caregivers/update/${id}`}>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assigned-consumers">Assigned Consumers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-primary" />
                      <span>{data?.first_name} {data?.last_name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {data?.first_name} {data?.last_name}
                        </h2>
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge variant="default">
                            <MapPin className="w-3 h-3" />
                            {data?.location?.name}
                          </Badge>
                          <span className="text-sm text-secondary-foreground flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Created {formatDate(data?.createdAt)}</span>
                          </span>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-foreground">Certification</p>
                            <p className="text-foreground font-medium truncate">{data?.certification}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg">
                          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-success" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-foreground">Location</p>
                            <p className="text-foreground font-medium">{data?.location?.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assigned-consumers">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Consumers</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTables
                  columns={columns}
                  data={consumerRows}
                  meta={assignmentsData?.meta ?? null}
                  createPath={""}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReadCaregiver;
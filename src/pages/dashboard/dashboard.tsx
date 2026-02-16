import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Clock,
  Activity,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { useAuth } from "@/context/authcontext";
import { Role } from "@/enum/enum";
import { FaPlus, FaUserPlus } from "react-icons/fa6";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    location: user?.location_id || 'null',
    insurance: ""
  });

  const [dashboardStats, setDashboardStats] = useState<{
  totalConsumer: number;
  totalCaregiver: number;
  totalAuthorizedHours: number;
} | null>(null);
    // Locations data (new fetch)
    const { data: locationsData } = useFetch({
      path: `/api/${queryKey.LOCATION}`,
      queryKey: queryKey.LOCATION,
      enabled: user?.role === Role.SUPERADMIN
    });

    const { data: insuranceData} = useFetch({
      path: `/api/${queryKey.INSURANCE_PROVIDER}`,
      queryKey: queryKey.INSURANCE_PROVIDER,
      enabled: user?.role === Role.SUPERADMIN
    });


    // Local state for select
    const [locations, setLocations] = useState<{ id: string; name: string, state: string, city: string }[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
    const [insurance, setInsurances] = useState<{id: string; name: string}[]>([]);
    const [selectInsurance, setSelectedInsurance]  = useState<string | undefined>(undefined);

  // Populate locations once API data arrives
    useEffect(() => {
      if (user?.role === Role.SUPERADMIN && locationsData?.data?.length) {
        setLocations(locationsData?.data);
        setInsurances(insuranceData?.data);
      }
    }, [locationsData, selectedLocation]);

  

  const { data, refetch, isLoading } = useFetch({
    path: `/api/${queryKey.DASHBOARD}?location=${filters.location}&insurance=${filters.insurance}`,
    queryKey: queryKey.DASHBOARD,
  });

  useEffect(() => {
    refetch();
  }, [filters]);

   useEffect(() => {
    if (data) {
       setDashboardStats(data);
    }
  }, [data]);

  if (isLoading || isSubmitting) return <p>Loading dashboard...</p>;


   const onLocationChange = async (value: string) => {
    setIsSubmitting(true);

    setFilters(prev => ({
      ...prev,
      location: value,
    }));

    setIsSubmitting(false);
  };

  const onInsuranceChange = async (value: string) => {
    setIsSubmitting(true);

    setFilters(prev => ({
      ...prev,
      insurance: value,
    }));

    setIsSubmitting(false);
  };



  
  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}
      <div className="bg-card ">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-secondary-foreground mt-1">
                Welcome back!
              </p>
            </div>
          </div>
        </div>
      </div>
      {user?.role === Role.SUPERADMIN && (
        <>
        <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Select
            
              value={selectedLocation}
              onValueChange={(value) => {
                setSelectedLocation(value);
                onLocationChange(value);
              }}
            >
              <SelectGroup>

              <SelectLabel>Location:</SelectLabel>
              <SelectTrigger className="w-75">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>

              <SelectContent>
                {locations?.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {`${location.state} - ${location.city}`}
                  </SelectItem>
                ))}
              </SelectContent>
                            
              </SelectGroup>
            </Select>

             <Select
            
              value={selectInsurance}
              onValueChange={(value) => {
                setSelectedInsurance(value);
                onInsuranceChange(value);
              }}
            >
              <SelectGroup>

              <SelectLabel>Insurance:</SelectLabel>
              <SelectTrigger className="w-75">
                <SelectValue placeholder="Select Insurance Provider" />
              </SelectTrigger>

              <SelectContent>
                {insurance?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
                            
              </SelectGroup>
            </Select>


        </div>
        </div>
      </>
      )}
        {user?.role === Role.CITYADMIN && ( 
          <>
          
      <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-4 gap-3">
         <Link
            to="/consumers/create"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-black bg-gradient-to-r from-gray-100 to-white text-black font-semibold shadow-md hover:from-black hover:to-gray-800 hover:text-white transition-all duration-300"
          >
          <FaPlus />
          Add Consumer
        </Link>
          <Link
            to="/caregivers/create"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-black bg-gradient-to-r from-gray-100 to-white text-black font-semibold shadow-md hover:from-black hover:to-gray-800 hover:text-white transition-all duration-300"
          >
          <FaPlus />
          Add Caregiver (DCW)
        </Link>
        <Link
            to="/assignments/create"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-black bg-gradient-to-r from-gray-100 to-white text-black font-semibold shadow-md hover:from-black hover:to-gray-800 hover:text-white transition-all duration-300"
          >
          <FaUserPlus />
          Assign Caregiver (DCW)
        </Link>
        <Link
          to="/work-log/create"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-black bg-gradient-to-r from-gray-100 to-white text-black font-semibold shadow-md hover:from-black hover:to-gray-800 hover:text-white transition-all duration-300"
        >
          <FaPlus />
          Log Hours
        </Link>
          
        </div>

      </div>
      </>
        )}

      <div className="container mx-auto px-6 py-2">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate("/consumers")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-secondary-foreground">
                Total Consumers
              </CardTitle>
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-foreground"> {dashboardStats?.totalConsumer}</div>
            </CardContent>
          </Card>

         
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate("/caregivers")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium text-secondary-foreground">
                    Total Caregivers (DCW)
                  </CardTitle>
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-foreground"> {dashboardStats?.totalCaregiver}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge
                      variant="default"
                      className="text-xs bg-success hover:bg-success"
                    >
                      Active members
                    </Badge>
                  </div>
                </CardContent>
              </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-secondary-foreground">
                Authorized Hours
              </CardTitle>
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-foreground">{dashboardStats?.totalAuthorizedHours}</div>
            </CardContent>
          </Card>

         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Alert Panel</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4"></div>
                </CardContent>
              </Card>
          

         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

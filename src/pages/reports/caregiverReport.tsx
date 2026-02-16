import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authcontext";
import { Role } from "@/enum/enum";
import StraightAnglePieChart from "@/components/recharts/StraightAnglePieChart";

const CaregiverReport = () => {
  const { user } = useAuth();
  const [caregiverReport, setCaregiverReport] = useState<{
    totalAssignments: string;
    totalPendingAssignments: string;
    totalCompletedAssignments: string;
    totalWorkedHours: string;
  } | null>(null);

  const [caregiver, setCaregiver] = useState<
    { id: string; first_name: string;last_name: string; }[]
  >([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState<string>("");

  const [location, setLocation] = useState<{ id: string; name: string, state: string, city: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [filters, setFilters] = useState({
    caregiver: "",
    location: "",
  });

  const {
    data,
    isLoading: isLoadingCaregiver,
    isFetching: isFetchingCaregiver,
    refetch,
  } = useFetch({
    path: `/api/caregiver/report?${selectedCaregiver ? `providerId=${selectedCaregiver}` : ""} ${selectedLocation ? `&locationId=${selectedLocation}` : ""}`,
    queryKey: queryKey.CAREGIVER_REPORT,
  });

  // caregiver data (new fetch)
  const { data: caregiverData } = useFetch({
    path: `/api/${queryKey.CAREGIVER}`,
    queryKey: 'caregiver-report-chart',
    enabled: user?.role === Role.SUPERADMIN || user?.role === Role.CITYADMIN,
  });

  // consumer data (new fetch)
  const { data: locationData } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: 'location-report-chart',
    enabled: user?.role === Role.SUPERADMIN || user?.role === Role.CITYADMIN,
  });
  // Populate caregiver once API data arrives
  useEffect(() => {
    if ( caregiverData?.data?.length) {
      setCaregiver(caregiverData.data);
      setLocation(locationData.data);
    }
  }, [caregiverData, selectedCaregiver, locationData, selectedLocation]);

  useEffect(() => {
    refetch();
  }, [filters]);

  useEffect(() => {
    if (data) {
      setCaregiverReport(data);
    }
  }, [data]);

  const oncaregiverChange = async (value: string) => {
    setFilters((prev) => ({
      ...prev,
      caregiver: value,
    }));
  };

  const onLocationChange = async (value: string) => {
    setFilters((prev) => ({
      ...prev,
      location: value,
    }));
  };
  const caregiverReportData = caregiverReport
    ? [
        {
          name: "Total Assignments",
          value: Number(caregiverReport?.totalAssignments ?? 0),
        },
        {
          name: "Total Worked Hours",
          value: Number(caregiverReport?.totalWorkedHours ?? 0),
        },
        {
          name: "Total Completed Assignments",
          value: Number(caregiverReport?.totalCompletedAssignments ?? 0),
        },
        {
          name: "Total Pending Assignments",
          value: Number(caregiverReport?.totalPendingAssignments ?? 0),
        },
      ]
    : [];

  if (isLoadingCaregiver || isFetchingCaregiver) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {caregiverReport && (
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Caregiver Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedCaregiver}
              onValueChange={(value) => {
                setSelectedCaregiver(value);
                oncaregiverChange(value);
              }}
            >
              <SelectGroup>
                <SelectLabel>caregiver:</SelectLabel>
                <SelectTrigger className="w-75">
                  <SelectValue placeholder="Select caregiver" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="null" disabled>
                    All caregiver
                  </SelectItem>
                  {caregiver?.map((caregiver) => (
                    <SelectItem key={caregiver.id} value={caregiver.id}>
                      {caregiver.first_name + ' '+ caregiver.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
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
                  <SelectItem value="null" disabled>
                    All Location
                  </SelectItem>
                  {location?.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {`${location.state} - ${location.city}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
            <StraightAnglePieChart data={caregiverReportData} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CaregiverReport;

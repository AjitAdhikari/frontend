import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChartWithPaddingAngle from "@/components/recharts/PieChartWithPaddingAngle";
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

const LocationReport = () => {
  const { user } = useAuth();
  const [locationReport, setLocationReport] = useState<{
    totalConsumers: string;
    totalCaregivers: string;
    totalHoursUsed: string;
  } | null>(null);

  const [locations, setLocations] = useState<{ id: string; name: string, state: string, city: string }[]>(
    [],
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    user?.location_id || (locations[0]?.id ?? ""),
  );

  const [filters, setFilters] = useState({
    location: user?.location_id || "null",
    insurance: "",
  });

  const {
    data,
    isLoading: isLoadingLocation,
    isFetching: isFetchingLocation,
    refetch,
  } = useFetch({
    path: `/api/locations/report?${selectedLocation ? `locationId=${selectedLocation}` : ""}`,
    queryKey: queryKey.LOCATION_REPORT,
  });

  //   const [searchParams, setSearchParams] = useSearchParams();

  // Locations data (new fetch)
  const { data: locationsData } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: 'location-chart',
    enabled: user?.role === Role.SUPERADMIN,
  });

  // Populate locations once API data arrives
  useEffect(() => {
    if (user?.role === Role.SUPERADMIN && locationsData?.data?.length) {
      setLocations(locationsData.data);
    }
  }, [locationsData, selectedLocation]);

  useEffect(() => {
    refetch();
  }, [filters]);

  useEffect(() => {
    if (data) {
      setLocationReport(data);
    }
  }, [data]);

  const onLocationChange = async (value: string) => {
    setFilters((prev) => ({
      ...prev,
      location: value,
    }));
  };

  const locationReportData = locationReport
    ? [
        {
          name: "Total Caregivers",
          value: Number(locationReport?.totalCaregivers ?? 0),
        },
        {
          name: "Total Consumers",
          value: Number(locationReport?.totalConsumers ?? 0),
        },
        {
          name: "Total Hours Used",
          value: Number(locationReport?.totalHoursUsed ?? 0),
        },
      ]
    : [];

  if (isLoadingLocation || isFetchingLocation) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {locationReport && (
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Location Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                    All Locations
                  </SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {`${location.state} - ${location.city}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>

            <PieChartWithPaddingAngle data={locationReportData} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LocationReport;

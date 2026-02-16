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

const ConsumerReport = () => {
  const { user } = useAuth();
  const [consumerReport, setConsumerReport] = useState<{
    totalAssignments: string;
    totalPendingAssignments: string;
    totalCompletedAssignments: string;
    totalAuthorizedHours: string;
    totalDocuments: string;
  } | null>(null);

  const [consumer, setConsumer] = useState<
    { id: string; first_name: string; last_name: string; }[]
  >([]);
  const [selectedConsumer, setSelectedConsumer] = useState<string>("");

  const [location, setLocation] = useState<{ id: string; name: string, city: string, state: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [filters, setFilters] = useState({
    consumer: "",
    location: "",
  });

  const {
    data,
    isLoading: isLoadingConsumer,
    isFetching: isFetchingConsumer,
    refetch,
  } = useFetch({
    path: `/api/consumer/report?${
      selectedConsumer ? `consumerId=${selectedConsumer}` : ""
    }${selectedLocation ? `&locationId=${selectedLocation}` : ""}`,

    queryKey: queryKey.CONSUMER_REPORT,
  });

  // consumer data (new fetch)
  const { data: consumerData } = useFetch({
  path: user?.role === Role.SUPERADMIN 
    ? `/api/${queryKey.CONSUMER}` 
    : `/api/${queryKey.CONSUMER}?locationId=${user?.location_id}`,
  queryKey: 'consumer-report-chart',
  enabled: user?.role === Role.SUPERADMIN || user?.role === Role.CITYADMIN,
});
  // consumer data (new fetch)
  const { data: locationData } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: 'location-report-chart',
    enabled: user?.role === Role.SUPERADMIN || user?.role === Role.CITYADMIN,
  });

  // Populate consumer once API data arrives
  useEffect(() => {
    if ( consumerData?.data?.length) {
      setConsumer(consumerData.data);
      setLocation(locationData.data);
    }
  }, [consumerData, selectedConsumer, locationData, selectedLocation]);

  useEffect(() => {
    refetch();
  }, [filters]);

  useEffect(() => {
    if (data) {
      setConsumerReport(data);
    }
  }, [data]);

  const onConsumerChange = async (value: string) => {
    setFilters((prev) => ({
      ...prev,
      consumer: value,
    }));
  };
  const onLocationChange = async (value: string) => {
    setFilters((prev) => ({
      ...prev,
      location: value,
    }));
  };

  const consumerReportData = consumerReport
    ? [
        {
          name: "Total Assignments",
          value: Number(consumerReport?.totalAssignments ?? 0),
        },
        {
          name: "Total Authorized Hours",
          value: Number(consumerReport?.totalAuthorizedHours ?? 0),
        },
        {
          name: "Total Completed Assignments",
          value: Number(consumerReport?.totalCompletedAssignments ?? 0),
        },
        {
          name: "Total Pending Assignments",
          value: Number(consumerReport?.totalPendingAssignments ?? 0),
        },
        {
          name: "Total Documents",
          value: Number(consumerReport?.totalDocuments ?? 0),
        },
      ]
    : [];

  if (isLoadingConsumer || isFetchingConsumer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {consumerReport && (
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Consumer Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedConsumer}
              onValueChange={(value) => {
                setSelectedConsumer(value);
                onConsumerChange(value);
              }}
            >
              <SelectGroup>
                <SelectLabel>Consumer:</SelectLabel>
                <SelectTrigger className="w-75">
                  <SelectValue placeholder="Select consumer" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="null" disabled>
                    All consumer
                  </SelectItem>
                  {consumer?.map((consumer) => (
                    <SelectItem key={consumer.id} value={consumer.id}>
                      {consumer.first_name +' '+consumer.last_name}
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

            <StraightAnglePieChart data={consumerReportData} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ConsumerReport;

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

const InsuranceReport = () => {
  const { user } = useAuth();
  const [insuranceReport, setInsuranceReport] = useState<{
    totalConsumers: string;
    totalAuthorizedHours: string;
    totalUsedHours: string;
  } | null>(null);

  const [insurance, setInsurance] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");

  const [filters, setFilters] = useState({
    insurance: "",
  });

  const {
    data,
    isLoading: isLoadingInsurance,
    isFetching: isFetchingInsurance,
    refetch,
  } = useFetch({
    path: `/api/insurance-provider/report?${selectedInsurance ? `providerId=${selectedInsurance}` : ""}`,
    queryKey: queryKey.INSURANCE_REPORT,
  });

  // insurance data (new fetch)
  const { data: insuranceData } = useFetch({
    path: `/api/${queryKey.INSURANCE_PROVIDER}`,
    queryKey: 'insurance-chart',
    enabled: user?.role === Role.SUPERADMIN || user?.role === Role.CITYADMIN,
  });

  // Populate insurance once API data arrives
  useEffect(() => {
    if (insuranceData?.data?.length) {
      setInsurance(insuranceData.data);
    }
  }, [insuranceData, selectedInsurance]);

  useEffect(() => {
    refetch();
  }, [filters]);

  useEffect(() => {
    if (data) {
      setInsuranceReport(data);
    }
  }, [data]);

  const onInsuranceChange = async (value: string) => {
    setFilters((prev) => ({
      ...prev,
      insurance: value,
    }));
  };

  const insuranceReportData = insuranceReport
    ? [
        {
          name: "Total Consumers",
          value: Number(insuranceReport?.totalConsumers ?? 0),
        },
        {
          name: "Total Authorized Hours",
          value: Number(insuranceReport?.totalAuthorizedHours ?? 0),
        },
        {
          name: "Total Hours Used",
          value: Number(insuranceReport?.totalUsedHours ?? 0),
        },
      ]
    : [];

  if (isLoadingInsurance || isFetchingInsurance) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {insuranceReport && (
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Insurance Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedInsurance}
              onValueChange={(value) => {
                setSelectedInsurance(value);
                onInsuranceChange(value);
              }}
            >
              <SelectGroup>
                <SelectLabel>Insurance:</SelectLabel>
                <SelectTrigger className="w-75">
                  <SelectValue placeholder="Select Insurance" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="null" disabled>
                    All Insurance
                  </SelectItem>
                  {insurance.map((insurance) => (
                    <SelectItem key={insurance.id} value={insurance.id}>
                      {insurance.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>

            <PieChartWithPaddingAngle data={insuranceReportData} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default InsuranceReport;

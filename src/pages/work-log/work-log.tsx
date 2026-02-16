import TableSkeleton from "@/common/skeleton/table";
import TableHeaders from "@/common/table-header";
import { workLogColumns } from "@/components/columns/work-log";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { DataTables } from "@/components/table/table";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";


const WorkLogList = () => {
  
  
  const [workLogData, setworkLogData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [logDate, setLogDate] = useState("");

  const [caregivers, setCaregiverData] = useState<{ id: string; first_name: string; last_name: string }[]>([]);
  const [selectCaregiver, setSelectedCaregiver] = useState<string | undefined>(undefined);
  const [consumers, setConsumer] = useState<{id: string; first_name: string; last_name: string}[]>([]);
  const [selectConsumer, setSelectedConsumer]  = useState<string | undefined>(undefined);
  const [insurances, setInsurance] = useState<{ id: string; name: string}[]>([]);
  const [selectInsurance, setSelectedInsurance]  = useState<string | undefined>(undefined);
  const [totalAuthorizedHours, setTotalAuthorizedHours] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

    // Initialize filters from URL
    const [filters, setFilters] = useState({
      caregiverId: searchParams.get("caregiverId") || "",
      consumerId: searchParams.get("consumerId") || "",
      insuranceId: searchParams.get("insuranceId") || ""
    });



   const { data: caregiverData, isLoading: isLoadingCaregiver,  isFetching: isFetchingCaregiver} = useFetch({
        path: `/api/${queryKey.CAREGIVER}`,
        queryKey: queryKey.CAREGIVER,
      });
    

  
      const {
        data: consumerData,
        isLoading: isLoadingConsumer,
        isFetching: isFetchingConsumer,
      } = useFetch({
        path: `/api/${queryKey.CONSUMER}`,
        queryKey: queryKey.CONSUMER,
      });
    
  
      const {
        data: insuranceData,
        isLoading: isLoadingInsurance,
        isFetching: isFetchingInsurance,
      } = useFetch({
        path: `/api/${queryKey.INSURANCE_PROVIDER}`,
        queryKey: queryKey.INSURANCE_PROVIDER,
      });
    

    useEffect(() => {
      setConsumer(consumerData?.data || []);
      setInsurance(insuranceData?.data || []);
      setCaregiverData(caregiverData?.data || []);
    }, [consumerData?.data, insuranceData?.data, caregiverData?.data]);

    const { data, refetch, isFetching, isLoading } = useFetch({
      
      path: `/api/${queryKey.WORK_LOG}?${searchParams.toString()}`,
      queryKey: queryKey.WORK_LOG,
    });

        useEffect(() => {
          setworkLogData(data?.data);
          const total = data?.data.reduce((sum : number, item : any) => sum + (item.hours_worked || 0), 0);
          setTotalAuthorizedHours(total);
        }, [isFetching, isLoading]);

        useEffect(() => {
          refetch();
        }, [searchParams]);

  if (isLoading || isLoadingCaregiver || isLoadingConsumer || isLoadingInsurance
    || isFetching || isFetchingCaregiver || isFetchingConsumer || isFetchingInsurance
  ) {
    return <TableSkeleton />;
  }


  const onDropDownChange = async (key: string, value: any) => {
    setIsSubmitting(true);
      // Update local filter state
      setFilters((prev) => {
        const updatedFilters = { ...prev, [key]: value };
        // Build URL query parameters
        const params: Record<string, string> = {};
        Object.entries(updatedFilters).forEach(([k, v]) => {
          if (v) params[k] = v; // only add non-empty values
        });
        // Update URL
        setSearchParams(params);
        setIsSubmitting(false);
        return updatedFilters;
      });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // "YYYY-MM-DD"
    setLogDate(value);            // update local state
    onDropDownChange("logDate", value); 
  };




  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className="py-4 px-6 w-full space-y-4">
      <TableHeaders title="Worked Hour Logs" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Select
                value={selectCaregiver}
                onValueChange={(value) => {
                  setSelectedCaregiver(value);
                  onDropDownChange('caregiverId', value);
                }}
              >
                <SelectGroup>

                <SelectLabel>Search by Caregiver:</SelectLabel>
                <SelectTrigger className="w-75">
                  <SelectValue placeholder="Select Caregiver" />
                </SelectTrigger>

                <SelectContent>
                  {caregivers.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.first_name+ ' '+ item.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
                              
                </SelectGroup>
              </Select>

              <Select
              
                value={selectConsumer}
                onValueChange={(value) => {
                  setSelectedConsumer(value);
                  onDropDownChange('consumerId', value);
                }}
              >
                <SelectGroup>

                  <SelectLabel>Search by Consumer:</SelectLabel>
                <SelectTrigger className="w-75">
                  <SelectValue placeholder="Select Consumer" />
                </SelectTrigger>

                <SelectContent>
                  {consumers.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.first_name + ' '+item.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
                              
                </SelectGroup>
              </Select>


                <Select
              
                value={selectInsurance}
                onValueChange={(value) => {
                  setSelectedInsurance(value);
                  onDropDownChange('insuranceId', value);
                }}
              >
                <SelectGroup>

                  <SelectLabel>Search by Insurance:</SelectLabel>
                <SelectTrigger className="w-75">
                  <SelectValue placeholder="Select Insurance Provider" />
                </SelectTrigger>

                <SelectContent>
                  {insurances.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                              
                </SelectGroup>
              </Select>
                  
                <div>

                  <label className="text-muted-foreground px-2 py-1.5 text-xs">Search by date:</label>
                  
                  <Input  type="date"
      name="log_date"
      className="form-control"
      value={logDate}
      onChange={handleChange}
/>
                </div>
               
          </div>
         
        </div>
      <DataTables
        columns={workLogColumns}
        data={workLogData || []}
        meta={data?.meta}
        createPath="/work-log/create"
        sortingName="date"
        message={`Total Worked Hours: `+ totalAuthorizedHours}
      />
      <label className="text-sm"></label> 
    </div>
  );
};

export default WorkLogList;

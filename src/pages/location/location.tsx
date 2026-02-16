import TableSkeleton from "@/common/skeleton/table";
import TableHeaders from "@/common/table-header";
import { queryKey } from "@/lib/types/query-keys";
import { useFetch } from "@/hooks/queryFn";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataTables } from "@/components/table/table";
import { locationColumns } from "@/components/columns/location";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [searchParam] = useSearchParams();

  const { data, refetch, isFetching, isLoading } = useFetch({
    path: `/api/${queryKey.LOCATION}?${searchParam.toString()}`,
    queryKey: queryKey.LOCATION,
  });

  useEffect(() => {
    setLocations(data?.data);
  }, [isFetching, isLoading]);

  useEffect(() => {
    refetch();
  }, [searchParam]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className="py-4 px-6 w-full space-y-4">
      <TableHeaders title="Locations" />
      <DataTables
        columns={locationColumns}
        data={locations || []}
        meta={data?.meta}
        createPath="/location/create"
        sortingName="createdAt"
      />
    </div>
  );
};

export default Location;

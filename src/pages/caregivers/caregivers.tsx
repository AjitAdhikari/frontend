import TableSkeleton from "@/common/skeleton/table";
import TableHeaders from "@/common/table-header";
import { queryKey } from "@/lib/types/query-keys";
import { useFetch } from "@/hooks/queryFn";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataTables } from "@/components/table/table";
import { caregiverColumns } from "@/components/columns/caregiver";

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [searchParam] = useSearchParams();

  const { data, refetch, isFetching, isLoading } = useFetch({
    path: `/api/${queryKey.CAREGIVER}?${searchParam.toString()}`,
    queryKey: queryKey.CAREGIVER,
  });

  useEffect(() => {
    setCaregivers(data?.data);
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
      <TableHeaders title="Caregivers" />
      <DataTables
        columns={caregiverColumns}
        data={caregivers || []}
        meta={data?.meta}
        createPath="/caregivers/create"
        sortingName="createdAt"
      />
    </div>
  );
};

export default Caregivers;

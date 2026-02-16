import TableSkeleton from "@/common/skeleton/table";
import TableHeaders from "@/common/table-header";
import { insuranceProviderColumns } from "@/components/columns/insurance_provider";
import { DataTables } from "@/components/table/table";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const InsuranceProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [searchParam] = useSearchParams();

  const { data, refetch, isFetching, isLoading } = useFetch({
    path: `/api/${queryKey.INSURANCE_PROVIDER}?${searchParam.toString()}`,
    queryKey: queryKey.INSURANCE_PROVIDER,
  });

  useEffect(() => {
    setProviders(data?.data);
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
      <TableHeaders title="Insurance Providers" />
      <DataTables
        columns={insuranceProviderColumns}
        data={providers || []}
        meta={data?.meta}
        createPath="/insurance-providers/create"
        sortingName="createdAt"
      />
    </div>
  );
};

export default InsuranceProviderList;

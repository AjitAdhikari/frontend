import TableSkeleton from "@/common/skeleton/table";
import TableHeaders from "@/common/table-header";
import { assignmentColumns } from "@/components/columns/assignment";
import { DataTables } from "@/components/table/table";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchParam] = useSearchParams();

  const { data, refetch, isFetching, isLoading } = useFetch({
    path: `/api/assignment?${searchParam.toString()}`,
    queryKey: queryKey.ASSIGNMENT,
  });

  useEffect(() => {
    setAssignments(data?.data);
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
      <TableHeaders title="Assignments" />
      <DataTables
        columns={assignmentColumns}
        data={assignments || []}
        meta={data?.meta}
        createPath="/assignments/create"
        sortingName="createdAt"
      />
    </div>
  );
};

export default Assignments;
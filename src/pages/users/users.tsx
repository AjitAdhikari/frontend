import TableSkeleton from "@/common/skeleton/table";
import TableHeaders from "@/common/table-header";
import { userColumns } from "@/components/columns/users";
import { queryKey } from "@/lib/types/query-keys";
import { useFetch } from "@/hooks/queryFn";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataTables } from "@/components/table/table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchParam] = useSearchParams();

  const { data, refetch, isFetching, isLoading } = useFetch({
    path: `/api/${queryKey.USERS}?${searchParam.toString()}`,
    queryKey: queryKey.USERS,
  });

  useEffect(() => {
    setUsers(data?.data);
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
      <TableHeaders title="Users" />
      <DataTables
        columns={userColumns}
        data={users || []}
        meta={data?.meta}
        createPath="/users/create"
        sortingName="createdAt"
      />
    </div>
  );
};

export default Users;

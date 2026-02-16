import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px] rounded-sm" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 w-[250px] rounded-sm" />
        <Skeleton className="h-8 w-[250px] rounded-sm" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-40 w-full  rounded-sm" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 w-[250px] rounded-sm" />
        <Skeleton className="h-8 w-[250px] rounded-sm" />
      </div>
    </div>
  );
};

export default TableSkeleton;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./useAxios";
import toast from "react-hot-toast";
import type { ActionType, queryKey } from "@/lib/types/query-keys";

type fetchOptionType = {
  path: string;
  queryKey?: string;
  queryKeyID?: string;
  enabled?: boolean;
  retry?: boolean;
};

export const useFetch = (options: fetchOptionType) => {
  const axiosInstance = useAxios();

  return useQuery({
    queryKey: options.queryKeyID
      ? [options.queryKey, options.queryKeyID]
      : [options.queryKey],
    queryFn: async () => {
      const response = await axiosInstance.get(options.path);
      return response?.data;
    },
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 3,
  });
};

export const usePost = async <T>(path: string, type: ActionType) => {
  const axiosInstance = useAxios();

  const mutation = useMutation({
    mutationFn: async (values: T) => await axiosInstance[type](path, values),
    onSuccess: ({ data }) =>
      toast.success(
        type === "post"
          ? data?.message || "Added Successfully"
          : "Updated Successfully"
      ),
  });

  return mutation;
};

export const useSingleDelete = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const deleteHandler = async (deletePath: string, queryKey: queryKey) => {
    try {
      const response = await axiosInstance.delete(`/api/${deletePath}`);

      if (response.status == 200 || response.status == 204) {
        toast.success("Deleted Successfully");

        queryClient.invalidateQueries({
          queryKey: [queryKey],
        });
      }
    } catch (error: any) {}
  };
  return { deleteHandler };
};

export const useDeleteMultiple = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const deleteHandler = async (
    deletePath: string,
    selectedIds: string[],
    queryKey: string,
    type: "deletemany" | "restoremany"
  ) => {
    try {
      const response = await axiosInstance.post(`/api/${deletePath}/${type}`, {
        ids: JSON.stringify(selectedIds),
      });

      if (response) {
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        });
        toast.success("Deleted Successfully");
        return true;
      } else {
      }
    } catch (error: any) {}
  };

  return deleteHandler;
};

export const useEmptyTrash = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const emptyTrash = async (key: queryKey) => {
    try {
      const response = await axiosInstance.post(`/api/${key}/emptytrash`, {});
      if (
        response.status == 200 ||
        response.status == 204 ||
        response.status == 201
      ) {
        toast.success("Deleted Permanently");

        queryClient.invalidateQueries({
          queryKey: [key],
        });
      }
    } catch {}
  };
  return emptyTrash;
};

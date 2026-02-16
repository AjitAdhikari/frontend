// utils/Providers/api/query.js

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const token = localStorage.getItem("access_token") || "";

// Fetch data
export const fetchData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const useFetchDataWithParams = (url: string, key: string) => {
  const query = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    },
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

// Post data
export const postData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};
// Post data
export const notify = async (url: string) => {
  try {
    const response = await axiosInstance.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const CheckWithPost = async (url: string) => {
  try {
    const response = await axiosInstance.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const postDataa = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit data
export const editData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAndEditData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMultipartFormData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const editDataa = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

// Delete data
export const deleteData = async (url: string) => {
  try {
    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Insurance Provider API methods
export const getInsuranceProviders = async () =>
  await fetchData("/api/insurance_provider");

export const getInsuranceProvider = async (id: string) =>
  await fetchData(`/api/insurance_provider/${id}`);

export const createInsuranceProvider = async (data: any) =>
  await postData(`/api/insurance_provider`, data);

export const updateInsuranceProvider = async (id: string, data: any) =>
  await editData(`/api/insurance_provider/${id}`, data);

export const deleteInsuranceProvider = async (id: string) =>
  await deleteData(`/api/insurance_provider/${id}`);
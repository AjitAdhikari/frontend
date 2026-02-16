// import { useAuth } from "@/components/hoc/auth-provider";
// import { API_URL } from "@/lib/constants";
import { API_URL } from "@/constant/constant";
import axios from "axios";
import toast from "react-hot-toast";

export const useAxios = () => {
  // const { auth } = useAuth();

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    // headers: {
    //   Authorization: `Bearer ${auth?.accessToken}`,
    // },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects

  axiosInstance.interceptors.response.use(
    (response) => response,
    (e) => {
      const type = e?.response?.config?.method;

      if (e.response && [301, 302].includes(e.response.status)) {
        const redirectUrl = e.response.headers.location;

        return axiosInstance.get(redirectUrl);
      }

      if (type !== "get") {
        if (typeof e === "string") {
          toast.error(e || "Something went wrong");
        } else if (typeof e?.response?.data?.message == "string") {
          toast.error(e?.response?.data?.message || "Something went wrong");
        } else if (Array.isArray(e?.response?.data?.message)) {
          toast.error(e?.response?.data?.message[0] || "Something went wrong");
        } else if (typeof e?.response?.data?.message === "object") {
          if (Array.isArray(e?.response?.data?.message?.message)) {
            toast.error(
              e?.response?.data?.message?.message[0] || "Something went wrong"
            );
          } else if (typeof e?.response?.data?.message?.message === "string") {
            toast.error(
              e?.response?.data?.message?.message || "Something went wrong"
            );
          } else {
          }
        }
      }

      return Promise.reject(e);
    }
  );

  return axiosInstance;
};
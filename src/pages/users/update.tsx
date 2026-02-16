import TableSkeleton from "@/common/skeleton/table";
import { userField } from "@/components/fields/user";
import { FormComponent } from "@/components/form/form";
import { useAuth } from "@/context/authcontext";
import { Role } from "@/enum/enum";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { UsersSchema } from "@/schemas/user";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  role: string;
  image?: string;
  locationId: string;
  [key: string]: any;
}

interface locationResponseProps {
  id: string;
  name: string;
  state: string;
  city: string;
}
const UpdateUser: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [defaultValues, setDefaultValues] = useState<UserData | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useFetch({
    path: `/api/${queryKey.USERS}/${id}`,
    queryKey: queryKey.USERS,
    queryKeyID: id,
  });

  const {
    data: locationData,
    isLoading: isLoadingLocation,
    isFetching: isFetchingLocation,
  } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: queryKey.LOCATION,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValues({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        locationId: userData?.location?.id || "",
        image: userData.image || "",
        status: userData.status
      });
    }
  }, [userData]);

  userField[1].options =
    locationData?.data?.map((location: locationResponseProps) => ({
      label: `${location.state} - ${location.city}`,
      value: location.id,
    })) || [];

     const fetchLocationBasedOnRole = async (val: any)  => {
         if(val === Role.CITYADMIN)
         {
            userField[1].options =
           locationData?.data?.map((location: any) => ({
             label: `${location.state} - ${location.city}`,
             value: location.id,
           })) || [];
         } else {
           userField[1].options = [];
         }
       }
   
  const mutation = usePost(`/api/${queryKey.USERS}/${id}`, "patch");


  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true); // Set submitting state to true
      let submitData = values;
      if (values.image && values.image instanceof File) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "image" && values.image) {
            formData.append("image", values.image);
          } else {
            formData.append(key, values[key]);
          }
        });
        submitData = formData;
      }
      const { mutateAsync } = await mutation;
      const { data } = await mutateAsync(submitData);
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.USERS],
        });
        navigate(-1);
      } // Trigger the mutation with the FormData
    } catch (error: any) {
      toast.error(
        "Error updating user:",
        error?.message || "An error occurred",
      );
      // Handle error appropriately, e.g., show a notification or alert
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (isLoadingLocation || isFetchingLocation || isLoadingUser) {
    return <TableSkeleton />;
  }

  if (!defaultValues) return null;

  return (
    <div className="px-10">
      <FormComponent
        fields={userField}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
         onFieldChange={(name, value) => {
          if (name === "role") {
            fetchLocationBasedOnRole(value); 
        }}}
        validationSchema={UsersSchema}
        title1="User"
        titleLink1="/users"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UpdateUser;

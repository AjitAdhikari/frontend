import Loading from "@/common/loading";
import { caregiverField } from "@/components/fields/caregiver";
import { FormComponent } from "@/components/form/form";
import { useAuth } from "@/context/authcontext";
import { useFetch, usePost } from "@/hooks/queryFn";
import { CaregiverSchema } from "@/schemas/caregiver";
import { queryKey } from "@/lib/types/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


interface CaregiverData {
  locationId: string;
  first_name: string;
  last_name: string;
  certification?: string;
  status: string;
  image?: string;
  dob: string;
  ssn: string;
  zip_code: string;
  city: string;
  email: string;
  home_address: string;
  [key: string]: any;
}
interface locationResponseProps {
  id: string;
  name: string;
  state: string;
  city: string;
}
const UpdateCaregiver: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [defaultValues, setDefaultValues] =
    useState<CaregiverData | null>(null);

  const { data: oldData, isLoading } = useFetch({
    path: `/api/${queryKey.CAREGIVER}/${id}`,
    queryKey: queryKey.CAREGIVER,
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

    caregiverField[0].options =
        locationData?.data?.map((location: locationResponseProps) => ({
          label: `${location.state} - ${location.city}`,
          value: location.id,
        })) || [];
  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        locationId: oldData.location?.id || "",
        first_name: oldData.first_name || "",
        last_name: oldData.last_name || "",
        certification: oldData.certification || "",
        image: oldData.image || "",
        status: oldData.status || "active",
        dob:  (oldData.dob) ? new Date(oldData.dob).toISOString().split("T")[0] : "",
        ssn: oldData.ssn || "",
        zip_code: oldData.zip_code || "",
        city: oldData.city || "",
        email: oldData.email || "",
        home_address: oldData.home_address || "",
        phone_number: oldData.phone_number || ""
      });
    }
  }, [oldData]);

  const mutation = usePost(`/api/${queryKey.CAREGIVER}/${id}`, "patch");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { mutateAsync } = await mutation;
      const { data } = await mutateAsync(values);
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.CAREGIVER],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error updating caregiver:",
        error?.message || "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isLoadingLocation || isFetchingLocation)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!defaultValues) return null;

  return (
    <div className="px-10">
      <FormComponent
              fields={caregiverField}
              defaultValue={defaultValues}
              onSubmit={onSubmit}
              title1="Caregiver"
              titleLink1="/caregivers"
              isSubmitting={isSubmitting} validationSchema={CaregiverSchema}      />
    </div>
  );
};

export default UpdateCaregiver;
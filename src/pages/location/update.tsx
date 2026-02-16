import Loading from "@/common/loading";
import { locationFields } from "@/components/fields/location";
import { FormComponent } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authcontext";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { LocationSchema } from "@/schemas/location";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface LocationResponseProps {
  name: string;
  address: string;
  contact_info: string;
  status: string; // Assuming 'status' is part of the location data
  email: string;
  city: string;
  state: string;
  [key: string]: any;
}

const UpdateLocation: React.FC = () => {
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
    useState<LocationResponseProps | null>(null);

  const { data: oldData, isLoading } = useFetch({
    path: `/api/${queryKey.LOCATION}/${id}`,
    queryKey: queryKey.LOCATION,
    queryKeyID: id,
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        name: oldData.name || "",
        address: oldData.address || "",
        contact_info: oldData.contact_info || "",
        status: oldData.status || "active",
        email: oldData.email || '',
        state: oldData.state || "",
        city:oldData.city || "",
      });
    }
  }, [oldData]);

  const mutation = usePost(`/api/${queryKey.LOCATION}/${id}`, "patch");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true); // Set submitting state to true
      const { mutateAsync } = await mutation;
      const { data } = await mutateAsync(values);
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.LOCATION],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error updating location:",
        error?.message || "An error occurred",
      );
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (!defaultValues) return null;

  return (
    <div className="px-10">
       <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        fields={locationFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={LocationSchema}
        title1="Location"
        titleLink1="/location"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UpdateLocation;

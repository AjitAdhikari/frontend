import { insuranceProviderFields } from "@/components/fields/insurance_provider";
import { FormComponent } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { InsuranceProviderSchema } from "@/schemas/insurance_provider";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CreateInsuranceProvider = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const mutation = usePost(`/api/${queryKey.INSURANCE_PROVIDER}`, "post");

  const {
    data: locations,
    isLoading: isLoadingLocation,
    refetch: refetchLocation,
  } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: queryKey.LOCATION,
  });

    insuranceProviderFields[4].options =
    locations?.data?.map((location: any) => ({
      label: `${location.state} - ${location.city}`,
      value: location.id,
    })) || [];

  useEffect(() => {
    refetchLocation();
  }, []);

  const defaultValue = {
    name: "",
    billing_code: "",
    contact_info: "",
    plan_type: "",
    locationId: "",
  };

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const { data } = await (await mutation).mutateAsync(values);
      if (data) {
        toast.success("Insurance provider created successfully");
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error?.message || "An error occurred while creating the insurance provider."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoadingLocation) return <div>Loading locations...</div>;

  return (
    <div className="px-10">
       <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        title1="Insurance Provider"
        fields={insuranceProviderFields}
        validationSchema={InsuranceProviderSchema}
        onSubmit={onSubmit}
        defaultValue={defaultValue}
        titleLink1="/insurance-providers"
        titleLink2="/insurance-providers/create"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateInsuranceProvider;

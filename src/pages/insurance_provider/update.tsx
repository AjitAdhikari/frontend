import TableSkeleton from "@/common/skeleton/table";
import { insuranceProviderField } from "@/components/fields/insurance_provider";
import { FormComponent } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { InsuranceProviderSchema } from "@/schemas/insurance_provider";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateInsuranceProvider: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [defaultValues, setDefaultValues] = useState<any>(null);

  const { data, isLoading } = useFetch({
    path: `/api/${queryKey.INSURANCE_PROVIDER}/${id}`,
    queryKey: queryKey.INSURANCE_PROVIDER,
    queryKeyID: id,
  });

  const { data: locations } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: queryKey.LOCATION,
    queryKeyID: id,
  });

   insuranceProviderField[4].options =
    locations?.data?.map((location: any) => ({
      label: `${location.state} - ${location.city}`,
      value: location.id,
    })) || [];

  useEffect(() => {
    if (data) {
      setDefaultValues({
        name: data.name,
        billing_code: data.billing_code,
        contact_info: data.contact_info,
        plan_type: data.plan_type,
        locationId: data.locationId || "",
      });
    }
  }, [data]);

  const mutation = usePost(`/api/${queryKey.INSURANCE_PROVIDER}/${id}`, "patch");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { mutateAsync } = await mutation;
      const { data: updated } = await mutateAsync(values);
      if (updated) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.INSURANCE_PROVIDER],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error updating insurance provider:",
        error?.message || "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!defaultValues) return null;

  return (
    <div className="px-10">
       <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        fields={insuranceProviderField}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={InsuranceProviderSchema}
        title1="Insurance Provider"
        titleLink1="/insurance-providers"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UpdateInsuranceProvider;
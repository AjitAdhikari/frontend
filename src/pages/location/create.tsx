import { FormComponent } from "@/components/form/form";
import { locationFields } from "@/components/fields/location";
import { usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { queryClient } from "@/main";
import { LocationSchema } from "@/schemas/location";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateLocation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const locationDefaultValue = {
    name: "",
    address: "",
    contact_info: "",
    status: "",
  };

  const mutation = usePost(`/api/${queryKey.LOCATION}`, "post");

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
      } // Trigger the mutation with the FormData
    } catch (error: any) {
      toast.error("Error creating location:", error?.message || "An error occurred");
      // Handle error appropriately, e.g., show a notification or alert
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="px-10">
       <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        fields={locationFields}
        defaultValue={locationDefaultValue}
        onSubmit={onSubmit}
        validationSchema={LocationSchema}
        title1="Location"
        titleLink1="/locations"
        titleLink2="/locations/create"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
export default CreateLocation;

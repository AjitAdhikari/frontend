import TableSkeleton from "@/common/skeleton/table";
import { userFields } from "@/components/fields/user";
import { FormComponent } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Role } from "@/enum/enum";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { queryClient } from "@/main";
import { UserSchema } from "@/schemas/user";
import { ArrowLeft } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const userDefaultValue = {
    name: "",
    email: "",
    password: "",
    image: "",
    role: "",
    locationId: "",
  };

  const {
    data: locationData,
    isLoading: isLoadingLocation,
    isFetching: isFetchingLocation,
  } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: queryKey.LOCATION,
  });



    const fetchLocationBasedOnRole = async (val: any)  => {
      if(val === Role.CITYADMIN)
      {
         userFields[1].options =
        locationData?.data?.map((location: any) => ({
          label: `${location.state} - ${location.city}`,
          value: location.id,
        })) || [];
      } else {
        userFields[1].options = [];
      }
    }

  const mutation = usePost(`/api/${queryKey.USERS}`, "post");

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
        "Error creating user:",
        error?.message || "An error occurred",
      );
      // Handle error appropriately, e.g., show a notification or alert
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (isLoadingLocation || isFetchingLocation) {
    return <TableSkeleton />;
  }

  return (
    <div className="px-10">
        <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        fields={userFields}
        defaultValue={userDefaultValue}
        onSubmit={onSubmit}
          onFieldChange={(name, value) => {
          if (name === "role") {
            fetchLocationBasedOnRole(value); 
        }}}
        validationSchema={UserSchema}
        title1="User"
        titleLink1="/users"
        titleLink2="/users/create"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
export default CreateUser;

import TableSkeleton from "@/common/skeleton/table";
import { caregiverFields } from "@/components/fields/caregiver";
import { FormComponent } from "@/components/form/form";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { queryClient } from "@/main";
import { CaregiverSchema } from "@/schemas/caregiver";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateCaregiver = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [fields, setFields] = useState(caregiverFields);


  const caregiverDefaultValue = {
    locationId: "",
    first_name: "",
    last_name: "",
    certification: "",
    status: "active",
  };

  const {
    data: locationData,
    isLoading: isLoadingLocation,
    isFetching: isFetchingLocation,
    refetch
  } = useFetch({
    path: `/api/${queryKey.LOCATION}`,
    queryKey: queryKey.LOCATION,
  });

  useEffect(() => {
  if (locationData?.data) {
    setFields(prev =>
      prev.map((field, index) =>
        index === 0
          ? {
              ...field,
              options: locationData.data.map((location: any) => ({
                label: `${location.state} - ${location.city}`,
                value: location.id,
              })),
            }
          : field
      )
    );
  }
}, [locationData]);


  useEffect(()=>{
    refetch()
  }, []);


  // caregiverFields[0].options =
  //   locationData?.data?.map((location: any) => ({
  //     label: `${location.state} - ${location.city}`,
  //     value: location.id,
  //   })) || [];

  const mutation = usePost(`/api/${queryKey.CAREGIVER}`, "post");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      let submitData = values;
      const { mutateAsync } = await mutation;
      const { data } = await mutateAsync(submitData);
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.CAREGIVER],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error creating caregiver:",
        error?.message || "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingLocation || isFetchingLocation) {
    return <TableSkeleton />;
  }

  return (
    <div className="px-10">
      <FormComponent
        fields={fields}
        defaultValue={caregiverDefaultValue}
        onSubmit={onSubmit}
        validationSchema={CaregiverSchema}
        title1="Caregiver"
        titleLink1="/caregivers"
        titleLink2="/caregivers/create"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
export default CreateCaregiver;

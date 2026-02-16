import TableSkeleton from "@/common/skeleton/table";
import { assignmentFields } from "@/components/fields/assignment";
import { FormComponent } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { AssignmentStatus } from "@/enum/enum";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { queryClient } from "@/main";
import { AssignmentSchema } from "@/schemas/assignment";
import { ArrowLeft } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const assignmentDefaultValue = {
    consumerId: "",
    caregiverId: "",
    status: "pending",
    start_date: "",
    end_date: "",
  };

  const {
    data: consumerData,
    isLoading: isLoadingConsumer,
    isFetching: isFetchingConsumer,
  } = useFetch({
    path: `/api/${queryKey.CONSUMER}`,
    queryKey: queryKey.CONSUMER,
  });

  const {
    data: caregiverData,
    isLoading: isLoadingCaregiver,
    isFetching: isFetchingCaregiver,
  } = useFetch({
    path: `/api/${queryKey.CAREGIVER}`,
    queryKey: queryKey.CAREGIVER,
  });

  assignmentFields[0].options =
    consumerData?.data?.map((consumer: any) => ({
      label: `${consumer.first_name} ${consumer.last_name}`,
      value: consumer.id,
    })) || [];

  assignmentFields[1].options =
    caregiverData?.data?.map((caregiver: any) => ({
      label: `${caregiver.first_name} ${caregiver.last_name}`,
      value: caregiver.id,
    })) || [];

  const mutation = usePost(`/api/${queryKey.ASSIGNMENT}`, "post");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { mutateAsync } = await mutation;
      values.status = AssignmentStatus.ACTIVE;
      const { data } = await mutateAsync(values);
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.ASSIGNMENT],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error creating assignment:",
        error?.message || "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingConsumer || isFetchingConsumer || isLoadingCaregiver || isFetchingCaregiver) {
    return <TableSkeleton />;
  }

  return (
    <div className="px-10">
       <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        fields={assignmentFields}
        defaultValue={assignmentDefaultValue}
        onSubmit={onSubmit}
        validationSchema={AssignmentSchema}
        title1="Assignment"
        titleLink1="/assignments"
        titleLink2="/assignments/create"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateAssignment;
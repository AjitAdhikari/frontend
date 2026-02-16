import TableSkeleton from "@/common/skeleton/table";
import { assignmentField } from "@/components/fields/assignment";
import { FormComponent } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { AssignmentStatus } from "@/enum/enum";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { queryClient } from "@/main";
import { AssignmentSchema } from "@/schemas/assignment";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface AssignmentData {
  consumerId: string;
  caregiverId: string;
  status: string;
  start_date: string;
  end_date: string;
}

const UpdateAssignment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [defaultValues, setDefaultValues] = useState<AssignmentData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: assignmentData, isLoading: isLoadingAssignment } = useFetch({
    path: `/api/${queryKey.ASSIGNMENT}/${id}`,
    queryKey: queryKey.ASSIGNMENT,
    queryKeyID: id,
  });


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

  useEffect(() => {
    if (assignmentData) {
      setDefaultValues({
        consumerId: assignmentData.consumerId || assignmentData.consumer?.id || "",
        caregiverId: assignmentData.caregiverId || assignmentData.caregiver?.id || "",
        status: assignmentData.status || "",
        start_date: assignmentData.start_date ? new Date(assignmentData.start_date).toISOString().split('T')[0] : "",
        end_date: assignmentData.end_date ? new Date(assignmentData.end_date).toISOString().split('T')[0] : "",
      });
    }
  }, [assignmentData]);

  assignmentField[0].options =
    consumerData?.data?.map((consumer: any) => ({
      label: `${consumer.first_name} ${consumer.last_name}`,
      value: consumer.id,
    })) || [];

  assignmentField[1].options =
    caregiverData?.data?.map((caregiver: any) => ({
      label: `${caregiver.first_name} ${caregiver.last_name}`,
      value: caregiver.id,
    })) || [];

  const mutation = usePost(`/api/${queryKey.ASSIGNMENT}/${id}`, "patch");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { mutateAsync } = await mutation;
      if(values.end_date)
      {
        values.status = AssignmentStatus.INACTIVE;
      }
      const { data } = await mutateAsync(values);
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.ASSIGNMENT],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error updating assignment:",
        error?.message || "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingAssignment || isLoadingConsumer || isFetchingConsumer || isLoadingCaregiver || isFetchingCaregiver) {
    return <TableSkeleton />;
  }

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10">
       <Button variant="link" size="link" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
      <FormComponent
        fields={assignmentField}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={AssignmentSchema}
        title1="Assignment"
        titleLink1="/assignments"
        titleLink2={`/assignments/update/${id}`}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UpdateAssignment;
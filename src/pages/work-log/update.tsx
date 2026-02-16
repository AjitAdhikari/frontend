import TableSkeleton from "@/common/skeleton/table";
import { updateWorkLogField } from "@/components/fields/worklog";
import { FormComponent } from "@/components/form/form";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { formatDateIntoYMDFormat } from "@/lib/utils/date-format";
import { WorkLogSchema } from "@/schemas/work-log";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateWorkLog: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [defaultValues, setDefaultValues] = useState<any | null>(null);;

  const { data, isLoading } = useFetch({
    path: `/api/${queryKey.WORK_LOG}/${id}`,
    queryKey: queryKey.WORK_LOG,
    queryKeyID: id,
  });


    const {
        data: caregiverData,
        isLoading: isLoadingCaregiver,
        isFetching: isFetchingCaregiver,
      } = useFetch({
        path: `/api/${queryKey.CAREGIVER}`,
        queryKey: queryKey.CAREGIVER,
      });
    
      updateWorkLogField[0].options =
        caregiverData?.data?.map((item: any) => ({
          label: item.first_name+' '+item.last_name,
          value: item.id,
        })) || [];
  
      const {
        data: consumerData,
        isLoading: isLoadingConsumer,
        isFetching: isFetchingConsumer,
      } = useFetch({
        path: `/api/${queryKey.CONSUMER}`,
        queryKey: queryKey.CONSUMER,
      });
    
      updateWorkLogField[1].options =
        consumerData?.data?.map((item: any) => ({
          label: item.first_name+' '+item.last_name,
          value: item.id,
        })) || [];
    
    
  
      const {
        data: insuranceData,
        isLoading: isLoadingInsurance,
        isFetching: isFetchingInsurance,
      } = useFetch({
        path: `/api/${queryKey.INSURANCE_PROVIDER}`,
        queryKey: queryKey.INSURANCE_PROVIDER,
      });
    
      updateWorkLogField[2].options =
        insuranceData?.data?.map((item: any) => ({
          label: item.name,
          value: item.id,
        })) || [];
    

  useEffect(() => {
     if (!data) return;

    const mappedValues = {
      consumerId: data.consumer?.id,
      caregiverId: data.caregiver?.id,
      insuranceId: data.insurance?.id,
      date:  formatDateIntoYMDFormat(data.date),
      hours_worked: data.hours_worked,
      notes: data.notes,
    };

    setDefaultValues(mappedValues);
  }, [data]);

  const mutation = usePost(`/api/${queryKey.WORK_LOG}/${id}`, "patch");

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { mutateAsync } = await mutation;
      const { data: updated } = await mutateAsync(values);
      if (updated) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey.WORK_LOG],
        });
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        "Error updating work log:",
        error?.message || "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };



  if (!defaultValues) return null;

  if (isLoading || isLoadingCaregiver || isFetchingCaregiver|| isLoadingInsurance || isFetchingInsurance || isLoadingConsumer || isFetchingConsumer) {
    return <TableSkeleton />;
  }


  return (
    <div className="px-10">
      <FormComponent
        fields={updateWorkLogField}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={WorkLogSchema}
        title1="Work Log"
        titleLink1="/work-log"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UpdateWorkLog;
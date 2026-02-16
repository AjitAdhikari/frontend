import TableSkeleton from "@/common/skeleton/table";
import { workLogFields } from "@/components/fields/worklog";
import { FormComponent } from "@/components/form/form";
import { useFetch, usePost } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { WorkLogSchema } from "@/schemas/work-log";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/constant/constant";
import { fetchData } from "@/api/methods";


const CreateWorkLog = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [workLogFieldsState, setWorkLogFieldsState] = React.useState(workLogFields); // initial fields

  const mutation = usePost(`/api/${queryKey.WORK_LOG}`, "post");

   const {
      data: caregiverData,
      isLoading: isLoadingCaregiver,
      isFetching: isFetchingCaregiver,
    } = useFetch({
      path: `/api/${queryKey.CAREGIVER}`,
      queryKey: queryKey.CAREGIVER,
    });
  
    workLogFields[0].options =
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
  
    workLogFields[1].options =
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
  
    workLogFields[2].options =
      insuranceData?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) || [];
  

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const { data } = await (await mutation).mutateAsync(values);
      if (data) {
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error?.message || "An error occurred while creating the work log."
      );
    } finally {
      setIsSubmitting(false);
    }
  };


    const fetchConsumersByCaregiver = useCallback(async (value: any) =>{

      const res = await fetchData(`${API_URL}/api/${queryKey.ASSIGNMENT}?caregiverId=${value}`);
      // Create a new array to trigger React re-render
        const updatedFields = [...workLogFieldsState];
        // Update the consumer dropdown options (assuming it's at index 1)
        updatedFields[1] = {
          ...updatedFields[1],
          options:
            res.data?.map((item: any) => ({
              label: item.consumer.first_name + ' ' + item.consumer.last_name,
              value: item.consumer.id,
            })) || [],
        };

        setWorkLogFieldsState(updatedFields); // update state to re render the dropdown options

    },[workLogFieldsState]);


    if (isLoadingCaregiver || isFetchingCaregiver|| isLoadingInsurance || isFetchingInsurance || isLoadingConsumer || isFetchingConsumer) {
    return <TableSkeleton />;
  }


  return (
    <div className="px-10">
      <FormComponent
        title1="Work Log"
        fields={workLogFieldsState}
        validationSchema={WorkLogSchema}
        onSubmit={onSubmit}
        onFieldChange={(name, value) => {
          if (name === "caregiverId") {
            fetchConsumersByCaregiver(value); 
        }}}
        defaultValue={null}
        titleLink1="/work-log"
        titleLink2="/work-log/create"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateWorkLog;

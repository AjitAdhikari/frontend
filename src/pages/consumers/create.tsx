// import TableSkeleton from "@/common/skeleton/table";
// import { consumerFields } from "@/components/fields/consumer";
// import { FormComponent } from "@/components/form/form";
// import { Button } from "@/components/ui/button";
// import { useFetch, usePost } from "@/hooks/queryFn";
// import { queryKey } from "@/lib/types/query-keys";
// import { queryClient } from "@/main";
// import { ConsumerSchema } from "@/schemas/consumer";
// import { ArrowLeft } from "lucide-react";
// import React, { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import ReviewConsumerModal from "./review-consumer-modal";

// const CreateConsumer = () => {
//   const navigate = useNavigate();
//   const [showReviewModal, setShowReviewModal] = React.useState(false);
//   const [reviewData, setReviewData] = React.useState<any>(null);
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   const consumerDefaultValue = {
//     ssn: "",
//     first_name: "",
//     last_name: "",
//     dob: "",
//     status: "",
//     locationId: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     zip_code: "",
//     home_address: "",
//     document: "",
//     insurances: [
//       { insuranceId: "", hours_allocated: "" },
//     ],
//   };

//   const formatDataForForm = (data: any) => {
//     if (!data) return consumerDefaultValue;
//     return {
//       ...data,
//       dob: data.dob instanceof Date ? data.dob.toISOString().split('T')[0] : data.dob || "",
//       insurances: data.insurances || consumerDefaultValue.insurances,
//     };
//   };

//   const defaultValues = formatDataForForm(null);

//   const {
//     data: locationData,
//     isLoading: isLoadingLocation,
//     refetch: refetchLocation,
//   } = useFetch({
//     path: `/api/${queryKey.LOCATION}`,
//     queryKey: queryKey.LOCATION,
//   });

//   const {
//     data: insuranceData,
//     isLoading: isLoadingInsurance,
//     // isFetching: isFetchingInsurance,
//   } = useFetch({
//     path: `/api/${queryKey.INSURANCE_PROVIDER}`,
//     queryKey: queryKey.INSURANCE_PROVIDER,
//   });
//   const mutation = usePost(`/api/${queryKey.CONSUMER}`, "post");
//   const documentMutation = usePost(`/api/${queryKey.CONSUMER_DOCUMENT}`, "post");
//   const authorizedHoursMutation = usePost(`/api/${queryKey.AUTHORIZED_HOURS}/create-multiple`, "post");

//   consumerFields[3].options =
//     locationData?.data?.map((location: any) => ({
//       label: `${location.state} - ${location.city}`,
//       value: location.id,
//     })) || [];



//   useEffect(() => {
//     refetchLocation();
//   }, []);
  

//   const updatedConsumerFields = consumerFields.map((field) => {
//     if (field.name !== "insurances") return field;

//     return {
//       ...field,
//       fields: field.fields?.map((item) => {
//         if (item.key !== "insuranceId") return item;

//         return {
//           ...item,
//           options:
//             insuranceData?.data?.map((provider: any) => ({
//               label: provider.name,
//               value: String(provider.id),
//             })) ?? [],
//         };
//       }),
//     };
//   });

//   const onSubmit = (values: any) => {
//     setReviewData(values);
//     setShowReviewModal(true);
//   };

//   const handleConfirmSave = async () => {
//     if (!reviewData) return;

//     try {
//       setIsSubmitting(true);

//       const { mutateAsync } = await mutation;
//       const { data } = await mutateAsync(reviewData);
//       if (data) {
//         if (reviewData.document && reviewData.document instanceof File) {
//           const fileType = reviewData.document.name.split('.').pop()?.toLowerCase();
//           const validTypes = ['pdf', 'jpg', 'png'];
//           if (!validTypes.includes(fileType)) {
//             toast.error('Invalid file type. Allowed: pdf, jpg, png');
//             return;
//           }

//           const formData = new FormData();
//           formData.append("file", reviewData.document);
//           formData.append("consumerId", data.data.id);
//           formData.append("fileType", fileType);

//           const { mutateAsync: uploadAsync } = await documentMutation;
//           await uploadAsync(formData);
//         }

//         reviewData.insurances.map((item: any) => {
//           item.consumerId = data.data.id;
//         });
//         const { mutateAsync: authMutateAsync } = await authorizedHoursMutation;
//         await authMutateAsync(reviewData.insurances);
//         await queryClient.invalidateQueries({ queryKey: [queryKey.CONSUMER] });
//         toast.success("Consumer created successfully!");
//         setShowReviewModal(false);
//           navigate(-1);
//       }
//     } catch (error: any) {
//       toast.error(
//         "Error creating consumer:",
//         error?.message || "An error occurred",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoadingLocation || isLoadingInsurance) return <TableSkeleton />;

//   return (
//     <div className="px-10">
//         <Button variant="link" size="link" onClick={() => navigate(-1)}>
//                   <ArrowLeft className="w-4 h-4" />
//                   <span>Back</span>
//                 </Button>
//       <FormComponent
//         fields={updatedConsumerFields}
//         defaultValue={defaultValues}
//         onSubmit={onSubmit}
//         validationSchema={ConsumerSchema}
//         title1="Consumer"
//         titleLink1="/consumers"
//         titleLink2="/consumers/create"
//       />
//       {showReviewModal && reviewData && (
//         <ReviewConsumerModal
//           reviewData={reviewData}
//           locationData={locationData}
//           insuranceData={insuranceData}
//           onClose={() => setShowReviewModal(false)}
//           onConfirm={handleConfirmSave}
//           isSubmitting={isSubmitting}
//         />
//       )}
//     </div>
//   );
// };

// export default CreateConsumer;
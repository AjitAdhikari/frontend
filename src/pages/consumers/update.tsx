// import TableSkeleton from "@/common/skeleton/table";
// import { consumerField } from "@/components/fields/consumer";
// import { FormComponent } from "@/components/form/form";
// import { Button } from "@/components/ui/button";
// import { useFetch, usePost } from "@/hooks/queryFn";
// import { queryKey } from "@/lib/types/query-keys";
// import { ConsumerSchema } from "@/schemas/consumer";
// import { useQueryClient } from "@tanstack/react-query";
// import { ArrowLeft } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// interface ConsumerData {
//   ssn: string;
//   first_name: string;
//   last_name: string;
//   dob: string;
//   status: string;
//   locationId: string;
//   email: string;
//   phone_number: string;
//   city: string;
//   zip_code: string;
//   home_address: string;
//   authorized_hours: number;
//   insurance_provider: string;
// }

// interface locationResponseProps {
//   id: string;
//   name: string;
//   state: string;
//   city: string;
// }

// const UpdateConsumer: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const queryClient = useQueryClient();
//   const [defaultValues, setDefaultValues] = useState<ConsumerData | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { data: consumerData, isLoading: isLoadingConsumer } = useFetch({
//     path: `/api/${queryKey.CONSUMER}/${id}`,
//     queryKey: queryKey.CONSUMER,
//     queryKeyID: id,
//   });

//   const {
//     data: locationData,
//     isLoading: isLoadingLocation,
//     isFetching: isFetchingLocation,
//   } = useFetch({
//     path: `/api/${queryKey.LOCATION}`,
//     queryKey: queryKey.LOCATION,
//   });

//   const {
//     data: insuranceData,
//     isLoading: isLoadingInsurance,
//     isFetching: isFetchingInsurance,
//   } = useFetch({
//     path: `/api/${queryKey.INSURANCE_PROVIDER}`,
//     queryKey: queryKey.INSURANCE_PROVIDER,
//   });

//   useEffect(() => {
//     if (consumerData) {
//       setDefaultValues({
//         ssn: consumerData.ssn || "",
//         first_name: consumerData.first_name,
//         last_name: consumerData.last_name,
//         dob: consumerData.dob ? new Date(consumerData.dob).toISOString().split('T')[0] : "",
//         status: consumerData.status,
//         locationId: consumerData?.location?.id || "",
//         email: consumerData.email || "",
//         phone_number: consumerData.phone_number || "",
//         city: consumerData.city || "",
//         zip_code: consumerData.zip_code || "",
//         home_address: consumerData.home_address || "",
//         authorized_hours: consumerData.authorized_hours || 0,
//         insurance_provider: consumerData?.insurance_provider?.id || "",
//       });
//     }
//   }, [consumerData]);

//   consumerField[4].options =
//     locationData?.data?.map((location: locationResponseProps) => ({
//       label: `${location.state} - ${location.city}`,
//       value: location.id,
//     })) || [];

//   consumerField[11].options =
//     insuranceData?.data?.map((provider: any) => ({
//       label: provider.name,
//       value: provider.id,
//     })) || [];

//   const mutation = usePost(`/api/${queryKey.CONSUMER}/${id}`, "patch");
//   const documentMutation = usePost(`/api/${queryKey.CONSUMER_DOCUMENT}`, "post");

//   const onSubmit = async (values: any) => {
//     try {
//       setIsSubmitting(true);
//       const filteredValues = {
//         ssn: values.ssn,
//         locationId: values.locationId,
//         first_name: values.first_name,
//         last_name: values.last_name,
//         dob: values.dob,
//         status: values.status,
//         email: values.email,
//         phone_number: values.phone_number,
//         city: values.city,
//         zip_code: values.zip_code,
//         home_address: values.home_address,
//         authorized_hours: values.authorized_hours,
//         insurance_provider_id: values.insurance_provider_id,
//       };
//       const { mutateAsync } = await mutation;
//       const { data } = await mutateAsync(filteredValues);
//       if (data) {
//         if (values.document && values.document instanceof File) {
//           const fileType = values.document.name.split('.').pop()?.toLowerCase();
//           const validTypes = ['pdf', 'jpg', 'png', 'doc', 'docx']; // Match FileTypeEnum from backend
//           if (!validTypes.includes(fileType)) {
//             toast.error('Invalid file type. Allowed: pdf, jpg, png, doc, docx');
//             return;
//           }

//           const formData = new FormData();
//           formData.append("file", values.document);
//           formData.append("consumerId", data.data.id);
//           formData.append("fileType", fileType);
//           const { mutateAsync: uploadAsync } = await documentMutation;
//           await uploadAsync(formData);
//         }
//         await queryClient.invalidateQueries({
//           queryKey: [queryKey.CONSUMER],
//         });
//         navigate(-1);
//       }
//     } catch (error: any) {
//       toast.error(
//         "Error updating consumer:",
//         error?.message || "An error occurred",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoadingLocation || isFetchingLocation || isLoadingConsumer || isLoadingInsurance || isFetchingInsurance) {
//     return <TableSkeleton />;
//   }

//   if (!defaultValues) return null;
//   return (
//     <div className="px-10">
//       <Button variant="link" size="link" onClick={() => navigate(-1)}>
//                   <ArrowLeft className="w-4 h-4" />
//                   <span>Back</span>
//       </Button>
//       <FormComponent
//         fields={consumerField}
//         defaultValue={defaultValues}
//         onSubmit={onSubmit}
//         validationSchema={ConsumerSchema}
//         title1="Consumer"
//         titleLink1="/consumers"
//         isSubmitting={isSubmitting}
//       />
//     </div>
//   );
// };

// export default UpdateConsumer;
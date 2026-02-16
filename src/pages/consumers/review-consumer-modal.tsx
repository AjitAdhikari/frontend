// import { Button } from "@/components/ui/button";
// import React from "react";

// interface ReviewConsumerModalProps {
//   reviewData: any;
//   locationData: any;
//   insuranceData: any;
//   onClose: () => void;
//   onConfirm: () => void;  
//   isSubmitting: boolean;  
// }

// const ReviewConsumerModal: React.FC<ReviewConsumerModalProps> = ({
//   reviewData,
//   locationData,
//   insuranceData,
//   onClose,
//   onConfirm,
//   isSubmitting,
// }) => {

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-auto max-h-[90vh]">
//         <h1 className="text-2xl font-bold mb-4">Review Consumer Information</h1>
//         <p className="text-sm text-gray-600 mb-6">
//           Please review the details below. Click "Confirm and Save" to proceed or "Cancel" to go back.
//         </p>

//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <div>
//               <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
//               <dl className="space-y-1">
//                 <div>
//                   <dt className="font-medium text-gray-700">SSN:</dt>
//                   <dd>{reviewData.ssn}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-700">First Name:</dt>
//                   <dd>{reviewData.first_name}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-700">Last Name:</dt>
//                   <dd>{reviewData.last_name}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-700">Status:</dt>
//                   <dd>{reviewData.status}</dd>
//                 </div>
//               </dl>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-2">Contact & Location</h3>
//               <dl className="space-y-1">
//                 <div>
//                   <dt className="font-medium text-gray-700">Email:</dt>
//                   <dd>{reviewData.email}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-700">Phone:</dt>
//                   <dd>{reviewData.phone_number}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-700">City:</dt>
//                   <dd>{reviewData.city}</dd>
//                 </div>
//                 <div>
//                   <dt className="font-medium text-gray-700">Location:</dt>
//                   <dd>
//                     {locationData?.data?.find((loc: any) => loc.id === reviewData.locationId)?.state +
//                       " - " +
//                       locationData?.data?.find((loc: any) => loc.id === reviewData.locationId)?.city || "Loading or N/A"}
//                   </dd>
//                 </div>
//               </dl>
//             </div>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Insurances</h3>
//             <ul className="list-disc list-inside space-y-1">
//               {Array.isArray(reviewData.insurances) && reviewData.insurances.length > 0 ? (
//                 reviewData.insurances.map((ins: any, index: number) => {
//                   const provider = insuranceData?.data?.find(
//                     (prov: any) => String(prov.id) === String(ins.insuranceId)
//                   );
//                   return (
//                     <li key={index}>
//                       <span className="font-medium">{provider?.name || `ID: ${ins.insuranceId}`}</span> - {ins.hours_allocated || 0} hours
//                     </li>
//                   );
//                 })
//               ) : (
//                 <li>No insurances</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-4 mt-6">
//           <Button variant="outline" onClick={onClose}>Cancel</Button>
//           <Button onClick={onConfirm} disabled={isSubmitting}> 
//             {isSubmitting ? "Saving..." : "Confirm and Save"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewConsumerModal;
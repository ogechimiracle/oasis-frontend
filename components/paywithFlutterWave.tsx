// "use client";

// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import api from "@/api/axios";
// import { useAuth } from "@/context/authContext";

// export default function PayButton({ course }: any) {
//   const { user } = useAuth();

//   const config = {
//     public_key: process.env.NEXT_RAVE_PUBLIC_KEY!,
//     tx_ref: `tx-${Date.now()}`,
//     amount: course.cost,
//     currency: "NGN",
//     payment_options: "card,banktransfer",
//     customer: {
//       email: user?.email,
//     },
//     customizations: {
//       title: "Course Enrollment",
//       description: course.title,
//       logo:""
//     },
//     meta: {
//       courseId: course.id,
//       userId: user?.id,
//     },
//   };

//   const handleFlutterPayment = useFlutterwave(config);

//   const handlePay = () => {
//     if (!user) {
//       window.location.href = "/auth";
//       return;
//     }

//     handleFlutterPayment({
//       callback: async (response) => {
//         console.log(response);

//         // 🔥 VERY IMPORTANT → VERIFY ON BACKEND
//         await api.post("/payment/verify", {
//           transaction_id: response.transaction_id,
//         });

//         closePaymentModal(); // close popup
//       },

//       onClose: () => {
//         console.log("Payment closed");
//       },
//     });
//   };

//   return (
//     <button onClick={handlePay} className="btn">
//       Enroll Now
//     </button>
//   );
// }
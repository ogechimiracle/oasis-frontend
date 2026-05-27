"use client";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import api from "@/api/axios";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";


export default function PayButton({ course }: any) {
  const { user } = useAuth();

  const config = {
    public_key: process.env.NEXT_PUBLIC_RAVE_KEY!,
    tx_ref: `tx-${Date.now()}`,
    amount: course.cost,
    currency: "NGN",
    payment_options: "card,banktransfer",
    customer: {
      email: user?.email||"",
      name: "",
      phone_number:""
    },
    customizations: {
      title: "Course Enrollment",
      description: course.title,
      logo:""
    },
    meta: {
      courseId: course.id,
      userId: user?.id,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePay =async () => {
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    try {
        const res = await api.get(`/payment/check-enrollment/${user?.id}/${course.id}`);
        if (res.data.success === true && res.data.data) {
            toast.error("You are already enrolled!");
            return;
        }

    } catch (error:any) {
        if (error.response?.status !== 404) {
            // If it's a different error (like 500), then something is wrong with the server.
            toast.error("Connection error. Try again later.");
            return;
        }
    }

    handleFlutterPayment({
          callback: async (response) => {
              console.log(response);

              //  VERY IMPORTANT → VERIFY ON BACKEND
              await api.post("/payment/verify", {
                  transaction_id: response.transaction_id,
                  courseId: course.id,
                  userId: user?.id,
              });

              closePaymentModal(); // close popup
          },

          onClose: () => {
              toast("Payment was closed by the user.");
          },
    });           
  
  };

  return (
      <button onClick={handlePay} className="btn bg-myprimaryColor text-black font-semibold rounded-lg px-5 py-3">
      Enroll Now
    </button>
  );
}
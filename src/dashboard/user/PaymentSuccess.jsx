import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: params.get("orderId"),
        transactionId: params.get("session_id"),
      }),
    }).then(() => navigate("/dashboard/my-orders"));
  }, []);

  return (
    <h1 className="text-center mt-20 text-3xl text-green-600 font-bold">
      Payment Successful ✅
    </h1>
  );
};

export default PaymentSuccess;

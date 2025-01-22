import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CheckOutForm = ({ selectedPackage, trainerInfo, userInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // Create payment method
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    } else {
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(selectedPackage.clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Prepare payment data
      const paymentData = {
        email: userInfo.email,
        trainerName: trainerInfo.fullName,
        slotName: trainerInfo.slotName,
        packageName: selectedPackage.name,
        price: selectedPackage.price,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      // Post payment data to the server
      try {
        const response = await axios.post("/api/payments", paymentData);
        if (response.data.success) {
          Swal.fire("Success", "Payment successful and booking count updated!", "success");
        }
      } catch (error) {
        console.error("Error saving payment:", error);
        Swal.fire("Error", "Failed to save payment information.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className="btn bg-blue-600 text-white rounded-lg p-2 mt-4">
        Pay ${selectedPackage.price}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {transactionId && <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckOutForm;

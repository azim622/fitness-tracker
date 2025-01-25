import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";

const CheckOutForm = ({ selectedPackage, trainer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  const totalPrice = selectedPackage?.price || 0; // Fallback to 0 if price is undefined

  // Generate the payment intent on component load
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          setError("Failed to initialize payment. Please try again later.");
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError("Payment is not ready. Please try again later.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element is not found.");
      return;
    }

    setError(""); // Clear any previous error

    try {
      // Create a payment method
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        return;
      }

      // Confirm the card payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      // Handle successful payment
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save payment details to the database
        const paymentDetails = {
          email: user?.email,
          packageName: selectedPackage?.name,
          price: totalPrice,
          moneyTransactionId: paymentIntent.id,
          date: new Date(),
          trainerName: trainer?.fullName || "Unknown",
          trainerImage: trainer?.profileImage || "Unknown",
          className: selectedPackage?.className || "Unknown",
          slot: selectedPackage?.slot || "No slot selected", // Include slot information
        };

        console.log(paymentDetails)
        // try {
        //   await axiosSecure.post("/payments", paymentDetails);

        //   Swal.fire({
        //     position: "top-end",
        //     icon: "success",
        //     title: "Payment successful!",
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        // } catch (dbError) {
        //   console.error("Error saving payment details:", dbError);
        //   Swal.fire({
        //     icon: "error",
        //     title: "Payment Saved Error",
        //     text: "The payment succeeded, but we couldn't save the details. Please contact support.",
        //   });
        // }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-blue-600 rounded-lg p-2 btn-sm btn-primary my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay ${totalPrice.toFixed(2)}
        </button>
        {error && <p className="text-red-600">{error}</p>}
        {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckOutForm;

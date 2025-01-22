import { Elements } from '@stripe/react-stripe-js';
import React from 'react';


const PaymentStripe = () => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentStripe;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);  // To show loading until status is fetched
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id'); // Extract session_id from the URL

    if (sessionId) {
      // Call your backend to check payment status
      axios.post('http://localhost:5000/api/check-payment-status', { sessionId })
        .then((response) => {
          setPaymentStatus(response.data.status);  // Set the payment status from the response
          setLoading(false);  // Set loading to false once the status is fetched
        })
        .catch((error) => {
          console.error('Error fetching payment status:', error);
          setPaymentStatus('error');  // If error occurs, set status to error
          setLoading(false);  // Also stop loading
        });
    } else {
      setPaymentStatus('error');  // If session_id is not present in URL, show error
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (paymentStatus === 'succeeded') {
    return (
      <div className="bg-gradient-to-b from-green-100 to-green-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Payment Successful!</h1>
          <p className="text-center text-gray-700">Thank you for your purchase. Your payment was successful.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-red-100 to-red-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">Payment Failed</h1>
        <p className="text-center text-gray-700">There was an error processing your payment. Please try again later.</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

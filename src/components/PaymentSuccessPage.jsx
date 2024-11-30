import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  // Logic to handle success or show appropriate messages
  const handleSuccess = () => {
    // Optionally perform other actions on success, like logging, updating payment status, etc.
    // After success, navigate to a "Thank You" page or order details page
    navigate('/thank-you'); // Redirect user to the thank you page
  };

  // Optional: Redirect user automatically after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/thank-you'); // Redirect to thank you page after 5 seconds if not clicked
    }, 5000);
    
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="payment-success">
      <h1>Payment Successful!</h1>
      <p>Your payment was processed successfully.</p>
      <p>Thank you for your purchase!</p>
      <button onClick={handleSuccess}>Go to Thank You Page</button>
    </div>
  );
};

export default PaymentSuccessPage;

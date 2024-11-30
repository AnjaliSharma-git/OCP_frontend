import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancelPage = () => {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  // Logic to handle cancellation or show appropriate messages
  const handleCancel = () => {
    // Optionally perform other actions on cancel, like logging, updating status, etc.
    // After cancellation, navigate to a different page
    navigate('/home'); // Redirecting user to home or some other page
  };

  // Optional: Redirect user after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Redirect automatically after 3 seconds if not clicked
    }, 3000);
    
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="payment-cancel">
      <h1>Payment Cancelled</h1>
      <p>Your payment was not processed successfully.</p>
      <p>We apologize for the inconvenience.</p>
      <button onClick={handleCancel}>Go to Home</button>
    </div>
  );
};

export default PaymentCancelPage;

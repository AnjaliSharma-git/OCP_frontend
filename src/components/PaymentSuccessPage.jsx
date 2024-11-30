import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate(); 

  const handleSuccess = () => {
    navigate('/thank-you'); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/thank-you'); 
    }, 5000);
    
    return () => clearTimeout(timer); 
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

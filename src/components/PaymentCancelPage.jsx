import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancelPage = () => {
  const navigate = useNavigate(); 

  const handleCancel = () => {
    navigate('/home'); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); 
    }, 3000);
    
    return () => clearTimeout(timer); 
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

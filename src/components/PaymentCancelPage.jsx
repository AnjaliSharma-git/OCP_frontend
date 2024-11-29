import React from 'react';

const PaymentCancelPage = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-100 to-yellow-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">Payment Cancelled</h1>
        <p className="text-center text-gray-700">You have cancelled the payment process. If this was a mistake, please try again.</p>
      </div>
    </div>
  );
};

export default PaymentCancelPage;

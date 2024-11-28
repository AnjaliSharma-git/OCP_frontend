import React, { useState } from 'react';

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);

  const handlePayment = () => {
    // Integrate payment gateway logic here
    alert(`Payment of $${amount} successful!`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Payment</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Process Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

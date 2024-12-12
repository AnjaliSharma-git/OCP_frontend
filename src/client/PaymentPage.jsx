import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QMP7DFT9hueBpGe0U3MBposgvd1Kv3FL7DBt6bU4LAbkHMeiGvMx8jBRuDDOwFlonK2jbss2hazWDTRejnTRYDZ00mCb9szVH');

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://ocp-backend-oman.onrender.com/api/create-checkout-session', { amount });
      console.log('Backend Response:', response.data);
      const { sessionId } = response.data;

      if (!sessionId) {
        setError('Session ID not received from the backend.');
        return;
      }

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (stripeError) {
        setError(`Stripe Checkout Error: ${stripeError.message}`);
        console.error('Stripe Checkout Error:', stripeError);
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError(`Error processing payment: ${err.response ? err.response.data.error : err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Payment</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          onClick={handlePayment}
          className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'} transition`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Process Payment'}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;

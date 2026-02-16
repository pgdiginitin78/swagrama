import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const txnId = searchParams.get('txnId');
  const reason = searchParams.get('reason');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">We couldn't process your payment</p>

        {reason && (
          <div className="bg-red-50 rounded-lg p-4 mb-4 border-l-4 border-red-400">
            <p className="text-sm text-gray-600 mb-1">Reason</p>
            <p className="text-sm font-medium text-red-600">
              {decodeURIComponent(reason)}
            </p>
          </div>
        )}

        {txnId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
            <p className="font-mono text-xs text-gray-800">{txnId}</p>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 font-semibold mb-2">What you can do:</p>
              <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                <li>Check your payment details and try again</li>
                <li>Ensure you have sufficient balance</li>
                <li>Try a different payment method</li>
                <li>Contact your bank if the issue persists</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/eShop')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}
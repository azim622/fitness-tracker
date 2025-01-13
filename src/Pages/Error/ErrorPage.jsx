import React from 'react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
          <img
            src="https://i.ibb.co.com/88qqZTc/icon-error-related-to-delete-symbol-color-mate-style-simple-design-illustration-vector.jpg"
            alt="Error Illustration"
            className="mx-auto mb-4 h-24 rounded-full"
          />
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            Oops! The page you’re looking for doesn’t exist or has been moved.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
};

export default ErrorPage;
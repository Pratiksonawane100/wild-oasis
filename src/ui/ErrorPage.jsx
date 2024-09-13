// src/pages/ErrorPage.jsx
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center p-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We couldnt find the page youre looking for.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;

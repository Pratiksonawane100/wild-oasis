import { useState } from "react";
// import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import ClipLoader from "react-spinners/ClipLoader";

function LoginForm() {
  const [email, setEmail] = useState("pratik1@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { login, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  let [color] = useState("#ffffff");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login in to your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded w-full focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
              disabled={isLoading}
            >
              {!isLoading ? (
                "Log in"
              ) : (
                <>
                  <ClipLoader
                    color={color}
                    // loading={loading}
                    // cssOverride={override}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

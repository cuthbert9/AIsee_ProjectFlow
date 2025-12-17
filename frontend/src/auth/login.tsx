import { Link } from "react-router-dom";
import { loginUser } from "../lib/api";
import RegisterPage from "./register";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginProps) {

  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);


  const { register, handleSubmit ,formState:{errors} } = useForm();


  if (showRegister) {
    return <RegisterPage onLogin={() => setShowRegister(false)} />;
  }


  const onSubmit = async (data: any) => {

    try {
      // Use the centralized loginUser function
      const result = await loginUser({
        email: data.email,
        password: data.password,
      });

      // The api function returns response.data directly.
      // But wait check my api.ts implementation: `return response.data`.
      // The original code expected `token` in `result`.

      localStorage.setItem("token", result.token);

      //   if (res.ok) { // axios throws on non-2xx so if we are here it is success
      alert("Success");
      onLoginSuccess();
      navigate("/setupOptions");

      //   } 

    } catch (error: any) {
      // Axios error structure
      const errorMessage = error.response?.data?.error || "Unknown error";
      alert(`Login failed: ${errorMessage}`);
      console.error("Login  error:", error.message);
    }
  };





  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your  account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
             {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}

              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required " })}
              placeholder="••••••••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setShowRegister(true)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          </p>

          {/* Legal */}
          <div className="mt-6 text-xs text-center text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-gray-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

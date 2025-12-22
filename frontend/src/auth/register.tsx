import { Link } from "react-router-dom";
import { registerUser } from "../lib/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";


interface RegisterPageProps {
  onLogin: () => void;
}

export default function RegisterPage({ onLogin }: RegisterPageProps) {
  //@ts-ignore
  const { register, handleSubmit,watch, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const password=watch("password");

  const onSubmit = async (data: any) => {

    try {
      await registerUser({
        email: data.email,
        password: data.password,
      });

    
      toast.success("Success signing");
      onLogin();
    
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Unknown error";
      toast.error(`Registration failed: ${errorMessage} `);
      console.error("Registration error:", error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to get started
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
                  <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••••••••"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">

                  <input
               type={showPassword? "text":"password"}
              placeholder="••••••••"
              {
              ...register("confirmPassword", { required: "Please confirm your password",validate: value =>
                value === password || "Passwords do not match",
                
              })
             }
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>          
                            {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">    
                    Passwords doesn't match
                </p>
              )}            
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
           className={`w-full py-2 rounded-md font-semibold transition
            ${isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
             {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>

          {/* Legal */}
          <div className="mt-6 text-xs text-center text-gray-500">
            By signing up, you agree to our{" "}
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

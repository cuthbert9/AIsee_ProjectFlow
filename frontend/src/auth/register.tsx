import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
    //@ts-ignore
    const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm();

     const onSubmit = async (data:any) => {
  
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();      

      if (!res.ok) {
        throw new Error(result.error || "Registration failed");
      }    
    } catch (error: any) {
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
            {
                ...register("email", { required: "Email is required" })
            }
           
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
            {
                ...register("password", { required: "Password is required" })
            }
              type="password"
              placeholder="••••••••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md 
                       font-semibold hover:bg-blue-700 transition"
          >
            Sign up
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
            //   onClick={setShowRegister(false)}
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
